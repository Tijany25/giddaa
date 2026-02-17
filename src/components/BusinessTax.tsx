'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchConfiguration, fetchIndustries } from '@/services/tax.service';

interface IndustryOption {
  id: string;
  name: string;
  value: string;
  extraProperties: {
    RequiresIncomeTax: boolean;
    HasExemptionPeriod: boolean;
    ExemptionPeriodYears: number;
  };
}

interface TaxConfiguration {
  TaxRate: number;        
  TaxableAmountThreshold: number;
}

interface BusinessTaxResult {
  annualTax: number;
  monthlyTax: number;
  effectiveRate: number;
  totalNetProfit: number;
  isTaxable: boolean;
  taxRate: number;
  reason: 'taxable' | 'no_profit' | 'below_threshold' | 'no_income_tax' | 'exemption_applies';
}


function fmt(value: number): string {
  if (value === 0) return '₦0';
  const hasDecimals = value % 1 !== 0;
  return `₦${value.toLocaleString('en-NG', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

function parseInput(value: string): number {
  const cleaned = value.replace(/[₦,\s]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}



function calculateBusinessTax(params: {
  industry: IndustryOption | null;
  config: TaxConfiguration | null;
  madeProfit: string;
  revenueRange: string;
  netProfit: number;
  incorporationYear: number | null;
}): BusinessTaxResult {
  const { industry, config, madeProfit, revenueRange, netProfit, incorporationYear } = params;
  const currentYear = new Date().getFullYear();
  const taxRate = config?.TaxRate ?? 0.25;

  const base: BusinessTaxResult = {
    annualTax: 0,
    monthlyTax: 0,
    effectiveRate: taxRate * 100,
    totalNetProfit: netProfit,
    isTaxable: false,
    taxRate,
    reason: 'no_profit',
  };

  if (!industry || !config) return base;

  const { RequiresIncomeTax, HasExemptionPeriod, ExemptionPeriodYears } = industry.extraProperties;

  if (!RequiresIncomeTax) return { ...base, reason: 'no_income_tax' };

  if (madeProfit !== 'yes') return { ...base, reason: 'no_profit' };

  if (revenueRange !== 'above') return { ...base, reason: 'below_threshold' };

  if (HasExemptionPeriod && incorporationYear !== null) {
    const yearsSinceIncorporation = currentYear - incorporationYear;
    if (ExemptionPeriodYears >= yearsSinceIncorporation) {
      return { ...base, reason: 'exemption_applies' };
    }
  }

  const annualTax = taxRate * netProfit;
  return {
    annualTax,
    monthlyTax: annualTax / 12,
    effectiveRate: taxRate * 100,
    totalNetProfit: netProfit,
    isTaxable: true,
    taxRate,
    reason: 'taxable',
  };
}


function SelectField({
  label,
  value,
  onChange,
  options,
  hint,
  disabled = false,
  loading = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || loading}
          className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C59C3]/30 focus:border-[#2C59C3] transition-all disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer"
        >
          {loading ? (
            <option>Loading...</option>
          ) : (
            options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))
          )}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {loading ? (
            <div className="w-4 h-4 border-2 border-gray-300 border-t-[#2C59C3] rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </div>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  hint,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="₦0"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C59C3]/30 focus:border-[#2C59C3] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      />
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

function getBandBarColor(rate: number): string {
  if (rate === 0) return 'bg-gray-300';
  if (rate <= 15) return 'bg-sky-500';
  if (rate <= 20) return 'bg-blue-600';
  if (rate <= 23) return 'bg-amber-500';
  return 'bg-blue-600';
}


export default function BusinessTaxCalculator() {
  const currentYear = new Date().getFullYear();

  const [selectedIndustryId, setSelectedIndustryId] = useState('');
  const [revenueRange, setRevenueRange]               = useState('');
  const [madeProfit, setMadeProfit]                   = useState('');
  const [netProfit, setNetProfit]                     = useState('');
  const [incorporationYear, setIncorporationYear]     = useState('');

  const {
    data: industries = [],
    isLoading: industriesLoading,
    isError: industriesError,
  } = useQuery({ queryKey: ['industries'], queryFn: fetchIndustries, staleTime: 10 * 60 * 1000 });

  const {
    data: config,
    isLoading: configLoading,
    isError: configError,
  } = useQuery({ queryKey: ['tax-config'], queryFn: fetchConfiguration, staleTime: 10 * 60 * 1000 });

  const selectedIndustry = industries?.find((i) => i.id === selectedIndustryId) ?? null;
  const showExemptionField = selectedIndustry?.extraProperties.HasExemptionPeriod === true;
  const showNetProfitField = madeProfit === 'yes';

  const threshold = config?.TaxableAmountThreshold ?? 10_000_000;
  const revenueOptions = [
    { value: '', label: 'Select revenue range' },
    { value: 'below', label: `Less than ${fmt(threshold)}` },
    { value: 'above', label: `More than ${fmt(threshold)}` },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRevenueRange('');
    setMadeProfit('');
    setNetProfit('');
    setIncorporationYear('');
  }, [selectedIndustryId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (madeProfit !== 'yes') setNetProfit('');
  }, [madeProfit]);

  const result = calculateBusinessTax({
    industry: selectedIndustry,
    config: config ?? null,
    madeProfit,
    revenueRange,
    netProfit: parseInput(netProfit),
    incorporationYear: incorporationYear ? parseInt(incorporationYear) : null,
  });

  const handleReset = () => {
    setSelectedIndustryId('');
    setRevenueRange('');
    setMadeProfit('');
    setNetProfit('');
    setIncorporationYear('');
  };

  const isLoading = industriesLoading || configLoading;

  const industryOptions = [
    { value: '', label: 'Select an industry' },
    ...industries?.map((i) => ({ value: i.id, label: i.name })),
  ];

  const taxBands = (() => {
    const taxRatePct = (config?.TaxRate ?? 0.25) * 100;
    if (result.isTaxable) {
      return [
        { label: 'Tax-Free',           taxPaid: 0,              taxableAmount: 0,                  rate: 0 },
        { label: `${taxRatePct}% Band`, taxPaid: result.annualTax, taxableAmount: result.totalNetProfit, rate: taxRatePct },
      ];
    }
    return [
      { label: 'Tax-Free', taxPaid: 0, taxableAmount: result.totalNetProfit, rate: 0 },
    ];
  })();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

    <div className='w-full flex items-center justify-center'>
         <div className='flex w-fit items-center justify-center'>
         <div className="mb-8 flex items-start gap-3 px-5 py-4 rounded-2xl border border-[#2C59C3]/30 bg-[#2C59C3]/[0.03]">
        <svg className="w-5 h-5 text-[#2C59C3] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-gray-600 leading-relaxed">
          The business calculator calculates the income of registered limited liability companies.
        </p>
      </div>
     </div>
    </div>

      {(industriesError || configError) && (
        <div className="mb-6 flex items-center gap-3 px-5 py-4 rounded-2xl border border-rose-200 bg-rose-50">
          <svg className="w-5 h-5 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-rose-700">Failed to load calculator data. Please refresh the page.</p>
        </div>
      )}

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 items-start">

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Input Business Data</h2>
            <p className="text-sm text-gray-500 mb-6">Analyze your business&apos;s tax liability.</p>

            <div className="space-y-5">

              <SelectField
                label="Industry"
                value={selectedIndustryId}
                onChange={setSelectedIndustryId}
                options={industryOptions}
                loading={industriesLoading}
                disabled={!!industriesError}
              />

              {selectedIndustryId && (
                <div className="space-y-2">
                  <SelectField
                    label="Total Sales/Revenue"
                    value={revenueRange}
                    onChange={setRevenueRange}
                    options={revenueOptions}
                    loading={configLoading}
                    hint="What was your total sales/revenue for the last financial year?"
                  />
                </div>
              )}

              {(revenueRange && revenueRange === 'above') && (
                <SelectField
                  label="Did You Make a Profit?"
                  value={madeProfit}
                  onChange={setMadeProfit}
                  options={[
                    { value: '',    label: 'Select an option' },
                    { value: 'yes', label: 'Yes' },
                    { value: 'no',  label: 'No' },
                  ]}
                  hint="Did your business make a profit for the last financial year?"
                />
              )}

              {madeProfit === 'yes' && (
                <InputField
                  label="Total Net Profit (₦)"
                  value={netProfit}
                  onChange={setNetProfit}
                  hint="Enter the total profit your business made after expenses."
                />
              )}

              {showExemptionField && madeProfit === 'yes' && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800">
                    Year of Incorporation
                  </label>
                  <input
                    type="number"
                    value={incorporationYear}
                    onChange={(e) => setIncorporationYear(e.target.value)}
                    placeholder={`e.g. ${currentYear - 5}`}
                    min={1900}
                    max={currentYear}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C59C3]/30 focus:border-[#2C59C3] transition-all"
                  />
                  <p className="text-xs text-gray-500">
                    This industry has a {selectedIndustry?.extraProperties.ExemptionPeriodYears}-year tax exemption period from the year of incorporation.
                  </p>
                </div>
              )}

              {showExemptionField && selectedIndustry && (
                <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
                  <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                  <p className="text-xs text-amber-700">
                    This industry has a <strong>{selectedIndustry.extraProperties.ExemptionPeriodYears}-year</strong> tax exemption period. Businesses incorporated within this period are not subject to Company Income Tax.
                  </p>
                </div>
              )}

              {selectedIndustry && !selectedIndustry.extraProperties.RequiresIncomeTax && (
                <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-emerald-700">
                    This industry is <strong>exempt</strong> from Company Income Tax.
                  </p>
                </div>
              )}

            </div>

            {madeProfit === 'yes' && (
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Net Profit</span>
                <span className="text-lg font-bold text-[#2C59C3]">{fmt(parseInput(netProfit))}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            className="w-full py-4 rounded-2xl border-2 border-[#2C59C3] bg-white text-sm font-semibold text-[#2C59C3] hover:bg-[#2C59C3]/5 transition-all"
          >
            Reset All
          </button>
        </div>

        <div className="lg:sticky lg:top-8 space-y-6">

          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B2239] via-[#0d2d4d] to-[#0a1f3d] p-7 text-white shadow-2xl">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base font-medium">₦</span>
                <span className="text-sm text-white/70 font-medium">Annual Tax Liability</span>
              </div>
              <div className="text-5xl lg:text-6xl font-bold mt-3 mb-5 tracking-tight">
                {isLoading ? (
                  <div className="h-14 w-48 bg-white/20 animate-pulse rounded-xl" />
                ) : (
                  fmt(result.annualTax)
                )}
              </div>
              <div className="border-t border-white/20 pt-5 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-white/60 text-xs mb-1">Monthly</p>
                  <p className="text-xl font-bold">{fmt(result.monthlyTax)}</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs mb-1">Effective Rate</p>
                  <p className="text-xl font-bold">
                    {result.isTaxable ? `${(result.taxRate * 100).toFixed(2)}%` : '0.00%'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Tax Breakdown by Bracket</h3>
            <div className="space-y-5">
              {taxBands.map((band, i) => {
                const maxAmount = band.rate === 0 ? (result.totalNetProfit || 1) : (result.totalNetProfit || 1);
                const pct = band.taxableAmount > 0 ? Math.min((band.taxableAmount / maxAmount) * 100, 100) : 0;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-800">{band.label}</span>
                      <span className="text-sm font-semibold text-gray-900">{fmt(band.taxPaid)}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${getBandBarColor(band.rate)}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    {band.taxableAmount > 0 && (
                      <p className="text-xs text-gray-400 mt-1.5">
                        {fmt(band.taxableAmount)} taxed at {band.label}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedIndustryId && (
              <div className="mt-5 pt-4 border-t border-gray-100">
                {result.reason === 'no_income_tax' && (
                  <p className="text-xs text-emerald-600 font-medium">✓ This industry is exempt from Company Income Tax</p>
                )}
                {result.reason === 'no_profit' && madeProfit === 'no' && (
                  <p className="text-xs text-gray-500">No tax applies — business did not make a profit</p>
                )}
                {result.reason === 'below_threshold' && (
                  <p className="text-xs text-gray-500">No tax applies — revenue is below the ₦{threshold.toLocaleString()} threshold</p>
                )}
                {revenueRange !== 'above' && (
                  <p className="text-xs text-gray-500">No tax applies — revenue is below the ₦{threshold.toLocaleString()} threshold</p>
                )}
                {result.reason === 'exemption_applies' && (
                  <p className="text-xs text-amber-600 font-medium">
                    ⏳ Tax exemption period applies — {selectedIndustry?.extraProperties.ExemptionPeriodYears} years from incorporation
                  </p>
                )}
              </div>
            )}
          </div>


        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 px-5 py-4 rounded-2xl border border-[#2C59C3]/30 bg-[#2C59C3]/[0.03]">
        <svg className="w-5 h-5 text-[#2C59C3] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-gray-600 leading-relaxed">
          This calculator uses the latest Company Income Tax rates from Nigeria&apos;s Tax Act 2025.
          Results are estimates and should be verified with one of our tax professionals.
        </p>
      </div>
    </div>
  );
}