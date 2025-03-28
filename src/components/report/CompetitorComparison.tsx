
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReportData } from "@/types/report";

interface CompetitorComparisonProps {
  data: ReportData;
}

const CompetitorComparison = ({ data }: CompetitorComparisonProps) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calculate estimated monthly costs based on traffic
  const monthlyVisitors = data.monthlyVisitors;
  const tier = monthlyVisitors <= 10000 ? 'starter' : monthlyVisitors <= 50000 ? 'growth' : 'enterprise';
  
  const competitors = [
    {
      name: "NurturelyX",
      identificationRate: "20%",
      installComplexity: "Simple",
      privacyCompliant: true,
      crmIntegration: true,
      monthlyPrice: tier === 'starter' ? 299 : tier === 'growth' ? 599 : 1299,
      highlight: true
    },
    {
      name: "Opensend",
      identificationRate: "15%",
      installComplexity: "Moderate",
      privacyCompliant: true,
      crmIntegration: true,
      monthlyPrice: tier === 'starter' ? 399 : tier === 'growth' ? 799 : 1599,
      highlight: false
    },
    {
      name: "Retention.com",
      identificationRate: "12%",
      installComplexity: "Complex",
      privacyCompliant: false,
      crmIntegration: true,
      monthlyPrice: tier === 'starter' ? 499 : tier === 'growth' ? 999 : 1999,
      highlight: false
    },
    {
      name: "Customers.ai",
      identificationRate: "10%",
      installComplexity: "Moderate",
      privacyCompliant: true,
      crmIntegration: false,
      monthlyPrice: tier === 'starter' ? 249 : tier === 'growth' ? 599 : 1499,
      highlight: false
    },
    {
      name: "ID-Match",
      identificationRate: "8%",
      installComplexity: "Complex",
      privacyCompliant: false,
      crmIntegration: false,
      monthlyPrice: tier === 'starter' ? 199 : tier === 'growth' ? 499 : 1299,
      highlight: false
    }
  ];

  return (
    <Card className="bg-secondary mt-8">
      <CardHeader>
        <CardTitle>Competitor Comparison</CardTitle>
        <CardDescription className="text-black">
          How NurturelyX stacks up against alternatives for websites with {data.monthlyVisitors.toLocaleString()} monthly visitors
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table className="border-collapse w-full">
          <TableHeader>
            <TableRow className="bg-secondary-foreground/5">
              <TableHead className="text-base font-semibold text-black">Platform</TableHead>
              <TableHead className="text-base font-semibold text-right text-black">ID Rate</TableHead>
              <TableHead className="text-base font-semibold text-center text-black">Setup</TableHead>
              <TableHead className="text-base font-semibold text-center text-black">Privacy Compliant</TableHead>
              <TableHead className="text-base font-semibold text-center text-black">CRM Integration</TableHead>
              <TableHead className="text-base font-semibold text-right text-black">Monthly Cost</TableHead>
              <TableHead className="text-base font-semibold text-right text-black">Est. Monthly ROI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {competitors.map((competitor, index) => {
              // Calculate estimated ROI
              const identificationRate = parseFloat(competitor.identificationRate) / 100;
              const identifiedVisitors = Math.round(data.monthlyVisitors * identificationRate);
              const potentialSales = Math.round(identifiedVisitors * 0.01); // Assuming 1% conversion
              const potentialRevenue = potentialSales * data.avgTransactionValue;
              const roi = potentialRevenue - competitor.monthlyPrice;
              
              return (
                <TableRow 
                  key={index} 
                  className={`${index % 2 === 0 ? "bg-secondary-foreground/5" : ""} ${competitor.highlight ? "border-l-4 border-l-accent" : ""}`}
                >
                  <TableCell className={`font-medium text-base text-black ${competitor.highlight ? "text-accent" : ""}`}>
                    {competitor.name}
                    {competitor.highlight && <span className="text-xs ml-2">(Best)</span>}
                  </TableCell>
                  <TableCell className="text-right text-base font-medium text-black">
                    {competitor.identificationRate}
                  </TableCell>
                  <TableCell className="text-center text-base font-medium text-black">
                    {competitor.installComplexity}
                  </TableCell>
                  <TableCell className="text-center text-base font-medium">
                    {competitor.privacyCompliant ? 
                      <Check className="mx-auto h-5 w-5 text-green-500" /> : 
                      <X className="mx-auto h-5 w-5 text-red-500" />}
                  </TableCell>
                  <TableCell className="text-center text-base font-medium">
                    {competitor.crmIntegration ? 
                      <Check className="mx-auto h-5 w-5 text-green-500" /> : 
                      <X className="mx-auto h-5 w-5 text-red-500" />}
                  </TableCell>
                  <TableCell className="text-right text-base font-medium text-black">
                    {formatCurrency(competitor.monthlyPrice)}
                  </TableCell>
                  <TableCell className={`text-right text-base font-bold ${roi > 0 ? "text-green-500" : "text-red-500"}`}>
                    {formatCurrency(roi)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-4">
          <div className="text-xs text-black">
            * ROI calculations based on your reported average transaction value of {formatCurrency(data.avgTransactionValue)} and 1% conversion rate.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorComparison;
