
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportData } from "@/types/report";
import { DollarSign, Users, ShoppingCart, Check, AlertTriangle, Info } from "lucide-react";
import MonthlyRevenueTable from "./MonthlyRevenueTable";
import StatCard from "./report/StatCard";
import MethodologyCard from "./report/MethodologyCard";
import ReportTabs from "./report/ReportTabs";

interface LeadReportProps {
  data: ReportData;
  onReset: () => void;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

// Changelog component to display latest report changes
const Changelog = () => {
  const currentDate = new Date().toLocaleDateString();
  
  return (
    <Card className="mb-8 border-l-4 border-l-blue-500 bg-blue-500/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Info className="mr-2" size={20} />
          Report Summary & Changelog
        </CardTitle>
        <CardDescription>
          Generated on {currentDate} at {new Date().toLocaleTimeString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <Check size={16} className="mr-2 mt-0.5 text-green-500" />
            <span><strong>Data Sources:</strong> Successfully combined organic traffic from SearchAtlas API and your manually entered paid traffic data</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="mr-2 mt-0.5 text-green-500" />
            <span><strong>Monthly Metrics:</strong> All values represent <strong>monthly averages</strong> unless otherwise stated</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="mr-2 mt-0.5 text-green-500" />
            <span><strong>Leads Calculation:</strong> Potential leads are based on 20% of your total monthly traffic (organic + paid)</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="mr-2 mt-0.5 text-green-500" />
            <span><strong>Sales Estimation:</strong> Estimated at 1% conversion of identified leads with {formatCurrency(data.avgTransactionValue)} average value</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle size={16} className="mr-2 mt-0.5 text-amber-500" />
            <span>The revenue figures represent <strong>additional potential</strong> beyond your current performance</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

const LeadReport = ({ data, onReset }: LeadReportProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Changelog */}
      <Changelog />
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
        <StatCard
          label="Missed Leads"
          value={data.missedLeads.toLocaleString()}
          description="Monthly average based on 20% visitor identification"
          icon={Users}
        />
        
        <StatCard
          label="Lost Sales*"
          value={data.estimatedSalesLost.toLocaleString()}
          description="Monthly average based on 1% lead conversion"
          icon={ShoppingCart}
        />
        
        <StatCard
          label="Lost Revenue"
          value={formatCurrency(data.monthlyRevenueLost)}
          description={`${formatCurrency(data.yearlyRevenueLost)} annually`}
          icon={DollarSign}
        />
      </div>
      
      {/* Methodology */}
      <MethodologyCard
        domain={data.domain}
        monthlyVisitors={data.monthlyVisitors}
        avgTransactionValue={data.avgTransactionValue}
      />
      
      {/* Monthly revenue data table */}
      <Card className="bg-secondary animate-fade-in">
        <CardHeader>
          <CardTitle>Monthly Opportunity Breakdown</CardTitle>
          <CardDescription className="text-gray-400">
            Historical data for {data.domain} over the last 6 months
            <strong className="block mt-1 text-accent">
              Note: "Visitors" represents the combined total of organic and paid traffic for each month
            </strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MonthlyRevenueTable data={data.monthlyRevenueData} />
        </CardContent>
      </Card>
      
      {/* Information and Charts */}
      <ReportTabs data={data} />
      
      <div className="flex justify-center mt-8">
        <Button variant="outline" onClick={onReset} className="border-accent text-accent hover:text-accent">
          Start a New Calculation
        </Button>
      </div>
    </div>
  );
};

export default LeadReport;
