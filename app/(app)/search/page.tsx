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
  searchLoadingAtom,
  searchResultsAtom,
} from '@/atoms/searchAtoms'
import SearchInfo from '@/components/SearchInfo'
import SortControls from '@/components/SortControls'
import ViewModeToggle from '@/components/ViewModeToggle'
import SearchResults from '@/components/SearchResults'
import Pagination from '@/components/Pagination'
import ActiveFilters from '@/components/ActiveFilters'
// import FilterDialog from '@/components/FilterDialog'
import { resetDraftFiltersAtom, selectedFiltersAtom, draftSelectedFiltersAtom } from '@/atoms/filterAtoms'



export default function SearchPage() {
  const searchParams = useSearchParams()
  const [, setIsLoading] = useAtom(searchLoadingAtom)
  const [hasSearched, setHasSearched] = useState(false)
  const [committedQuery, setCommittedQuery] = useState('')
  const [hasUrlAdvanced, setHasUrlAdvanced] = useState(false)
  
  const [query, setQuery] = useAtom(searchQueryAtom)
  const [, setAdvancedCriteria] = useAtom(advancedSearchCriteriaAtom)
  const [advancedFilters, setAdvancedFilters] = useAtom(advancedSearchFiltersAtom)

  // Parse advanced search parameters from URL and sync with atoms
  const [, setSelectedFiltersFromUrl] = useAtom(selectedFiltersAtom)
  const [, setDraftSelectedFiltersFromUrl] = useAtom(draftSelectedFiltersAtom)
  useEffect(() => {
    const urlQuery = searchParams?.get('q') || ''
    setQuery(urlQuery)
    setCommittedQuery(urlQuery)
    
    const criteriaParam = searchParams?.get('criteria')
    const filtersParam = searchParams?.get('filters')
    const facetsParam = searchParams?.get('facets')
    const advancedPresent = Boolean(criteriaParam || filtersParam || facetsParam)
    setHasUrlAdvanced(advancedPresent)
    
    // Set hasSearched to true if there's a query parameter or advanced search parameters
    if (urlQuery || advancedPresent) {
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
    // facets param -> hydrate selected filters atoms
    if (facetsParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(facetsParam)) as Record<string, string[]>
        setSelectedFiltersFromUrl(parsed)
        setDraftSelectedFiltersFromUrl(parsed)
      } catch (e) {
        console.error('Failed to parse facets from URL:', e)
        setSelectedFiltersFromUrl({})
        setDraftSelectedFiltersFromUrl({})
      }
    } else {
      setSelectedFiltersFromUrl({})
      setDraftSelectedFiltersFromUrl({})
    }
  }, [searchParams, setQuery, setAdvancedCriteria, setAdvancedFilters, setSelectedFiltersFromUrl, setDraftSelectedFiltersFromUrl])

  // State for search results
  const [, setSearchResults] = useAtom(searchResultsAtom)
  const [resultsLoading, setResultsLoading] = useState(false)
  const [, resetDraftFilters] = useAtom(resetDraftFiltersAtom)

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      if (!hasSearched || (!committedQuery && !hasUrlAdvanced)) {
        setSearchResults([])
        return
      }

      setResultsLoading(true)
      try {
        let results = await searchResources(committedQuery)
        
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
  }, [committedQuery, advancedFilters, hasSearched, hasUrlAdvanced, setSearchResults])

  // Update loading state based on results loading
  useEffect(() => {
    setIsLoading(resultsLoading)
  }, [resultsLoading, setIsLoading])

  // On unmount/navigate away, discard any un-applied draft filters
  useEffect(() => {
    return () => {
      resetDraftFilters()
    }
  }, [resetDraftFilters])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <SearchComponent initialQuery={query} />
        </div>

        {hasSearched && (committedQuery || hasUrlAdvanced) && (
          <>
            {/* Search Info */}
            <SearchInfo />

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar (hidden on lg and below) */}
              <div className="lg:w-64 flex-shrink-0 hidden lg:block">
                <Filter />
              </div>

              {/* Main Content */}
              <div className="flex-1">
              {/* <ActiveFilters /> */}

                <div className="flex w-full justify-end items-center gap-4 mb-6 mt-3">
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
