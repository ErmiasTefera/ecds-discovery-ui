'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search as SearchIcon } from 'lucide-react'
import { getSearchSuggestions, type MockResult } from '@/services'
import AdvancedSearchModal from './AdvancedSearchModal'
import SearchSuggestions from '@/components/SearchSuggestions'
import NoResultsMessage from '@/components/NoResultsMessage'
import AdvancedSearchTrigger from '@/components/AdvancedSearchTrigger'
import QuickSearchTips from '@/components/QuickSearchTips'
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
  placeholder = "Search",
  className = "",
  initialQuery
}) => {
  const [query, setQuery] = useAtom(searchQueryAtom)
  const [isLoading, setIsLoading] = useAtom(searchLoadingAtom)
  const [, setAdvancedCriteria] = useAtom(advancedSearchCriteriaAtom)
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
  const [filteredResults, setFilteredResults] = useState<MockResult[]>([])

  // Fetch search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setFilteredResults([])
        return
      }

      try {
        const suggestions = await getSearchSuggestions(query, 5)
        setFilteredResults(suggestions)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setFilteredResults([])
      }
    }

    // Debounce the search suggestions
    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  // Reset selected index when results change
  React.useEffect(() => {
    setSelectedIndex(-1)
  }, [filteredResults])

  

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
  }, [router, setIsLoading, setAdvancedFilters])

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
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center border-1 border-primary rounded-lg">

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
            className="input input-lg w-full pl-4 pr-12 rounded-xl input-bordered input-warning 
                     shadow-lg focus:shadow-xl focus:outline-none focus:ring-0 transition-all"
            disabled={isLoading}
            aria-label="Search scholarly resources"
          />

          {/* Search Button */}
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="btn btn-ghost btn-square btn-sm absolute right-2 disabled:cursor-not-allowed text-primary"
            aria-label="Submit search"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <SearchIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Search Suggestions with Mock Results */}
        {query && isFocused && filteredResults.length > 0 && (
          <SearchSuggestions
            results={filteredResults}
            selectedIndex={selectedIndex}
            onItemHover={(index) => setSelectedIndex(index)}
            onItemClick={handleSuggestionClick}
          />
        )}

        {/* No Results Message */}
        {query && isFocused && filteredResults.length === 0 && (
          <NoResultsMessage />
        )}
      </form>

      {/* Advanced Search Link */}
      <AdvancedSearchTrigger onOpen={() => setIsAdvancedSearchOpen(true)} />

      {/* Quick Search Tips */}
      <QuickSearchTips onSelect={(term) => setQuery(term)} />

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        isOpen={isAdvancedSearchOpen}
        onClose={() => setIsAdvancedSearchOpen(false)}
        onSearch={handleAdvancedSearch}
        initialFilters={advancedFilters}
        mainSearchQuery={query}
      />
    </div>
  )
}

export default Search
