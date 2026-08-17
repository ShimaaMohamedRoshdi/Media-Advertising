export type LocationStatus = 'Available' | 'Booked';

export interface LocationItem {
  id: string;
  name: string;
  description: string;
  image_url: string;
  location_text: string;
  zone?: string;
  specs?: string | null;
  status?: LocationStatus;
  display_type?: string;
  dimensions?: string;
  map_url?: string;
  created_at?: string;
  updated_at?: string;
}

export type CreateLocationInput = Omit<LocationItem, 'id' | 'created_at' | 'updated_at'>;
export type UpdateLocationInput = Partial<CreateLocationInput>;
