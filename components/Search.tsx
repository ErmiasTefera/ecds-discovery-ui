'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search as SearchIcon, X } from 'lucide-react'

interface SearchProps {
  placeholder?: string
  className?: string
}

const Search: React.FC<SearchProps> = ({ 
  placeholder = "Search for scholarly articles, books, theses, and more...",
  className = ""
}) => {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    
    // Navigate to search page with query parameter
    const searchParams = new URLSearchParams()
    searchParams.set('q', searchQuery.trim())
    router.push(`/search?${searchParams.toString()}`)
    
    setIsLoading(false)
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch(query)
    }
  }

  const clearSearch = () => {
    setQuery('')
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <div className="absolute left-4 z-10">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-4 text-lg bg-background border-2 border-border rounded-xl 
                     focus:border-primary focus:outline-none focus:ring-0 transition-colors
                     placeholder:text-muted-foreground"
            disabled={isLoading}
            aria-label="Search scholarly resources"
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-16 p-1 hover:bg-secondary rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg
                     hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors font-medium"
            aria-label="Submit search"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              'Search'
            )}
          </button>
        </div>

        {/* Search Suggestions Placeholder */}
        {query && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-4">
              <div className="text-sm text-muted-foreground mb-2">Suggestions</div>
              <div className="space-y-2">
                <div className="p-2 hover:bg-secondary rounded cursor-pointer text-sm">
                  {query} in computer science
                </div>
                <div className="p-2 hover:bg-secondary rounded cursor-pointer text-sm">
                  {query} research papers
                </div>
                <div className="p-2 hover:bg-secondary rounded cursor-pointer text-sm">
                  {query} academic articles
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  Press Enter to search • Use quotes for exact phrases
                </div>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Quick Search Tips */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-muted-foreground">Try:</span>
        {['machine learning', 'climate change', 'quantum computing', 'artificial intelligence'].map((term) => (
          <button
            key={term}
            onClick={() => setQuery(term)}
            className="px-3 py-1 bg-secondary/50 hover:bg-secondary text-sm text-foreground rounded-full transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Search
