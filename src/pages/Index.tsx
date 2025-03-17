
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCalculatorForm from "@/components/LeadCalculatorForm";
import LeadReport from "@/components/LeadReport";
import { FormData, ReportData } from "@/types/report";
import { fetchDomainData, calculateReportMetrics } from "@/services/apiService";
import { ArrowRight, LineChart, Users, Zap } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  
  const handleCalculate = async (formData: FormData) => {
    setIsCalculating(true);
    
    try {
      // Fetch domain data from API
      const apiData = await fetchDomainData(formData.domain, formData.industry);
      
      // Calculate the report metrics
      const metrics = calculateReportMetrics(
        formData.monthlyVisitors,
        formData.avgTransactionValue
      );
      
      // Combine all data
      const fullReportData: ReportData = {
        ...formData,
        ...apiData,
        ...metrics
      };
      
      setReportData(fullReportData);
    } catch (error) {
      console.error("Error calculating report:", error);
    } finally {
      setIsCalculating(false);
    }
  };
  
  const handleReset = () => {
    setReportData(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Header />
      
      <main className="flex-1 bg-background">
        {!reportData ? (
          <>
            <section className="bg-gradient-to-r from-background to-secondary py-16 md:py-24">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
                    Discover Your Website's Hidden Lead Potential
                  </h1>
                  <p className="text-xl text-gray-400 mb-8">
                    Calculate how many leads you're missing and the revenue impact with our free estimation tool
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <div className="flex items-center">
                      <div className="bg-accent bg-opacity-10 p-2 rounded-full">
                        <LineChart className="h-5 w-5 text-accent" />
                      </div>
                      <span className="ml-2 text-sm text-gray-400">Backed by data</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-accent bg-opacity-10 p-2 rounded-full">
                        <Users className="h-5 w-5 text-accent" />
                      </div>
                      <span className="ml-2 text-sm text-gray-400">20% visitor identification</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-accent bg-opacity-10 p-2 rounded-full">
                        <Zap className="h-5 w-5 text-accent" />
                      </div>
                      <span className="ml-2 text-sm text-gray-400">One-line implementation</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="py-12">
              <div className="container mx-auto px-4">
                <LeadCalculatorForm onCalculate={handleCalculate} isCalculating={isCalculating} />
              </div>
            </section>
            
            <section className="py-16 bg-background">
              <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold mb-6 text-foreground">How NurturelyX Works</h2>
                  <p className="text-gray-400 mb-12">
                    Our identity resolution technology identifies up to 20% of your anonymous website visitors
                    without requiring them to fill out a form or opt-in.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <div className="bg-secondary p-6 rounded-lg shadow-md border border-border">
                    <div className="rounded-full bg-accent bg-opacity-10 w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-accent font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-foreground">Install Our Script</h3>
                    <p className="text-gray-400">
                      Add a single line of JavaScript to your website that activates our proprietary visitor identification technology.
                    </p>
                  </div>
                  
                  <div className="bg-secondary p-6 rounded-lg shadow-md border border-border">
                    <div className="rounded-full bg-accent bg-opacity-10 w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-accent font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-foreground">Identify Visitors</h3>
                    <p className="text-gray-400">
                      Our technology identifies up to 20% of your anonymous website visitors, revealing their contact information.
                    </p>
                  </div>
                  
                  <div className="bg-secondary p-6 rounded-lg shadow-md border border-border">
                    <div className="rounded-full bg-accent bg-opacity-10 w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-accent font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-foreground">Convert to Customers</h3>
                    <p className="text-gray-400">
                      Target these previously anonymous visitors with personalized marketing to convert them into paying customers.
                    </p>
                  </div>
                </div>
                
                <div className="mt-12 text-center">
                  <a href="#" className="inline-flex items-center text-accent font-medium">
                    Learn more about our technology
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <LeadReport data={reportData} onReset={handleReset} />
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
