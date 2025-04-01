
import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Profile } from '../types';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink } from 'lucide-react';

interface MapProps {
  profile?: Profile | null;
  profiles?: Profile[];
  isFullscreen?: boolean;
}

const Map: React.FC<MapProps> = ({ profile, profiles, isFullscreen = false }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { toast } = useToast();

  // Function to open Google Maps for a location
  const openInGoogleMaps = (lat: number, lng: number, name: string) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}&z=15&t=m&hl=en&title=${encodeURIComponent(name)}`, '_blank');
  };

  useEffect(() => {
    if (!mapContainer.current) return;
    
    try {
      setMapLoaded(true);
      
      // Set up the content in a safer way that doesn't manipulate DOM directly
      // This avoids the removeChild error
    } catch (error) {
      console.error('Error with map:', error);
      toast({
        title: "Map Error",
        description: "Failed to initialize map view.",
        variant: "destructive"
      });
    }
  }, [profile, profiles, toast]);

  // Render the Google Maps button directly in JSX instead of DOM manipulation
  return (
    <div className="flex flex-col h-full">
      <div 
        ref={mapContainer} 
        className={`map-container relative ${isFullscreen ? 'flex-1' : 'h-[400px]'} rounded-lg overflow-hidden bg-[#1e1e1e] flex items-center justify-center`}
      >
        {!mapLoaded ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-4 border-[#1ABC9C] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#E0E0E0] font-medium">Loading map options...</p>
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-[#1e1e1e] rounded-lg">
            {profile ? (
              <button 
                onClick={() => openInGoogleMaps(
                  profile.address.coordinates.lat,
                  profile.address.coordinates.lng,
                  profile.name
                )}
                className="flex items-center space-x-2 px-4 py-2 bg-[#1ABC9C] text-white rounded hover:bg-[#16a085] transition-colors"
              >
                View {profile.name}'s Location on Google Maps 
                <ExternalLink className="ml-2 h-4 w-4" />
              </button>
            ) : profiles && profiles.length > 0 ? (
              <button 
                onClick={() => {
                  // Open Google Maps with the first profile location
                  const firstProfile = profiles[0];
                  openInGoogleMaps(
                    firstProfile.address.coordinates.lat,
                    firstProfile.address.coordinates.lng,
                    "All Profiles"
                  );
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-[#1ABC9C] text-white rounded hover:bg-[#16a085] transition-colors"
              >
                View All Locations on Google Maps
                <ExternalLink className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <p className="text-[#E0E0E0]">No location data available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
