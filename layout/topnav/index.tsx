'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Globe, Search } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import UserAvatar from '@/components/UserAvatar'
import AuthButtons from '@/components/AuthButtons'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
]

const TopNavigation: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    setIsLanguageMenuOpen(false)
    // TODO: Implement language switching logic
  }

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
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">Discovery UI</h1>
                <p className="text-xs text-muted-foreground -mt-1">Scholarly Resources</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/search" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Search
            </Link>
            <Link 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Help
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                aria-label="Change language"
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup="true"
              >
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
                </span>
                <ChevronDown 
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    isLanguageMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Language Dropdown */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-50">
                  <div className="py-1" role="menu">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language)}
                        className={`flex items-center space-x-3 w-full px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                          currentLanguage.code === language.code 
                            ? 'bg-secondary text-primary font-medium' 
                            : 'text-foreground'
                        }`}
                        role="menuitem"
                      >
                        <span className="text-base">{language.flag}</span>
                        <span>{language.name}</span>
                        {currentLanguage.code === language.code && (
                          <span className="ml-auto text-primary">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Authentication */}
            <UserAvatar />
            <AuthButtons />

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden ml-3 p-2 rounded-md hover:bg-secondary transition-colors"
              aria-label="Open menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-foreground"></div>
                <div className="w-full h-0.5 bg-foreground"></div>
                <div className="w-full h-0.5 bg-foreground"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu (Hidden by default) */}
        <div className="md:hidden border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/search" 
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Search
            </Link>
            <Link 
              href="#" 
              className="block px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary rounded-md transition-colors"
            >
              About
            </Link>
            <Link 
              href="#" 
              className="block px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Help
            </Link>
            
            {/* Mobile Authentication */}
            <div className="border-t border-border pt-2 mt-2">
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for language dropdown */}
      {isLanguageMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsLanguageMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}

export default TopNavigation