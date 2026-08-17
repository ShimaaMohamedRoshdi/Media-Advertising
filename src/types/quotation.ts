export interface QuotationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  service_type: string;
  message: string;
  created_at: string;
}

export type CreateQuotationInput = Omit<QuotationRequest, 'id' | 'created_at'>;
