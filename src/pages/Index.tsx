
import React, { useState } from 'react';
import { useProfiles } from '@/context/ProfileContext';
import Navbar from '@/components/Navbar';
import ProfileList from '@/components/ProfileList';
import ProfileDetail from '@/components/ProfileDetail';
import SearchBar from '@/components/SearchBar';
import Map from '@/components/Map';
import { Button } from '@/components/ui/button';
import { MapPin, Users } from 'lucide-react';

const Index: React.FC = () => {
  const { profiles, selectedProfile, setSelectedProfile, filteredProfiles } = useProfiles();
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [showMap, setShowMap] = useState(false);

  const handleProfileSelect = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setSelectedProfile(profile);
      setShowMap(true);
    }
  };

  const handleViewDetails = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setSelectedProfile(profile);
      setViewMode('detail');
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container px-4 py-6">
        {viewMode === 'list' ? (
          <>
            <div className="mb-6">
              <SearchBar />
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className={`w-full ${showMap ? 'lg:w-1/2' : 'lg:w-full'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Users className="mr-2 h-6 w-6 text-geo-blue" />
                    Profiles
                    <span className="ml-2 text-sm font-normal text-geo-darkGray">
                      ({filteredProfiles.length} {filteredProfiles.length === 1 ? 'profile' : 'profiles'})
                    </span>
                  </h2>
                  <Button
                    variant="outline"
                    className={`border-geo-blue ${showMap ? 'text-geo-blue' : 'bg-geo-blue text-white hover:bg-geo-darkBlue'}`}
                    onClick={toggleMap}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {showMap ? 'Hide Map' : 'Show All on Map'}
                  </Button>
                </div>
                
                <ProfileList
                  onProfileSelect={handleProfileSelect}
                  onViewDetails={handleViewDetails}
                />
              </div>
              
              {showMap && (
                <div className="w-full lg:w-1/2 h-[500px] lg:h-auto">
                  <div className="sticky top-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <MapPin className="mr-2 h-6 w-6 text-geo-blue" />
                      Location Map
                    </h2>
                    <div className="bg-white p-4 rounded-lg shadow-sm border h-[500px]">
                      <Map
                        profile={selectedProfile}
                        profiles={!selectedProfile ? filteredProfiles : undefined}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          selectedProfile && <ProfileDetail profile={selectedProfile} onClose={handleBackToList} />
        )}
      </main>
    </div>
  );
};

export default Index;
