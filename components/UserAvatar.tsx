'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useAtom } from 'jotai'
import { ChevronDown, LogOut, User, Settings } from 'lucide-react'
import { userAtom, logoutAtom } from '@/atoms/authAtoms'

const UserAvatar: React.FC = () => {
  const [user] = useAtom(userAtom)
  const [, logout] = useAtom(logoutAtom)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
        aria-label="User menu"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-border"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-border">
              <span className="text-xs font-medium text-primary-foreground">
                {getInitials(user.name)}
              </span>
            </div>
          )}
        </div>

        {/* User Info - Hidden on mobile */}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-foreground truncate max-w-24">
            {user.name}
          </p>
          <p className="text-xs text-muted-foreground truncate max-w-24">
            {user.email}
          </p>
        </div>

        {/* Dropdown Arrow */}
        <ChevronDown 
          className={`w-4 h-4 text-muted-foreground transition-transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-50">
          <div className="py-2" role="menu">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                role="menuitem"
              >
                <User className="w-4 h-4 mr-3 text-muted-foreground" />
                Profile
              </button>
              
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                role="menuitem"
              >
                <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
                Settings
              </button>
            </div>

            {/* Logout */}
            <div className="border-t border-border pt-1">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                role="menuitem"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserAvatar
