import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { QuotationRequest, CreateQuotationInput } from '../types/quotation';
import { emailService } from './emailService';

const LOCAL_STORAGE_KEY = 'media_advertising_quotations';

const getLocalQuotations = (): QuotationRequest[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    // Initial sample request for admin preview
    const sample: QuotationRequest[] = [
      {
        id: 'q-sample-1',
        name: 'Emaar Properties Marketing',
        email: 'campaigns@emaar.ae',
        phone: '+971 4 367 3333',
        company: 'Emaar Properties PJSC',
        service_type: 'Sheikh Zayed Boulevard Networks',
        message: 'Requesting prime placement details for a 14-day takeover campaign on the Shangri-La Horizon Mega Screen during Q4 launch.',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: 'q-sample-2',
        name: 'Tariq Al-Mansoor',
        email: 'tariq@gulfinvestments.com',
        phone: '+971 50 123 4567',
        company: 'Gulf Investment Holdings',
        service_type: '3D Anamorphic Displays',
        message: 'Looking for anamorphic 3D LED screen specifications and availability for upcoming luxury watch reveal.',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      }
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sample));
    return sample;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

const saveLocalQuotations = (quotations: QuotationRequest[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quotations));
};

export const quotationService = {
  async submitQuotationRequest(input: CreateQuotationInput): Promise<{ data: QuotationRequest | null; error: string | null }> {
    // Trigger automated email notification to algarousha@hotmail.com asynchronously
    emailService.sendQuotationEmailNotification(input).catch((err) => {
      console.warn('Background email notification error:', err);
    });

    if (!isSupabaseConfigured) {
      const local = getLocalQuotations();
      const newQuotation: QuotationRequest = {
        ...input,
        id: 'q-' + Date.now(),
        created_at: new Date().toISOString(),
      };
      saveLocalQuotations([newQuotation, ...local]);
      return { data: newQuotation, error: null };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('quotation_requests')
        .insert([input])
        .select()
        .single();

      if (error) {
        console.warn('Supabase quotation insert failed, using fallback store:', error.message);
        const local = getLocalQuotations();
        const newQuotation: QuotationRequest = {
          ...input,
          id: 'q-' + Date.now(),
          created_at: new Date().toISOString(),
        };
        saveLocalQuotations([newQuotation, ...local]);
        return { data: newQuotation, error: null };
      }

      return { data: data as QuotationRequest, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to submit quotation request' };
    }
  },

  async getQuotationRequests(): Promise<{ data: QuotationRequest[]; error: string | null }> {
    if (!isSupabaseConfigured) {
      return { data: getLocalQuotations(), error: null };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('quotation_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase quotations fetch error, falling back:', error.message);
        return { data: getLocalQuotations(), error: null };
      }

      return { data: (data || []) as QuotationRequest[], error: null };
    } catch (err: any) {
      return { data: getLocalQuotations(), error: null };
    }
  },

  async deleteQuotationRequest(id: string): Promise<{ success: boolean; error: string | null }> {
    if (!isSupabaseConfigured) {
      const local = getLocalQuotations();
      saveLocalQuotations(local.filter((q) => q.id !== id));
      return { success: true, error: null };
    }

    try {
      const { error } = await (supabase as any)
        .from('quotation_requests')
        .delete()
        .eq('id', id);

      if (error) {
        const local = getLocalQuotations();
        saveLocalQuotations(local.filter((q) => q.id !== id));
        return { success: true, error: null };
      }

      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to delete quotation request' };
    }
  }
};
