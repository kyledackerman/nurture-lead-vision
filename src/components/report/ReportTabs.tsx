
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DomainOverviewTab from "./DomainOverviewTab";
import SolutionTab from "./SolutionTab";
import { ReportData } from "@/types/report";

interface ReportTabsProps {
  data: ReportData;
}

const ReportTabs = ({ data }: ReportTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="overview">Domain Overview</TabsTrigger>
        <TabsTrigger value="solution">NurturelyX Solution</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="animate-fade-in">
        <DomainOverviewTab 
          domain={data.domain}
          domainPower={data.domainPower}
          backlinks={data.backlinks}
          organicTraffic={data.organicTraffic}
          organicKeywords={data.organicKeywords}
          paidTraffic={data.paidTraffic || data.monthlyVisitors}
        />
      </TabsContent>
      
      <TabsContent value="solution" className="animate-fade-in">
        <SolutionTab 
          missedLeads={data.missedLeads}
          estimatedSalesLost={data.estimatedSalesLost}
          monthlyRevenueLost={data.monthlyRevenueLost}
          yearlyRevenueLost={data.yearlyRevenueLost}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ReportTabs;
