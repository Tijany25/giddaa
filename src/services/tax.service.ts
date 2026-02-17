import { IndustryOption, TaxCalculatorPayload, TaxConfiguration, TaxResult } from "@/types/tax";
import axios from "axios";

export const taxApi = axios.create({
    baseURL: "https://api.taxoga.com/public",
});


export async function calculateTax(payload: TaxCalculatorPayload): Promise<TaxResult> {
    const res = await fetch('https://api.taxoga.com/public/tax/paye/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();
    const bands = data.value.value;
    const annualTax = bands.reduce((s: number, b: { taxPaid: number }) => s + b.taxPaid, 0);
    const monthlyTax = annualTax / 12;
    const grossIncome =
        payload.income.salaryIncome + payload.income.businessIncome +
        payload.income.rentalIncome + payload.income.investmentIncome + payload.income.otherIncome;
    const totalDeductions =
        payload.deductions.rent + payload.deductions.pensionContribution +
        payload.deductions.nhfContribution + payload.deductions.lifeInsurance +
        payload.deductions.nhisPremium + payload.deductions.gratitude;
    const taxableIncome = Math.max(grossIncome - totalDeductions, 0);
    const netIncome = Math.max(grossIncome - totalDeductions - annualTax, 0);
    const effectiveRate = grossIncome > 0 ? (annualTax / grossIncome) * 100 : 0;
    return { bands, annualTax, monthlyTax, grossIncome, totalDeductions, taxableIncome, netIncome, effectiveRate };
}

export async function fetchIndustries(): Promise<IndustryOption[]> {
    const res = await fetch(
        'https://api.taxoga.com/public/option-type/TAX_INDUSTRIES/options?pageNumber=1&pageSize=500'
    );
    if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    let items = data?.value?.value?.data
        ?? data?.value?.items
        ?? data?.items
        ?? data?.value?.value
        ?? data?.value
        ?? [];

    if (!Array.isArray(items)) {
        console.warn("Industries response not an array:", items);
        items = [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.map((item: any) => {
        let extra = item.extraProperties ?? {};
        if (typeof extra === 'string') {
            try {
                extra = JSON.parse(extra);
            } catch {
                extra = {};
            }
        }

        return {
            id: item.id ?? item.value ?? '',
            name: item.name ?? item.label ?? 'Unnamed',
            value: item.value ?? item.id ?? '',
            extraProperties: {
                RequiresIncomeTax: extra.RequiresIncomeTax ?? true,
                HasExemptionPeriod: extra.HasExemptionPeriod ?? false,
                ExemptionPeriodYears: Number(extra.ExemptionPeriodYears) || 0,
            },
        };
    });
}
export async function fetchConfiguration(): Promise<TaxConfiguration> {
    const res = await fetch(
        'https://api.taxoga.com/public/system-configuration/COMPANY_INCOME_TAX_CONFIGURATION'
    );
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    let cfg = data?.value?.value ?? data?.value ?? data ?? {};

    if (typeof cfg === 'string') {
        try {
            cfg = JSON.parse(cfg);
        } catch {
            cfg = {};
        }
    }

    const rawRate = cfg.TaxRate ?? cfg.taxRate ?? 0.25;
    const threshold = cfg.TaxableAmountThreshold ?? cfg.taxableAmountThreshold ?? 10_000_000;

    return {
        TaxRate: rawRate > 1 ? rawRate / 100 : rawRate,
        TaxableAmountThreshold: Number(threshold),
    };
}