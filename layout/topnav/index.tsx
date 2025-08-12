'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import UserAvatar from '@/components/UserAvatar'
import AuthButtons from '@/components/AuthButtons'
import LanguageSelector from '@/components/LanguageSelector'

const TopNavigation: React.FC = () => {
  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              aria-label="Discovery UI Home"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Search className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="block">
                <h1 className="text-xl font-bold text-foreground">
                  Discovery UI
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">
                  Scholarly Resources
                </p>
              </div>
            </Link>
          </div>

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