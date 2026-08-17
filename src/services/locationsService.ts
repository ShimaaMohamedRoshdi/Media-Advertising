import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { LocationItem, CreateLocationInput, UpdateLocationInput } from '../types/location';
import { INITIAL_LOCATIONS } from '../data/initialLocations';

const LOCAL_STORAGE_KEY = 'media_advertising_locations_v2';

const getLocalLocations = (): LocationItem[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_LOCATIONS));
    return INITIAL_LOCATIONS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_LOCATIONS;
  }
};

const saveLocalLocations = (locations: LocationItem[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locations));
};

export const locationsService = {
  async getLocations(): Promise<{ data: LocationItem[]; error: string | null }> {
    if (!isSupabaseConfigured) {
      return { data: getLocalLocations(), error: null };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('locations')
        .select('*')
        .order('created_at', { ascending: true });

      if (error || !data || data.length === 0) {
        return { data: getLocalLocations(), error: null };
      }

      return { data: data as LocationItem[], error: null };
    } catch {
      return { data: getLocalLocations(), error: null };
    }
  },

  async getLocationById(id: string): Promise<{ data: LocationItem | null; error: string | null }> {
    if (!isSupabaseConfigured) {
      const loc = getLocalLocations().find((l) => l.id === id) || null;
      return { data: loc, error: null };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('locations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        const fallback = getLocalLocations().find((l) => l.id === id) || null;
        return { data: fallback, error: null };
      }

      return { data: data as LocationItem, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to fetch location' };
    }
  },

  async createLocation(input: CreateLocationInput): Promise<{ data: LocationItem | null; error: string | null }> {
    if (!isSupabaseConfigured) {
      const local = getLocalLocations();
      const newLoc: LocationItem = {
        ...input,
        id: 'loc-' + Date.now(),
        zone: input.zone || 'Sheikh Zayed Road Boulevard Zone',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      saveLocalLocations([...local, newLoc]);
      return { data: newLoc, error: null };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('locations')
        .insert([input])
        .select()
        .single();

      if (error) {
        const local = getLocalLocations();
        const newLoc: LocationItem = {
          ...input,
          id: 'loc-' + Date.now(),
          zone: input.zone || 'Sheikh Zayed Road Boulevard Zone',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        saveLocalLocations([...local, newLoc]);
        return { data: newLoc, error: null };
      }

      return { data: data as LocationItem, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to create location' };
    }
  },

  async updateLocation(id: string, updates: UpdateLocationInput): Promise<{ data: LocationItem | null; error: string | null }> {
    if (!isSupabaseConfigured) {
      const local = getLocalLocations();
      const index = local.findIndex((l) => l.id === id);
      if (index === -1) return { data: null, error: 'Location not found' };

      const updatedLoc: LocationItem = {
        ...local[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      local[index] = updatedLoc;
      saveLocalLocations(local);
      return { data: updatedLoc, error: null };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('locations')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as LocationItem, error: null };
    } catch (err: any) {
      return { data: null, error: err.message || 'Failed to update location' };
    }
  },

  async deleteLocation(id: string): Promise<{ success: boolean; error: string | null }> {
    if (!isSupabaseConfigured) {
      const local = getLocalLocations();
      saveLocalLocations(local.filter((l) => l.id !== id));
      return { success: true, error: null };
    }

    try {
      const { error } = await (supabase as any)
        .from('locations')
        .delete()
        .eq('id', id);

      if (error) {
        const local = getLocalLocations();
        saveLocalLocations(local.filter((l) => l.id !== id));
        return { success: true, error: null };
      }

      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to delete location' };
    }
  }
};
