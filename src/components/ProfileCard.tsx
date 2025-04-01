
import React from 'react';
import { Profile } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Map, ExternalLink } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  onSummaryClick: () => void;
  onDetailsClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSummaryClick, onDetailsClick }) => {
  const { name, imageUrl, description, tags = [] } = profile;

  return (
    <Card className="profile-card w-full bg-[#1e1e1e] border-gray-800 hover:border-[#1ABC9C]/50 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={imageUrl}
              alt={name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#1ABC9C]/30"
            />
            <div>
              <h3 className="text-lg font-semibold text-[#E0E0E0]">{name}</h3>
              <p className="text-sm text-gray-400">
                {profile.address.city}, {profile.address.state}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-gray-300 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-[#2a2a2a] text-[#1ABC9C] border border-[#1ABC9C]/20 font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          className="text-[#1ABC9C] border-[#1ABC9C] hover:bg-[#1ABC9C]/10 hover:text-[#1ABC9C] btn-pulse"
          onClick={onSummaryClick}
        >
          <Map className="mr-1 h-4 w-4" />
          Show on Map
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-[#1ABC9C]"
          onClick={onDetailsClick}
        >
          View Details
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
