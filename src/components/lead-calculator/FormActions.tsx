
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onReset?: () => void;
  isCalculating: boolean;
  canCalculate: boolean;
}

export const FormActions = ({ onReset, isCalculating, canCalculate }: FormActionsProps) => {
  return (
    <>
      <div className="flex gap-4">
        <Button 
          type="submit" 
          className={`w-full gradient-bg text-xl py-6`}
          disabled={isCalculating || !canCalculate}
        >
          {isCalculating ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              Processing...
            </span>
          ) : (
            "Calculate My Missing Leads"
          )}
        </Button>
      </div>
      
      <p className="text-xs text-center text-gray-400 mt-2">
        We identify 20% of your combined organic and paid traffic
      </p>
    </>
  );
};
