
import React from 'react';
import { useProfiles } from '@/context/ProfileContext';
import ProfileCard from './ProfileCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProfileListProps {
  onProfileSelect: (profileId: string) => void;
  onViewDetails: (profileId: string) => void;
  maxHeight?: string;
}

const ProfileList: React.FC<ProfileListProps> = ({ 
  onProfileSelect, 
  onViewDetails, 
  maxHeight = "calc(100vh - 350px)" 
}) => {
  const { filteredProfiles, loading } = useProfiles();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-4 border-geo-blue border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-3 text-geo-darkBlue font-medium">Loading profiles...</p>
      </div>
    );
  }

  if (filteredProfiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 bg-geo-lightBlue rounded-full flex items-center justify-center mb-4">
          <Map className="h-8 w-8 text-geo-blue" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No profiles found</h3>
        <p className="text-sm text-gray-500 max-w-md">
          Try adjusting your search criteria or add new profiles to your collection.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className={`w-full rounded-md border p-4`} style={{ maxHeight }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-2">
        {filteredProfiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onSummaryClick={() => onProfileSelect(profile.id)}
            onDetailsClick={() => onViewDetails(profile.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProfileList;
