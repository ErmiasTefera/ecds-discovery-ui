'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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

const LanguageSelector = () => {

const [currentLanguage, setCurrentLanguage] = useState<Language>({ code: 'en', name: 'English', flag: '🇺🇸' })

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  const handleLanguageChange = (language: Language) => {
    setIsLanguageMenuOpen(false)
    setCurrentLanguage(language)
    // TODO: Implement language switching logic
  }

  const handleToggleMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen)
  }

  const handleCloseMenu = () => {
    setIsLanguageMenuOpen(false)
  }

  return (
    <>
      <div className={`relative`}>
        <button
          onClick={handleToggleMenu}
          className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-secondary transition-colors"
          aria-label="Change language"
          aria-expanded={isLanguageMenuOpen}
          aria-haspopup="true"
        >
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

      {/* Overlay for language dropdown */}
      {isLanguageMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={handleCloseMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default LanguageSelector
export type { Language }
