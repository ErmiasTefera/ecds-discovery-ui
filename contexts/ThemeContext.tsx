'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Return a default theme instead of throwing an error
    console.warn('useTheme called outside of ThemeProvider, using default values')
    return {
      theme: 'light' as const,
      toggleTheme: () => {
        console.warn('toggleTheme called outside of ThemeProvider')
      },
      setTheme: () => {
        console.warn('setTheme called outside of ThemeProvider')
      }
    }
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true)
    
    // Check if there's a saved theme in localStorage
    const savedTheme = localStorage.getItem('discovery-ui-theme') as Theme
    if (savedTheme) {
      setThemeState(savedTheme)
      return
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark')
    } else {
      setThemeState('light')
    }
  }, [])

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    
    localStorage.setItem('discovery-ui-theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{
        theme: 'light',
        toggleTheme: () => {},
        setTheme: () => {}
      }}>
        <div className="min-h-screen bg-background">{children}</div>
      </ThemeContext.Provider>
    )
  }

  const value = {
    theme,
    toggleTheme,
    setTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}