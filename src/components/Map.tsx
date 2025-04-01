
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Profile } from '../types';
import { useToast } from '@/components/ui/use-toast';

// Replace with your temporary Mapbox token for demo purposes
// In production, this should come from environment variables or user input
// For a real implementation, you'd need to get this from Supabase secrets or user input
const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN';

interface MapProps {
  profile?: Profile | null;
  profiles?: Profile[];
  isFullscreen?: boolean;
}

const Map: React.FC<MapProps> = ({ profile, profiles, isFullscreen = false }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapToken, setMapToken] = useState<string>(MAPBOX_TOKEN);
  const [mapTokenInput, setMapTokenInput] = useState<string>('');
  const { toast } = useToast();

  // Function to initialize map
  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;
    try {
      mapboxgl.accessToken = token;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 12,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        setMapLoaded(true);
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        toast({
          title: "Map Error",
          description: "Failed to load map. Please check your Mapbox token.",
          variant: "destructive"
        });
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: "Map Error",
        description: "Failed to initialize map. Please check your Mapbox token.",
        variant: "destructive"
      });
    }
  };

  // Function to set map token and initialize
  const handleSetMapToken = () => {
    if (mapTokenInput) {
      setMapToken(mapTokenInput);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      initializeMap(mapTokenInput);
      toast({
        title: "Success",
        description: "Mapbox token set successfully",
      });
    }
  };

  // Initial map setup
  useEffect(() => {
    if (!map.current && mapToken !== 'YOUR_MAPBOX_TOKEN') {
      initializeMap(mapToken);
    }

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapToken]);

  // Update markers when profiles change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    // Single profile mode
    if (profile) {
      const { lat, lng } = profile.address.coordinates;
      
      // Ensure coordinates are valid
      if (isNaN(lat) || isNaN(lng)) {
        toast({
          title: "Invalid Coordinates",
          description: `The coordinates for ${profile.name} are invalid.`,
          variant: "destructive"
        });
        return;
      }

      // Create new marker
      const marker = new mapboxgl.Marker({ color: '#1A73E8' })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <div class="p-2">
            <h3 class="font-bold">${profile.name}</h3>
            <p>${profile.address.street}, ${profile.address.city}</p>
          </div>
        `))
        .addTo(map.current);
      
      markers.current[profile.id] = marker;
      
      // Center map on the marker
      map.current.flyTo({
        center: [lng, lat],
        zoom: 14,
        essential: true
      });
    } 
    // Multiple profiles mode
    else if (profiles && profiles.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      
      profiles.forEach(p => {
        const { lat, lng } = p.address.coordinates;
        
        // Ensure coordinates are valid
        if (isNaN(lat) || isNaN(lng)) {
          console.warn(`Invalid coordinates for ${p.name}`);
          return;
        }

        bounds.extend([lng, lat]);
        
        const marker = new mapboxgl.Marker({ color: '#1A73E8' })
          .setLngLat([lng, lat])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-bold">${p.name}</h3>
              <p>${p.address.street}, ${p.address.city}</p>
            </div>
          `))
          .addTo(map.current);
        
        markers.current[p.id] = marker;
      });

      // Fit map to bounds with padding
      if (!bounds.isEmpty()) {
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
      }
    }
  }, [profile, profiles, mapLoaded, toast]);

  return (
    <div className="flex flex-col h-full">
      {mapToken === 'YOUR_MAPBOX_TOKEN' && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex items-start">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Mapbox Token Required</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Please enter your Mapbox token to use the map functionality:</p>
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    value={mapTokenInput}
                    onChange={(e) => setMapTokenInput(e.target.value)}
                    placeholder="Enter Mapbox token"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <button
                    onClick={handleSetMapToken}
                    className="px-4 py-2 bg-geo-blue text-white rounded-md text-sm hover:bg-geo-darkBlue transition"
                  >
                    Set Token
                  </button>
                </div>
                <p className="text-xs mt-2">
                  Get a token at <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className={`map-container relative ${isFullscreen ? 'flex-1' : 'h-[400px]'} rounded-lg shadow-md overflow-hidden`}
      >
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 border-4 border-geo-blue border-t-transparent rounded-full animate-spin"></div>
              <p className="text-geo-darkBlue font-medium">Loading map...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
