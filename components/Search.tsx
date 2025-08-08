'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search as SearchIcon, X, FileText, Book, GraduationCap, Settings } from 'lucide-react'
import { getSearchSuggestions, type MockResult } from '@/services'
import AdvancedSearchModal from './AdvancedSearchModal'
import { useAtom } from 'jotai'
import { 
  searchQueryAtom, 
  advancedSearchCriteriaAtom, 
  advancedSearchFiltersAtom,
  searchLoadingAtom,
  type SearchCriteria,
  type AdvancedSearchFilters
} from '@/atoms/searchAtoms'

interface SearchProps {
  placeholder?: string
  className?: string
  initialQuery?: string
}



const Search: React.FC<SearchProps> = ({ 
  placeholder = "Search for scholarly articles, books, theses, and more...",
  className = "",
  initialQuery
}) => {
  const [query, setQuery] = useAtom(searchQueryAtom)
  const [isLoading, setIsLoading] = useAtom(searchLoadingAtom)
  const [advancedCriteria, setAdvancedCriteria] = useAtom(advancedSearchCriteriaAtom)
  const [advancedFilters, setAdvancedFilters] = useAtom(advancedSearchFiltersAtom)
  
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Update query when URL parameters change or initialQuery is provided
  useEffect(() => {
    const urlQuery = searchParams?.get('q') || ''
    if (initialQuery !== undefined) {
      setQuery(initialQuery)
    } else if (urlQuery) {
      setQuery(urlQuery)
    }

    // Parse advanced search parameters from URL
    const criteriaParam = searchParams?.get('criteria')
    const filtersParam = searchParams?.get('filters')
    
    if (criteriaParam) {
      try {
        setAdvancedCriteria(JSON.parse(decodeURIComponent(criteriaParam)))
      } catch (e) {
        console.error('Failed to parse criteria from URL:', e)
      }
    }
    
    if (filtersParam) {
      try {
        setAdvancedFilters(JSON.parse(decodeURIComponent(filtersParam)))
      } catch (e) {
        console.error('Failed to parse filters from URL:', e)
      }
    }
  }, [searchParams, initialQuery, setQuery, setAdvancedCriteria, setAdvancedFilters])

    // Filter search suggestions based on query
  const filteredResults = useMemo(() => {
    return getSearchSuggestions(query, 5)
  }, [query])

  // Reset selected index when results change
  React.useEffect(() => {
    setSelectedIndex(-1)
  }, [filteredResults])

  const getTypeIcon = (type: 'article' | 'book' | 'thesis') => {
    switch (type) {
      case 'article':
        return <FileText className="w-4 h-4 text-primary" />
      case 'book':
        return <Book className="w-4 h-4 text-primary" />
      case 'thesis':
        return <GraduationCap className="w-4 h-4 text-primary" />
      default:
        return <FileText className="w-4 h-4 text-primary" />
    }
  }

  const handleSuggestionClick = (suggestion: MockResult) => {
    setQuery(suggestion.title)
    setSelectedIndex(-1)
    handleSearch(suggestion.title)
  }

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    
    // Reset advanced search filters - don't add keyword criteria for basic search
    // setAdvancedCriteria([])
    setAdvancedFilters({
      yearFrom: '',
      yearTo: '',
      format: 'all',
      language: 'all'
    })
    
    // Navigate to search page with query parameter
    const searchParams = new URLSearchParams()
    searchParams.set('q', searchQuery.trim())
    router.push(`/search?${searchParams.toString()}`)
    
    setIsLoading(false)
  }, [router, setIsLoading, setAdvancedCriteria, setAdvancedFilters])

  const handleAdvancedSearch = useCallback((criteria: SearchCriteria[], filters: AdvancedSearchFilters) => {
    setIsLoading(true)
    
    // Navigate to search page with advanced search parameters
    const searchParams = new URLSearchParams()
    
    // Add basic query if available
    if (query.trim()) {
      searchParams.set('q', query.trim())
    }
    
    // Add advanced search parameters
    if (criteria.length > 0) {
      searchParams.set('criteria', encodeURIComponent(JSON.stringify(criteria)))
    }
    
    if (filters) {
      searchParams.set('filters', encodeURIComponent(JSON.stringify(filters)))
    }
    
    router.push(`/search?${searchParams.toString()}`)
    setIsLoading(false)
  }, [router, query, setIsLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredResults.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSearch(query)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < filteredResults.length - 1 ? prev + 1 : prev
        )
        break
      
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1)
        break
      
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < filteredResults.length) {
          // Select the highlighted suggestion
          const selectedResult = filteredResults[selectedIndex]
          handleSuggestionClick(selectedResult)
        } else {
          // No suggestion selected, search with current query
          handleSearch(query)
        }
        break
      
      case 'Escape':
        e.preventDefault()
        setSelectedIndex(-1)
        setIsFocused(false)
        // Remove focus from the input
        if (inputRef.current) {
          inputRef.current.blur()
        }
        break
    }
  }

  const clearSearch = () => {
    setQuery('')
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    // Delay hiding suggestions to allow for click events on suggestions
    setTimeout(() => {
      setIsFocused(false)
      setSelectedIndex(-1)
    }, 150)
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
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
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

        {/* Search Suggestions with Mock Results */}
        {query && isFocused && filteredResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-2">
              <div className="space-y-1">
                {filteredResults.map((result, index) => (
                  <div
                    key={result.id}
                    onClick={() => handleSuggestionClick(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-3 rounded cursor-pointer text-left transition-colors ${
                      index === selectedIndex 
                        ? 'bg-secondary' 
                        : 'hover:bg-secondary'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {result.title}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground text-left px-3">
                  Use ↑↓ arrows to navigate • Press Enter to select • Escape to close
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {query && isFocused && filteredResults.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50">
            <div className="p-4">
              <div className="text-sm text-muted-foreground text-left">
                No matching results found. Press Enter to search all databases.
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Advanced Search Link */}
      <div className="mt-2 flex justify-end">
        <button
          onClick={() => setIsAdvancedSearchOpen(true)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Advanced Search
        </button>
      </div>

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

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        isOpen={isAdvancedSearchOpen}
        onClose={() => setIsAdvancedSearchOpen(false)}
        onSearch={handleAdvancedSearch}
        initialCriteria={advancedCriteria}
        initialFilters={advancedFilters}
        mainSearchQuery={query}
      />
    </div>
  )
}

export default Search
