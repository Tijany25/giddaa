
export type TaxTab = 'personal' | 'business';

export interface IncomeInputs {
    salaryIncome: string;
    businessIncome: string;
    rentalIncome: string;
    investmentIncome: string;
    otherIncome: string;
}

export interface DeductionInputs {
    rent: string;
    pensionContribution: string;
    nhfContribution: string;
    lifeInsurance: string;
    nhisPremium: string;
    gratitude: string;
}

export interface TaxCalculatorPayload {
    income: {
        salaryIncome: number;
        businessIncome: number;
        rentalIncome: number;
        investmentIncome: number;
        otherIncome: number;
    };
    deductions: {
        rent: number;
        pensionContribution: number;
        nhfContribution: number;
        lifeInsurance: number;
        nhisPremium: number;
        gratitude: number;
    };
}

export interface TaxBand {
    band: string;
    rate: number;
    taxableAmount: number;
    taxPaid: number;
}

export interface TaxCalculatorResponse {
    value: {
        statusCode: number;
        message: string;
        value: TaxBand[];
    };
    statusCode: number;
}

export interface TaxResult {
    bands: TaxBand[];
    annualTax: number;
    monthlyTax: number;
    grossIncome: number;
    totalDeductions: number;
    taxableIncome: number;
    netIncome: number;
    effectiveRate: number;
}

export interface IndustryOption {
  id: string;
  name: string;
  value: string;
  extraProperties: {
    RequiresIncomeTax: boolean;
    HasExemptionPeriod: boolean;
    ExemptionPeriodYears: number;
  };
}

export interface TaxConfiguration {
  TaxRate: number;        
  TaxableAmountThreshold: number;
}