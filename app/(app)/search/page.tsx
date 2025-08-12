'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchComponent from '@/components/Search'
import Filter from '@/components/Filter'
import { searchResources } from '@/services'
import { useAtom } from 'jotai'
import { 
  searchQueryAtom,
  advancedSearchCriteriaAtom, 
  advancedSearchFiltersAtom,
  isAdvancedSearchActiveAtom,
  searchLoadingAtom,
  searchResultsAtom,
} from '@/atoms/searchAtoms'
import SearchInfo from '@/components/SearchInfo'
import SortControls from '@/components/SortControls'
import ViewModeToggle from '@/components/ViewModeToggle'
import SearchResults from '@/components/SearchResults'
import Pagination from '@/components/Pagination'



export default function SearchPage() {
  const searchParams = useSearchParams()
  const [, setIsLoading] = useAtom(searchLoadingAtom)
  const [hasSearched, setHasSearched] = useState(false)
  
  const [query, setQuery] = useAtom(searchQueryAtom)
  const [, setAdvancedCriteria] = useAtom(advancedSearchCriteriaAtom)
  const [advancedFilters, setAdvancedFilters] = useAtom(advancedSearchFiltersAtom)
  const [isAdvancedSearchActive] = useAtom(isAdvancedSearchActiveAtom)

  // Parse advanced search parameters from URL and sync with atoms
  useEffect(() => {
    const urlQuery = searchParams?.get('q') || ''
    setQuery(urlQuery)
    
    const criteriaParam = searchParams?.get('criteria')
    const filtersParam = searchParams?.get('filters')
    
    // Set hasSearched to true if there's a query parameter or advanced search parameters
    if (urlQuery || criteriaParam || filtersParam) {
      setHasSearched(true)
    }
    
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
  }, [searchParams, setQuery, setAdvancedCriteria, setAdvancedFilters])

  // State for search results
  const [, setSearchResults] = useAtom(searchResultsAtom)
  const [resultsLoading, setResultsLoading] = useState(false)

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      if (!hasSearched || (!query && !isAdvancedSearchActive)) {
        setSearchResults([])
        return
      }

      setResultsLoading(true)
      try {
        let results = await searchResources(query)
        
        // Apply advanced search filters if present
        if (advancedFilters.format !== 'all') {
          results = results.filter(result => result.type === advancedFilters.format)
        }
        
        // Note: Language filtering would need to be implemented based on actual data structure
        // For now, we'll skip language filtering as it's not in the SearchResult model
        if (advancedFilters.yearFrom || advancedFilters.yearTo) {
          results = results.filter(result => {
            const year = result.year
            const fromYear = advancedFilters.yearFrom ? parseInt(advancedFilters.yearFrom) : 1900
            const toYear = advancedFilters.yearTo ? parseInt(advancedFilters.yearTo) : 2030
            return year >= fromYear && year <= toYear
          })
        }
        
        setSearchResults(results)
      } catch (error) {
        console.error('Error fetching search results:', error)
        setSearchResults([])
      } finally {
        setResultsLoading(false)
      }
    }

    fetchResults()
  }, [query, advancedFilters, hasSearched, isAdvancedSearchActive, setSearchResults])

  // Update loading state based on results loading
  useEffect(() => {
    setIsLoading(resultsLoading)
  }, [resultsLoading, setIsLoading])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <SearchComponent initialQuery={query} />
        </div>

        {hasSearched && (query || isAdvancedSearchActive) && (
          <>
            {/* Search Info */}
            <SearchInfo />

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-64 flex-shrink-0">
                <Filter />
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-secondary/20 rounded-lg">
                  <div className="flex items-center gap-4">
                    <SortControls />
                  </div>
                  <ViewModeToggle />
                </div>

                <SearchResults />

                <Pagination />
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {!query && (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">Start Your Search</h2>
            <p className="text-muted-foreground">
              Enter a search term above to find scholarly resources
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
