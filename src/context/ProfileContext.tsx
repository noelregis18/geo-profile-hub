
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Profile, SearchFilters } from '../types';
import { mockProfiles } from '../data/mockData';

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

  // Add a new profile
  const addProfile = (profile: Profile) => {
    setProfiles((prevProfiles) => [...prevProfiles, profile]);
  };

  // Update an existing profile
  const updateProfile = (id: string, updatedProfile: Partial<Profile>) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === id ? { ...profile, ...updatedProfile, updatedAt: new Date().toISOString() } : profile
      )
    );
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
