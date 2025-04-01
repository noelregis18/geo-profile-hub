
import React from 'react';
import { Profile } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Map from '@/components/Map';
import { 
  MapPin, Mail, Phone, Globe, Clock, Tag, Heart 
} from 'lucide-react';

interface ProfileDetailProps {
  profile: Profile;
  onClose: () => void;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ profile, onClose }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Profile Details</h2>
        <Button variant="outline" onClick={onClose}>
          Back to List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <img
                  src={profile.imageUrl}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-geo-lightBlue mb-4"
                />
                <h3 className="text-xl font-semibold text-center mb-1">{profile.name}</h3>
                
                <div className="flex items-center text-geo-darkGray mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {profile.address.city}, {profile.address.state}
                  </span>
                </div>
                
                <p className="text-gray-700 text-center mb-4">{profile.description}</p>
                
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {profile.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-geo-lightBlue text-geo-darkBlue">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="text-md font-semibold mb-4 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-geo-blue" />
                Contact Information
              </h4>
              
              {profile.contactInfo && (
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-4 w-4 mr-2 text-geo-darkGray mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800">{profile.contactInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 mr-2 text-geo-darkGray mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-800">{profile.contactInfo.phone}</p>
                    </div>
                  </div>
                  
                  {profile.contactInfo.website && (
                    <div className="flex items-start">
                      <Globe className="h-4 w-4 mr-2 text-geo-darkGray mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <a 
                          href={`https://${profile.contactInfo.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-geo-blue hover:underline"
                        >
                          {profile.contactInfo.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          {profile.interests && profile.interests.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-md font-semibold mb-4 flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-geo-blue" />
                  Interests
                </h4>
                
                <div className="flex flex-wrap gap-1">
                  {profile.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="border-geo-blue text-geo-blue">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardContent className="pt-6">
              <h4 className="text-md font-semibold mb-4 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-geo-blue" />
                Profile Timeline
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="text-gray-800">{formatDate(profile.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-gray-800">{formatDate(profile.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h4 className="text-md font-semibold mb-4 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-geo-blue" />
                Location
              </h4>
              
              <div className="mb-4">
                <p className="text-gray-800 mb-1">
                  {profile.address.street}
                </p>
                <p className="text-gray-800">
                  {profile.address.city}, {profile.address.state} {profile.address.zip}
                </p>
                <p className="text-gray-800">
                  {profile.address.country}
                </p>
              </div>
              
              <div className="h-[400px] rounded-md overflow-hidden">
                <Map profile={profile} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
