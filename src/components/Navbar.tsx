
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Users, Map, Settings, Mail } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-[#121212] to-[#1e1e1e] dark:bg-gradient-to-r dark:from-[#121212] dark:to-[#1e1e1e] border-gray-800 shadow-md backdrop-blur-sm transition-all duration-200">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <NavLink to="/" className="flex items-center space-x-2">
            <Map className="h-6 w-6 text-[#1ABC9C]" />
            <span className="inline-block font-bold text-[#E0E0E0] bg-gradient-to-r from-[#1ABC9C] to-blue-400 bg-clip-text text-transparent">Geo Profile Hub</span>
          </NavLink>
          <nav className="flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hidden md:flex items-center text-sm font-medium transition-colors hover:text-[#1ABC9C] ${
                  isActive ? "text-[#1ABC9C]" : "text-[#E0E0E0]"
                }`
              }
            >
              <Users className="mr-1 h-4 w-4" />
              <span>Profiles</span>
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `hidden md:flex items-center text-sm font-medium transition-colors hover:text-[#1ABC9C] ${
                  isActive ? "text-[#1ABC9C]" : "text-[#E0E0E0]"
                }`
              }
            >
              <Settings className="mr-1 h-4 w-4" />
              <span>Admin</span>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hidden md:flex items-center text-sm font-medium transition-colors hover:text-[#1ABC9C] ${
                  isActive ? "text-[#1ABC9C]" : "text-[#E0E0E0]"
                }`
              }
            >
              <Mail className="mr-1 h-4 w-4" />
              <span>Contact</span>
            </NavLink>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              className="text-[#E0E0E0] hover:text-[#1ABC9C] hover:bg-[#2a2a2a]"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
