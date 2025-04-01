
import React from 'react';
import { Profile } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Map } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  onSummaryClick: () => void;
  onDetailsClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSummaryClick, onDetailsClick }) => {
  const { name, imageUrl, description, tags = [] } = profile;

  return (
    <Card className="profile-card w-full bg-white animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={imageUrl}
              alt={name}
              className="w-14 h-14 rounded-full object-cover border-2 border-geo-lightBlue"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-geo-darkGray">
                {profile.address.city}, {profile.address.state}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-geo-lightBlue text-geo-darkBlue font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          className="text-geo-blue border-geo-blue hover:bg-geo-lightBlue hover:text-geo-darkBlue btn-pulse"
          onClick={onSummaryClick}
        >
          <Map className="mr-1 h-4 w-4" />
          Show on Map
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-geo-darkGray hover:text-geo-darkBlue"
          onClick={onDetailsClick}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
