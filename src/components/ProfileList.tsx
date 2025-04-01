
import React from 'react';
import { useProfiles } from '@/context/ProfileContext';
import ProfileCard from './ProfileCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin } from 'lucide-react';

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
        <div className="w-8 h-8 border-4 border-[#1ABC9C] border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-3 text-[#E0E0E0] font-medium">Loading profiles...</p>
      </div>
    );
  }

  if (filteredProfiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 bg-[#1e1e1e] rounded-full flex items-center justify-center mb-4">
          <MapPin className="h-8 w-8 text-[#1ABC9C]" />
        </div>
        <h3 className="text-lg font-medium text-[#E0E0E0] mb-1">No profiles found</h3>
        <p className="text-sm text-gray-400 max-w-md">
          Try adjusting your search criteria or add new profiles to your collection.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className={`w-full rounded-md border border-gray-800 bg-[#1a1a1a] p-4`} style={{ maxHeight }}>
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
