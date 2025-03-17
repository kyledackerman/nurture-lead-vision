
export interface FormData {
  domain: string;
  monthlyVisitors: number;
  avgTransactionValue: number;
  industry: string;
}

export interface ApiData {
  organicKeywords: number;
  organicTraffic: number;
  domainPower: number;
  domainAuthority: number;
  domainRanking: number;
  backlinks: number;
}

export interface ReportData extends FormData, ApiData {
  missedLeads: number;
  monthlyRevenueLost: number;
  yearlyRevenueLost: number;
}

export const industries = [
  "E-commerce",
  "SaaS",
  "Finance",
  "Healthcare",
  "Real Estate",
  "Education",
  "Technology",
  "Travel",
  "Manufacturing",
  "Professional Services",
  "Retail",
  "Media & Entertainment"
];
