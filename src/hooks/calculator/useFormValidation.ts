
import { useState, useEffect } from "react";
import { FormData } from "@/types/report";

export function useFormValidation(formData: FormData, showTrafficFields: boolean) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [canCalculate, setCanCalculate] = useState<boolean>(true);

  // Clear error for a specific field
  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.domain.trim()) {
      newErrors.domain = "Please enter a valid domain";
    }
    
    if (showTrafficFields) {
      if (formData.isUnsurePaid === false && (!formData.monthlyVisitors || formData.monthlyVisitors < 0)) {
        newErrors.monthlyVisitors = "Please enter a valid number of monthly paid visitors";
      }
      
      if (formData.isUnsureOrganic === false && (!formData.organicTrafficManual || formData.organicTrafficManual < 0)) {
        newErrors.organicTrafficManual = "Please enter a valid number of monthly organic visitors";
      }
    }
    
    if (formData.avgTransactionValue <= 0) {
      newErrors.avgTransactionValue = "Please enter a valid transaction value greater than zero";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update canCalculate based on validation status
  useEffect(() => {
    // Basic validation check for important fields
    const isValid = Boolean(
      formData.domain.trim() && 
      formData.avgTransactionValue > 0 &&
      (!showTrafficFields || 
        (formData.isUnsurePaid || formData.monthlyVisitors > 0) &&
        (formData.isUnsureOrganic || (formData.organicTrafficManual && formData.organicTrafficManual > 0))
      )
    );
    
    setCanCalculate(isValid);
  }, [formData, showTrafficFields]);

  return {
    errors,
    canCalculate,
    validateForm,
    clearFieldError,
    setErrors,
    setCanCalculate
  };
}
