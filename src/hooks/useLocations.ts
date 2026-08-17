import { useState, useEffect, useCallback } from 'react';
import type { LocationItem, CreateLocationInput, UpdateLocationInput } from '../types/location';
import { locationsService } from '../services/locationsService';

export function useLocations() {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const result = await locationsService.getLocations();
    if (result.error) {
      setError(result.error);
    } else {
      setLocations(result.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const addLocation = async (input: CreateLocationInput) => {
    const result = await locationsService.createLocation(input);
    if (result.error) {
      throw new Error(result.error);
    }
    if (result.data) {
      setLocations((prev) => [...prev, result.data!]);
    }
    return result.data;
  };

  const updateLocation = async (id: string, updates: UpdateLocationInput) => {
    const result = await locationsService.updateLocation(id, updates);
    if (result.error) {
      throw new Error(result.error);
    }
    if (result.data) {
      setLocations((prev) => prev.map((l) => (l.id === id ? result.data! : l)));
    }
    return result.data;
  };

  const deleteLocation = async (id: string) => {
    const result = await locationsService.deleteLocation(id);
    if (result.error) {
      throw new Error(result.error);
    }
    setLocations((prev) => prev.filter((l) => l.id !== id));
    return true;
  };

  return {
    locations,
    isLoading,
    error,
    refresh: fetchLocations,
    addLocation,
    updateLocation,
    deleteLocation,
  };
}
