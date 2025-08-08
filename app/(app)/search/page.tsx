'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchComponent from '@/components/Search'
import Filter from '@/components/Filter'
import SearchResultItem from '@/components/SearchResultItem'
import LoadingSkeletonItem from '@/components/LoadingSkeletonItem'
import { Grid, List, SortAsc, SortDesc } from 'lucide-react'
import { searchResources, sortSearchResults, type SortOption, type SortDirection } from '@/services'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAtom } from 'jotai'
import { 
  searchQueryAtom,
  advancedSearchCriteriaAtom, 
  advancedSearchFiltersAtom,
  isAdvancedSearchActiveAtom,
  type SearchCriteria,
  type AdvancedSearchFilters
} from '@/atoms/searchAtoms'



export default function SearchPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage] = useState(2)
  const [hasSearched, setHasSearched] = useState(false)
  
  const [query, setQuery] = useAtom(searchQueryAtom)
  const [advancedCriteria, setAdvancedCriteria] = useAtom(advancedSearchCriteriaAtom)
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

  // Filter results based on search query and advanced criteria
  const filteredResults = useMemo(() => {
    let results = searchResources(query)
    
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
    
    return results
  }, [query, advancedFilters])

    // Sort results
  const sortedResults = useMemo(() => {
    return sortSearchResults(filteredResults, sortBy, sortDirection, query)
  }, [filteredResults, sortBy, sortDirection, query])

  // Paginate results
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage
    const endIndex = startIndex + resultsPerPage
    return sortedResults.slice(startIndex, endIndex)
  }, [sortedResults, currentPage, resultsPerPage])

  const totalPages = Math.ceil(sortedResults.length / resultsPerPage)

  // Simulate loading when search changes
  useEffect(() => {
    if (hasSearched && (query || isAdvancedSearchActive)) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 800)
      return () => clearTimeout(timer)
    }
  }, [hasSearched, query, isAdvancedSearchActive])

  const handleSortChange = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortDirection('desc')
    }
    setCurrentPage(1)
  }

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
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Search Results for &quot;{query}&quot;
              </h1>
              {isAdvancedSearchActive && (
                <div className="mb-2 p-3 bg-secondary/20 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-1">Advanced Search Applied:</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    {advancedCriteria.length > 0 && (
                      <div>
                        <span className="font-medium">Criteria:</span> {advancedCriteria.map(c => `${c.field}: "${c.value}"`).join(' AND ')}
                      </div>
                    )}
                    {advancedFilters.format !== 'all' && (
                      <div>
                        <span className="font-medium">Format:</span> {advancedFilters.format}
                      </div>
                    )}
                    {(advancedFilters.yearFrom || advancedFilters.yearTo) && (
                      <div>
                        <span className="font-medium">Year:</span> {advancedFilters.yearFrom || '1900'} - {advancedFilters.yearTo || '2030'}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <p className="text-muted-foreground">
                {isLoading ? 'Searching...' : (() => {
                  const totalResults = sortedResults.length
                  const startIndex = (currentPage - 1) * resultsPerPage + 1
                  const endIndex = Math.min(currentPage * resultsPerPage, totalResults)
                  
                  if (totalResults === 0) {
                    return 'No results found'
                  } else if (totalResults <= resultsPerPage) {
                    return `Showing ${totalResults} of ${totalResults} Results`
                  } else {
                    return `Showing ${startIndex}-${endIndex} of ${totalResults} Results`
                  }
                })()}
              </p>
            </div>

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
                    {/* Sort Options */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">Sort by:</span>
                      <Select value={sortBy} onValueChange={(value) => handleSortChange(value as SortOption)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select sort option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="citations">Citations</SelectItem>
                          <SelectItem value="downloads">Downloads</SelectItem>
                        </SelectContent>
                      </Select>
                      <button
                        onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                        className="p-2 hover:bg-secondary rounded-md transition-colors"
                        title={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
                      >
                        {sortDirection === 'asc' ? 
                          <SortAsc className="w-4 h-4" /> : 
                          <SortDesc className="w-4 h-4" />
                        }
                      </button>
                    </div>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">View:</span>
                    <div className="flex border border-border rounded-md">
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-l-md transition-colors ${
                          viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-r-md transition-colors ${
                          viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}`}>
                  {isLoading ? (
                    // Loading Skeletons
                    Array.from({ length: 5 }).map((_, index) => (
                      <LoadingSkeletonItem key={index} />
                    ))
                                                ) : paginatedResults.length > 0 ? (
                                // Search Results
                                paginatedResults.map((result) => (
                                  <SearchResultItem key={result.id} result={result} currentSearchQuery={query} />
                                ))
                  ) : (
                    // No Results
                    <div className="text-center py-12">
                      <p className="text-lg text-muted-foreground mb-2">No results found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search terms or filters
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {!isLoading && paginatedResults.length > 0 && totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-border rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 border rounded-md transition-colors ${
                          currentPage === page
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:bg-secondary'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-border rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
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
