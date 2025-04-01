
export interface Profile {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contactInfo?: {
    email: string;
    phone: string;
    website?: string;
  };
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  interests?: string[];
}

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  profileId: string;
  profileName: string;
}

export interface SearchFilters {
  name?: string;
  location?: string;
  tags?: string[];
}
