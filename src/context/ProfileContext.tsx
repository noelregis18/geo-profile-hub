
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Profile, SearchFilters } from '../types';
import { mockProfiles } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';

interface ProfileContextType {
  profiles: Profile[];
  selectedProfile: Profile | null;
  searchFilters: SearchFilters;
  loading: boolean;
  error: string | null;
  setSelectedProfile: (profile: Profile | null) => void;
  addProfile: (profile: Profile) => void;
  updateProfile: (id: string, profile: Partial<Profile>) => void;
  deleteProfile: (id: string) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  filteredProfiles: Profile[];
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Add a new profile
  const addProfile = (profile: Profile) => {
    // Ensure coordinates are properly set to avoid issues with map integration
    if (!profile.address.coordinates || 
        typeof profile.address.coordinates.lat !== 'number' || 
        typeof profile.address.coordinates.lng !== 'number') {
      
      // Default to a location in India if coordinates are missing or invalid
      profile.address.coordinates = {
        lat: 22.5726, // Default latitude (center of India)
        lng: 88.3639  // Default longitude (Kolkata)
      };

      toast({
        title: "Location Coordinates Updated",
        description: "Using default coordinates since valid ones were not provided.",
      });
    }

    // Add the new profile to the profiles array
    setProfiles((prevProfiles) => [...prevProfiles, profile]);
    
    // Automatically select the newly added profile to show its details
    setSelectedProfile(profile);
    
    toast({
      title: "Profile Added",
      description: `${profile.name}'s profile has been added successfully.`,
    });
  };

  // Update an existing profile
  const updateProfile = (id: string, updatedProfile: Partial<Profile>) => {
    setProfiles((prevProfiles) => {
      const newProfiles = prevProfiles.map((profile) =>
        profile.id === id ? { ...profile, ...updatedProfile, updatedAt: new Date().toISOString() } : profile
      );
      
      // If the updated profile is currently selected, update the selected profile as well
      if (selectedProfile?.id === id) {
        const updatedSelectedProfile = newProfiles.find(p => p.id === id) || null;
        setSelectedProfile(updatedSelectedProfile);
      }
      
      return newProfiles;
    });
  };

  // Delete a profile
  const deleteProfile = (id: string) => {
    setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== id));
    if (selectedProfile?.id === id) {
      setSelectedProfile(null);
    }
  };

  // Filter profiles based on search criteria
  const filteredProfiles = profiles.filter((profile) => {
    const nameMatch = !searchFilters.name || 
      profile.name.toLowerCase().includes(searchFilters.name.toLowerCase());
    
    const locationMatch = !searchFilters.location || 
      Object.values(profile.address)
        .some(value => 
          typeof value === 'string' && 
          value.toLowerCase().includes(searchFilters.location?.toLowerCase() || '')
        );
    
    const tagsMatch = !searchFilters.tags?.length || 
      searchFilters.tags.every(tag => profile.tags?.includes(tag));
    
    return nameMatch && locationMatch && tagsMatch;
  });

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        selectedProfile,
        searchFilters,
        loading,
        error,
        setSelectedProfile,
        addProfile,
        updateProfile,
        deleteProfile,
        setSearchFilters,
        filteredProfiles
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};
