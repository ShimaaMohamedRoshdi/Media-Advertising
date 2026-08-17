import { useState, useEffect, useCallback } from 'react';
import type { QuotationRequest, CreateQuotationInput } from '../types/quotation';
import { quotationService } from '../services/quotationService';

export function useQuotations() {
  const [quotations, setQuotations] = useState<QuotationRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const result = await quotationService.getQuotationRequests();
    if (result.error) {
      setError(result.error);
    } else {
      setQuotations(result.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  const submitQuotation = async (input: CreateQuotationInput) => {
    const result = await quotationService.submitQuotationRequest(input);
    if (result.error) {
      throw new Error(result.error);
    }
    if (result.data) {
      setQuotations((prev) => [result.data!, ...prev]);
    }
    return result.data;
  };

  const deleteQuotation = async (id: string) => {
    const result = await quotationService.deleteQuotationRequest(id);
    if (result.error) {
      throw new Error(result.error);
    }
    setQuotations((prev) => prev.filter((q) => q.id !== id));
    return true;
  };

  return {
    quotations,
    isLoading,
    error,
    refresh: fetchQuotations,
    submitQuotation,
    deleteQuotation,
  };
}
