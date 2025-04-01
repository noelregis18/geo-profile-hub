
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Profile } from '../types';
import { useToast } from '@/components/ui/use-toast';
import { ExternalLink } from 'lucide-react';

// Set a default Mapbox token (you should replace this with your actual token later)
const MAPBOX_TOKEN = 'pk.eyJ1Ijoibm9lbHJlZ2lzMTgiLCJhIjoiY2x6NG5iNGZsMDBhdTJpcGQ2eG8wamwxdyJ9.b82-OkGjFxOG8fFy0WhBnQ';

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
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      // Create map placeholder
      const mapPlaceholder = document.createElement('div');
      mapPlaceholder.className = 'h-full w-full flex items-center justify-center bg-[#1e1e1e] rounded-lg';
      
      // Add a "View on Google Maps" button
      const googleMapsButton = document.createElement('button');
      googleMapsButton.className = 'flex items-center space-x-2 px-4 py-2 bg-[#1ABC9C] text-white rounded hover:bg-[#16a085] transition-colors';
      
      if (profile) {
        googleMapsButton.innerHTML = `View ${profile.name}'s Location on Google Maps <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>`;
        googleMapsButton.onclick = () => {
          openInGoogleMaps(
            profile.address.coordinates.lat,
            profile.address.coordinates.lng,
            profile.name
          );
        };
      } else if (profiles && profiles.length > 0) {
        googleMapsButton.innerHTML = `View All Locations on Google Maps <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>`;
        googleMapsButton.onclick = () => {
          // Just open Google Maps with the first profile location
          const firstProfile = profiles[0];
          openInGoogleMaps(
            firstProfile.address.coordinates.lat,
            firstProfile.address.coordinates.lng,
            "All Profiles"
          );
        };
      }
      
      // Clear existing content and append button
      mapContainer.current.innerHTML = '';
      mapPlaceholder.appendChild(googleMapsButton);
      mapContainer.current.appendChild(mapPlaceholder);
      
      setMapLoaded(true);
    } catch (error) {
      console.error('Error with map:', error);
      toast({
        title: "Map Error",
        description: "Failed to initialize map view.",
        variant: "destructive"
      });
    }

    // No cleanup needed since we're not creating a mapbox map
  }, [profile, profiles, toast]);

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={mapContainer} 
        className={`map-container relative ${isFullscreen ? 'flex-1' : 'h-[400px]'} rounded-lg overflow-hidden bg-[#333333] flex items-center justify-center`}
      >
        {!mapLoaded && (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-4 border-[#1ABC9C] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#E0E0E0] font-medium">Loading map options...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
