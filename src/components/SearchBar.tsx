
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProfiles } from '@/context/ProfileContext';
import { Search, MapPin, X } from 'lucide-react';

const SearchBar: React.FC = () => {
  const { setSearchFilters, searchFilters } = useProfiles();
  const [nameInput, setNameInput] = useState(searchFilters.name || '');
  const [locationInput, setLocationInput] = useState(searchFilters.location || '');

  const handleSearch = () => {
    setSearchFilters({
      name: nameInput || undefined,
      location: locationInput || undefined,
    });
  };

  const handleClear = () => {
    setNameInput('');
    setLocationInput('');
    setSearchFilters({});
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9"
          />
        </div>
        
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by location..."
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSearch} className="bg-geo-blue hover:bg-geo-darkBlue">
            Search
          </Button>
          
          {(nameInput || locationInput) && (
            <Button variant="outline" onClick={handleClear} aria-label="Clear search">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
