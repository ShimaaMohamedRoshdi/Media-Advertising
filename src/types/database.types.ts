import type { Project } from './project';
import type { LocationItem } from './location';
import type { QuotationRequest } from './quotation';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: {
          id?: string;
          title: string;
          description: string;
          image_url: string;
          location: string;
          category: string;
          optional_details?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          image_url?: string;
          location?: string;
          category?: string;
          optional_details?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      locations: {
        Row: LocationItem;
        Insert: {
          id?: string;
          name: string;
          description: string;
          image_url: string;
          location_text: string;
          zone?: string;
          specs?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          image_url?: string;
          location_text?: string;
          zone?: string;
          specs?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      quotation_requests: {
        Row: QuotationRequest;
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          company?: string | null;
          service_type: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          company?: string | null;
          service_type?: string;
          message?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
  };
}
