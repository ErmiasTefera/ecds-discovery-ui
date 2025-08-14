'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import UserAvatar from '@/components/UserAvatar'
import AuthButtons from '@/components/AuthButtons'
import LanguageSelector from '@/components/LanguageSelector'
import { HomeButton } from '@/components/HomeButton'

const TopNavigation: React.FC = () => {
  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <HomeButton />

          {/* Controls */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex">
              {/* Language Selector */}
              <LanguageSelector />

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Authentication */}
            <UserAvatar />
            <AuthButtons />
          </div>
        </div>

        {/* Mobile Navigation Menu (Hidden by default) */}
        <div className="sm:hidden border-t border-border">
          <div className="flex items-center justify-end space-x-3">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNavigation