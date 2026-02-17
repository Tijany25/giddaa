'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Calculator } from 'lucide-react';
import type { TaxTab, IncomeInputs, DeductionInputs, TaxResult, TaxCalculatorPayload } from '../types/tax';
import BusinessTaxCalculator from './BusinessTax';
import { calculateTax } from '@/services/tax.service';

type IncomeInputsRaw = {
  salaryIncome:     number;
  businessIncome:   number;
  rentalIncome:     number;
  investmentIncome: number;
  otherIncome:      number;
};

type DeductionInputsRaw = {
  rent:                 number;
  pensionContribution:  number;
  nhfContribution:      number;
  lifeInsurance:        number;
  nhisPremium:          number;
  gratitude:            number;
};

function formatNaira(value: number): string {
  if (value === 0) return '₦0';
  return `₦${value.toLocaleString('en-NG')}`;
}

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

function parseInput(value: string): number {
  const cleaned = value.replace(/[₦,\s]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function getBandBadgeColor(rate: number): string {
  switch (rate) {
    case 0:  return 'bg-emerald-500 text-white';
    case 15: return 'bg-sky-500 text-white';
    case 18: return 'bg-indigo-600 text-white';
    case 21: return 'bg-amber-500 text-white';
    case 23: return 'bg-orange-500 text-white';
    case 25: return 'bg-rose-500 text-white';
    default: return 'bg-gray-400 text-white';
  }
}

function getBandBarColor(rate: number): string {
  if (rate === 0) return 'bg-gray-200';
  return 'bg-blue-600';
}

const BAND_MAX: Record<number, number> = {
  0: 800_000, 15: 2_200_000, 18: 9_000_000,
  21: 13_000_000, 23: 25_000_000, 25: 50_000_000,
};


function InputField({ label, value, onChange, hint }: {
  label: string; value: string; onChange: (v: string) => void; hint?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800">{label}</label>
      <input
        type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="₦0"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C59C3]/30 focus:border-[#2C59C3] transition-all"
      />
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

function parseNaira(str: string): number {
  const cleaned = str.replace(/[₦,\s]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : Math.max(0, Math.round(num)); // round to whole ₦
}

function MoneyInput({
  label,
  value,        
  onChange,   
  hint,
}: {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  hint?: string;
}) {
  const [displayValue, setDisplayValue] = useState(formatNaira(value));

  useEffect(() => {
    setDisplayValue(formatNaira(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const num = parseNaira(input);

    onChange(num);

    setDisplayValue(formatNaira(num));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800">{label}</label>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder="₦0"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C59C3]/30 focus:border-[#2C59C3] transition-all"
      />
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

function SummaryRow({ label, value, valueClass = 'text-gray-900 text-sm font-semibold', large = false, bordered = false }: {
  label: string; value: string; valueClass?: string; large?: boolean; bordered?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between py-3 ${bordered ? 'border-b border-gray-100' : ''}`}>
      <span className={`text-sm text-gray-500`}>{label}</span>
      <span className={`${large ? 'text-2xl font-bold' : 'text-sm font-semibold'} ${valueClass}`}>{value}</span>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-white/20 rounded-xl w-1/2" />
      <div className="h-4 bg-white/20 rounded-xl w-full mt-4" />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="h-10 bg-white/20 rounded-xl" />
        <div className="h-10 bg-white/20 rounded-xl" />
      </div>
    </div>
  );
}

const DEFAULT_INCOME:  IncomeInputsRaw = {
  salaryIncome: 0, businessIncome: 0, rentalIncome: 0, investmentIncome: 0, otherIncome: 0,
};
const DEFAULT_DEDUCTIONS: DeductionInputsRaw = {
  rent: 0, pensionContribution: 0, nhfContribution: 0, lifeInsurance: 0, nhisPremium: 0, gratitude: 0,
};


export default function TaxCalculatorPage() {
  const [activeTab, setActiveTab]   = useState<TaxTab>('personal');
  const [income, setIncome] = useState<IncomeInputsRaw>({
    salaryIncome: 0,
    businessIncome: 0,
    rentalIncome: 0,
    investmentIncome: 0,
    otherIncome: 0,
  });

  const [deductions, setDeductions] = useState<DeductionInputsRaw>({
    rent: 0,
    pensionContribution: 0,
    nhfContribution: 0,
    lifeInsurance: 0,
    nhisPremium: 0,
    gratitude: 0,
  });

  const mutation = useMutation({ mutationFn: calculateTax });

  const buildPayload = useCallback((): TaxCalculatorPayload => ({
    income: {
      salaryIncome:  income.salaryIncome,
      businessIncome:  income.businessIncome,
      rentalIncome:    income.rentalIncome,
      investmentIncome: income.investmentIncome,
      otherIncome:    income.otherIncome,
    },
    deductions: {
      rent:               deductions.rent,
      pensionContribution: (deductions.pensionContribution),
      nhfContribution:    deductions.nhfContribution,
      lifeInsurance:      deductions.lifeInsurance,
      nhisPremium:        deductions.nhisPremium,
      gratitude:          deductions.gratitude,
    },
  }), [income, deductions]);

  const handleReset = () => {
    setIncome(DEFAULT_INCOME);
    setDeductions(DEFAULT_DEDUCTIONS);
    mutation.reset();
  };

  const result    = mutation.data;
  const isLoading = mutation.isPending;

  const totalIncome =
   income.salaryIncome + income.businessIncome +
    income.rentalIncome + income.investmentIncome + income.otherIncome;

  const totalDeductionsLive =
    deductions.rent + deductions.pensionContribution +
    deductions.nhfContribution + deductions.lifeInsurance +
    deductions.nhisPremium + deductions.gratitude;

  return (
    <div className="min-h-screen bg-white">

      <div className="pt-10 pb-10 text-center px-4">
        <h1 className="text-4xl font-bold text-[#001F3F] mb-3 tracking-tight">
          Tax Calculator
        </h1>
        <p className="text-[#4A5565] text-xl">
          Calculate your tax liability under Nigeria&apos;s Tax Act 2025
        </p>
        <div className="mt-8 inline-flex items-center bg-gray-100 rounded-full p-1 gap-1">
          {(['personal', 'business'] as TaxTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 cursor-pointer rounded-full text-sm font-semibold transition-all duration-200 capitalize ${
                activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'personal' ? 'Personal Income' : 'Business Profit'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'business' && <BusinessTaxCalculator />}

      {activeTab === 'personal' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

          <div className="mb-8 flex items-start gap-3 px-5 py-4 rounded-2xl border border-[#2C59C3]/30 bg-[#2C59C3]/[0.03]">
            <svg className="w-5 h-5 text-[#2C59C3] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-600 leading-relaxed">
              The personal income calculator calculates the income of individuals and registered business names.
              Business names are calculated using the personal income calculator because they are taxed like individuals.
            </p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 items-start">

            {/* Left: Inputs */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Income Sources</h2>
                <p className="text-sm text-gray-500 mb-6">Enter your annual income from all your income sources.</p>
                <div className="space-y-5">
                  <MoneyInput label="Salary/Employment Annual Income (₦)" value={income.salaryIncome}     onChange={(v) => setIncome((p) => ({ ...p, salaryIncome: v }))} />
                  <MoneyInput label="Business Income (₦)"                  value={income.businessIncome}   onChange={(v) => setIncome((p) => ({ ...p, businessIncome: v }))} />
                  <MoneyInput label="Rental Income (₦)"                    value={income.rentalIncome}     onChange={(v) => setIncome((p) => ({ ...p, rentalIncome: v }))} />
                  <MoneyInput label="Investment Income (₦)"                value={income.investmentIncome} onChange={(v) => setIncome((p) => ({ ...p, investmentIncome: v }))} />
                  <MoneyInput label="Other Income (₦)"                     value={income.otherIncome}      onChange={(v) => setIncome((p) => ({ ...p, otherIncome: v }))} />
                </div>
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Income</span>
                  <span className="text-lg font-bold text-[#2C59C3]">{formatNaira(totalIncome)}</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Allowable Deductions</h2>
                <p className="text-sm text-gray-500 mb-6">If you have deductions to claim, fill in the following allowable deductions.</p>
                <div className="space-y-5">
                  <MoneyInput label="Rent (₦)"                  value={deductions.rent}                onChange={(v) => setDeductions((p) => ({ ...p, rent: v }))}                hint="Rent relief is capped at ₦500,000" />
                  <MoneyInput label="Pension Contribution (₦)"  value={deductions.pensionContribution} onChange={(v) => setDeductions((p) => ({ ...p, pensionContribution: v }))} />
                  <MoneyInput label="NHF Contribution (₦)"      value={deductions.nhfContribution}     onChange={(v) => setDeductions((p) => ({ ...p, nhfContribution: v }))} />
                  <MoneyInput label="Life Insurance (₦)"        value={deductions.lifeInsurance}       onChange={(v) => setDeductions((p) => ({ ...p, lifeInsurance: v }))} />
                  <MoneyInput label="NHIS Premium (₦)"          value={deductions.nhisPremium}         onChange={(v) => setDeductions((p) => ({ ...p, nhisPremium: v }))} />
                  <MoneyInput label="Gratuity (₦)"              value={deductions.gratitude}           onChange={(v) => setDeductions((p) => ({ ...p, gratitude: v }))} />
                </div>
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Deductions</span>
                  <span className="text-lg font-bold text-[#2C59C3]">{formatNaira(totalDeductionsLive)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => mutation.mutate(buildPayload())}
                  disabled={isLoading}
                  className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-[#2C59C3] hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-4 rounded-xl font-semibold transition-colors"
                >
                  {isLoading
                    ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    : <Calculator className="w-5 h-5" />
                  }
                  {isLoading ? 'Calculating...' : 'Calculate Tax'}
                </button>
                <button onClick={handleReset} className="px-6 py-4  cursor-pointer rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                  Reset All
                </button>
              </div>
            </div>

            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B2239] via-[#0d2d4d] to-[#0a1f3d] p-7 text-white shadow-2xl">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '32px 32px',
                }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-medium">₦</span>
                    <span className="text-sm text-white/70 font-medium">Annual Tax Liability</span>
                    {isLoading && <div className="ml-auto w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  </div>
                  {isLoading && !result ? <ResultsSkeleton /> : (
                    <>
                      <div className={`text-5xl lg:text-6xl font-bold mt-3 mb-5 tracking-tight transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                        {result ? formatNaira(result.annualTax) : '₦0'}
                      </div>
                      <div className="border-t border-white/20 pt-5 grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-white/60 text-xs mb-1">Monthly</p>
                          <p className="text-xl font-bold">{result ? formatNaira(result.monthlyTax) : '₦0'}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs mb-1">Effective Rate</p>
                          <p className="text-xl font-bold">{result ? formatPercent(result.effectiveRate) : '0.00%'}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {(result || isLoading) && (
                <div className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-opacity duration-300 ${isLoading ? 'opacity-50' : ''}`}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Income Summary</h3>
                  <SummaryRow label="Gross Income"   value={result ? formatNaira(result.grossIncome)          : '—'} bordered />
                  <SummaryRow label="Deductions"     value={result ? `-${formatNaira(result.totalDeductions)}` : '—'} valueClass="text-emerald-600 font-semibold" bordered />
                  <SummaryRow label="Taxable Income" value={result ? formatNaira(result.taxableIncome)        : '—'} bordered />
                  <SummaryRow label="Tax Payable"    value={result ? `-${formatNaira(result.annualTax)}`      : '—'} valueClass="text-rose-500 font-semibold" bordered />
                  <SummaryRow label="Net Income"     value={result ? formatNaira(result.netIncome)            : '—'} valueClass="text-[#2C59C3]" large />
                </div>
              )}

              {(result?.bands?.length ?? 0) > 0 && (
                <div className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-opacity duration-300 ${isLoading ? 'opacity-50' : ''}`}>
                  <h3 className="text-lg font-bold text-gray-900 mb-5">Tax Breakdown by Bracket</h3>
                  <div className="space-y-5">
                    {result!.bands.map((band, i) => {
                      const maxAmount = BAND_MAX[band.rate] ?? 50_000_000;
                      const pct = maxAmount > 0 ? Math.min((band.taxableAmount / maxAmount) * 100, 100) : 0;
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-800">{band.rate === 0 ? 'Tax-Free' : `${band.rate}% Band`}</span>
                            <span className="text-sm font-semibold text-gray-900">{formatNaira(band.taxPaid)}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-700 ${getBandBarColor(band.rate)}`} style={{ width: `${pct}%` }} />
                          </div>
                          <p className="text-xs text-gray-400 mt-1.5">
                            {formatNaira(band.taxableAmount)} taxed at {band.rate === 0 ? 'Tax-Free' : `${band.rate}% Band`}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {mutation.isError && (
                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-rose-200 bg-rose-50">
                  <svg className="w-5 h-5 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-rose-700">Failed to calculate. Please check your inputs and try again.</p>
                </div>
              )}
            </div>
          </div>

          {result?.bands && (
            <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">2025 Tax Brackets (Progressive Rates)</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left pb-3 text-sm font-semibold text-gray-700">Income Range</th>
                      <th className="text-left pb-3 text-sm font-semibold text-gray-700">Tax Rate</th>
                      <th className="text-right pb-3 text-sm font-semibold text-gray-700">Max Tax in Bracket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.bands.map((bracket, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0">
                        <td className="py-4 text-sm text-gray-700">{bracket.band}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getBandBadgeColor(bracket.rate)}`}>
                            {bracket.rate}%
                          </span>
                        </td>
                        <td className="py-4 text-sm text-gray-500 text-right">{formatNaira(bracket.taxPaid)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-start gap-3 px-5 py-4 rounded-2xl border border-[#2C59C3]/30 bg-[#2C59C3]/[0.03]">
            <svg className="w-5 h-5 text-[#2C59C3] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-600 leading-relaxed">
              This calculator uses the latest tax brackets and rates from Nigeria&apos;s Tax Act 2025. The first ₦800,000 of annual income is tax-free. Results are estimates and should be verified with one of our tax professionals.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}