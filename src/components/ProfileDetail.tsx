
import React from 'react';
import { Profile } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Map from '@/components/Map';
import { 
  MapPin, Mail, Phone, Globe, Clock, Tag, Heart, ArrowLeft, ExternalLink 
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

  // Function to open Google Maps for this profile
  const openInGoogleMaps = () => {
    const { lat, lng } = profile.address.coordinates;
    window.open(`https://www.google.com/maps?q=${lat},${lng}&z=15&t=m&hl=en&title=${encodeURIComponent(profile.name)}`, '_blank');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#E0E0E0] flex items-center">
          <span className="bg-gradient-to-r from-[#1ABC9C] to-blue-400 bg-clip-text text-transparent">
            Profile Details
          </span>
        </h2>
        <Button variant="outline" onClick={onClose} className="border-[#1ABC9C] text-[#1ABC9C] hover:bg-[#1ABC9C]/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-[#1e1e1e] border-gray-800">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <img
                  src={profile.imageUrl}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#1ABC9C]/30 mb-4"
                />
                <h3 className="text-xl font-semibold text-center mb-1 text-[#E0E0E0]">{profile.name}</h3>
                
                <div className="flex items-center text-gray-400 mb-4">
                  <MapPin className="h-4 w-4 mr-1 text-[#1ABC9C]" />
                  <span className="text-sm">
                    {profile.address.city}, {profile.address.state}
                  </span>
                </div>
                
                <p className="text-gray-300 text-center mb-4">{profile.description}</p>
                
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {profile.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#2a2a2a] text-[#1ABC9C] border border-[#1ABC9C]/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1e1e1e] border-gray-800">
            <CardContent className="pt-6">
              <h4 className="text-md font-semibold mb-4 flex items-center text-[#E0E0E0]">
                <Mail className="h-4 w-4 mr-2 text-[#1ABC9C]" />
                Contact Information
              </h4>
              
              {profile.contactInfo && (
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-[#E0E0E0]">{profile.contactInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-[#E0E0E0]">{profile.contactInfo.phone}</p>
                    </div>
                  </div>
                  
                  {profile.contactInfo.website && (
                    <div className="flex items-start">
                      <Globe className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-400">Website</p>
                        <a 
                          href={`https://${profile.contactInfo.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#1ABC9C] hover:underline"
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
            <Card className="bg-[#1e1e1e] border-gray-800">
              <CardContent className="pt-6">
                <h4 className="text-md font-semibold mb-4 flex items-center text-[#E0E0E0]">
                  <Heart className="h-4 w-4 mr-2 text-[#1ABC9C]" />
                  Interests
                </h4>
                
                <div className="flex flex-wrap gap-1">
                  {profile.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="border-[#1ABC9C] text-[#1ABC9C]">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className="bg-[#1e1e1e] border-gray-800">
            <CardContent className="pt-6">
              <h4 className="text-md font-semibold mb-4 flex items-center text-[#E0E0E0]">
                <Clock className="h-4 w-4 mr-2 text-[#1ABC9C]" />
                Profile Timeline
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div>
                    <p className="text-sm text-gray-400">Created</p>
                    <p className="text-[#E0E0E0]">{formatDate(profile.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div>
                    <p className="text-sm text-gray-400">Last Updated</p>
                    <p className="text-[#E0E0E0]">{formatDate(profile.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-[#1e1e1e] border-gray-800">
            <CardContent className="pt-6">
              <h4 className="text-md font-semibold mb-4 flex items-center text-[#E0E0E0]">
                <MapPin className="h-4 w-4 mr-2 text-[#1ABC9C]" />
                Location
              </h4>
              
              <div className="mb-4">
                <p className="text-[#E0E0E0] mb-1">
                  {profile.address.street}
                </p>
                <p className="text-[#E0E0E0]">
                  {profile.address.city}, {profile.address.state} {profile.address.zip}
                </p>
                <p className="text-[#E0E0E0] mb-4">
                  {profile.address.country}
                </p>
                
                <Button 
                  onClick={openInGoogleMaps}
                  className="bg-[#1ABC9C] hover:bg-[#16a085] text-white transition-colors"
                >
                  View on Google Maps
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
