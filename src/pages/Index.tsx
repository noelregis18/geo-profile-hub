
import React, { useState, useEffect } from 'react';
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
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // When selectedProfile changes, switch to detail view if it exists
  useEffect(() => {
    if (selectedProfile) {
      setViewMode('detail');
    }
  }, [selectedProfile]);

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

  const animationClass = pageLoaded ? 'animate-fade-in' : '';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-dark text-[#E0E0E0]">
      <Navbar />
      
      <main className="flex-1 container px-4 py-6">
        {viewMode === 'list' ? (
          <>
            <div className={`mb-6 ${animationClass}`}>
              <SearchBar />
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className={`w-full ${showMap ? 'lg:w-1/2' : 'lg:w-full'} ${animationClass} delay-150`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#E0E0E0] flex items-center">
                    <Users className="mr-2 h-6 w-6 text-[#1ABC9C]" />
                    Profiles
                    <span className="ml-2 text-sm font-normal text-gray-400">
                      ({filteredProfiles.length} {filteredProfiles.length === 1 ? 'profile' : 'profiles'})
                    </span>
                  </h2>
                  <Button
                    variant="outline"
                    className={`border-[#1ABC9C] ${showMap ? 'text-[#1ABC9C]' : 'bg-[#1ABC9C] text-white hover:bg-[#16a085]'}`}
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
                <div className="w-full lg:w-1/2 h-[500px] lg:h-auto animate-fade-in delay-300">
                  <div className="sticky top-6">
                    <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-sm border border-gray-800 h-[500px]">
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
