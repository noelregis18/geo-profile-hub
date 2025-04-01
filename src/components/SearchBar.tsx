
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProfiles } from '@/context/ProfileContext';
import { Search, MapPin, X, User, Tag } from 'lucide-react';
import { Profile } from '@/types';

const SearchBar: React.FC = () => {
  const { setSearchFilters, searchFilters, profiles, setSelectedProfile } = useProfiles();
  const [nameInput, setNameInput] = useState(searchFilters.name || '');
  const [locationInput, setLocationInput] = useState(searchFilters.location || '');
  const [showNameSuggestions, setShowNameSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  
  // Suggestions based on input
  const nameSuggestions = nameInput 
    ? profiles.filter(p => p.name.toLowerCase().includes(nameInput.toLowerCase()))
    : [];
  
  const locationSuggestions = locationInput
    ? profiles.filter(p => 
        Object.values(p.address)
          .some(value => 
            typeof value === 'string' && 
            value.toLowerCase().includes(locationInput.toLowerCase())
          )
      )
    : [];

  const handleSearch = () => {
    setSearchFilters({
      name: nameInput || undefined,
      location: locationInput || undefined,
    });
    setShowNameSuggestions(false);
    setShowLocationSuggestions(false);
  };

  const handleClear = () => {
    setNameInput('');
    setLocationInput('');
    setSearchFilters({});
    setShowNameSuggestions(false);
    setShowLocationSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleNameSuggestionClick = (profile: Profile) => {
    setNameInput(profile.name);
    setShowNameSuggestions(false);
    setSearchFilters({
      ...searchFilters,
      name: profile.name,
    });
    // Open the profile details view when clicking on a name suggestion
    setSelectedProfile(profile);
  };

  const handleLocationSuggestionClick = (profile: Profile) => {
    const location = `${profile.address.city}, ${profile.address.state}`;
    setLocationInput(location);
    setShowLocationSuggestions(false);
    setSearchFilters({
      ...searchFilters,
      location: location,
    });
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (nameInputRef.current && !nameInputRef.current.contains(event.target as Node)) {
        setShowNameSuggestions(false);
      }
      if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full p-4 bg-[#1e1e1e] rounded-lg shadow-sm border border-gray-800">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name..."
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
              setShowNameSuggestions(e.target.value.length > 0);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => nameInput && setShowNameSuggestions(true)}
            className="pl-9 bg-[#2a2a2a] border-gray-700 text-[#E0E0E0] focus:border-[#1ABC9C]"
            ref={nameInputRef}
          />
          
          {showNameSuggestions && nameSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-[#2a2a2a] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
              {nameSuggestions.map(profile => (
                <div 
                  key={profile.id}
                  className="flex items-center p-2 hover:bg-[#333333] cursor-pointer transition-colors"
                  onClick={() => handleNameSuggestionClick(profile)}
                >
                  <div className="flex-shrink-0 mr-2">
                    <img src={profile.imageUrl} alt={profile.name} className="w-8 h-8 rounded-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[#E0E0E0] font-medium">{profile.name}</p>
                    <div className="flex text-xs text-gray-400">
                      {profile.tags?.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="mr-1">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by location..."
            value={locationInput}
            onChange={(e) => {
              setLocationInput(e.target.value);
              setShowLocationSuggestions(e.target.value.length > 0);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => locationInput && setShowLocationSuggestions(true)}
            className="pl-9 bg-[#2a2a2a] border-gray-700 text-[#E0E0E0] focus:border-[#1ABC9C]"
            ref={locationInputRef}
          />
          
          {showLocationSuggestions && locationSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-[#2a2a2a] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
              {locationSuggestions.map(profile => (
                <div 
                  key={profile.id}
                  className="flex items-center p-2 hover:bg-[#333333] cursor-pointer transition-colors"
                  onClick={() => handleLocationSuggestionClick(profile)}
                >
                  <MapPin className="w-5 h-5 mr-2 text-[#1ABC9C]" />
                  <div>
                    <p className="text-[#E0E0E0] font-medium">{profile.address.city}, {profile.address.state}</p>
                    <p className="text-xs text-gray-400">{profile.address.country}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleSearch} 
            className="bg-[#1ABC9C] hover:bg-[#16a085] text-white"
          >
            Search
          </Button>
          
          {(nameInput || locationInput) && (
            <Button 
              variant="outline" 
              onClick={handleClear} 
              aria-label="Clear search"
              className="border-gray-700 text-gray-400 hover:text-[#E0E0E0] hover:bg-[#333333]"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
