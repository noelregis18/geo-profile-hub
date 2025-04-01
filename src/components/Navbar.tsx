
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b">
      <div className="container px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-geo-blue" />
          <h1 className="text-xl font-bold text-gray-900">Geo Profile Hub</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/">
            <Button 
              variant={isActive('/') ? "default" : "ghost"} 
              className={isActive('/') ? "bg-geo-blue hover:bg-geo-darkBlue" : ""}
            >
              <Users className="mr-2 h-4 w-4" />
              Profiles
            </Button>
          </Link>
          
          <Link to="/admin">
            <Button 
              variant={isActive('/admin') ? "default" : "ghost"}
              className={isActive('/admin') ? "bg-geo-blue hover:bg-geo-darkBlue" : ""}
            >
              <Settings className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </Link>
        </nav>
        
        <div className="md:hidden">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <span className="sr-only">Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
