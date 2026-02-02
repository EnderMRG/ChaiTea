'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { LogOut, Settings, User } from 'lucide-react';

interface ProfileDropdownProps {
  onSettingsClick: () => void;
}

export default function ProfileDropdown({ onSettingsClick }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userProfile = {
    name: 'Rajesh Kumar',
    email: 'rajesh@chai-net.com',
    avatar: 'RK',
    farmName: 'Kumar Tea Estate',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect
    window.location.href = '/login';
  };

  const handleSettings = () => {
    onSettingsClick();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold text-sm cursor-pointer hover:shadow-lg"
        title={userProfile.name}
      >
        {userProfile.avatar}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info Section */}
          <div className="p-4 border-b border-border">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm flex-shrink-0">
                {userProfile.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground truncate">{userProfile.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{userProfile.email}</p>
                <p className="text-xs text-muted-foreground mt-1">{userProfile.farmName}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Settings */}
            <button
              onClick={handleSettings}
              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-3"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span>Account Settings</span>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Logout */}
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded flex items-center gap-3 font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
