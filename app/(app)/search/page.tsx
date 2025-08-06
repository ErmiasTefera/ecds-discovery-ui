'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchComponent from '@/components/Search'
import Filter from '@/components/Filter'
import SearchResultItem from '@/components/SearchResultItem'
import LoadingSkeletonItem from '@/components/LoadingSkeletonItem'
import { ChevronDown, Grid, List, SortAsc, SortDesc } from 'lucide-react'
import { searchResources, sortSearchResults, type SortOption, type SortDirection } from '@/services'



export default function SearchPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage] = useState(10)

  const query = searchParams?.get('q') || ''

    // Filter results based on search query
  const filteredResults = useMemo(() => {
    return searchResources(query)
  }, [query])

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
    if (query) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 800)
      return () => clearTimeout(timer)
    }
  }, [query])

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

        {query && (
          <>
            {/* Search Info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Search Results for "{query}"
              </h1>
              <p className="text-muted-foreground">
                {isLoading ? 'Searching...' : `Found ${sortedResults.length} results`}
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
                      <div className="flex gap-1">
                        {(['relevance', 'date', 'citations', 'downloads'] as SortOption[]).map((option) => (
                          <button
                            key={option}
                            onClick={() => handleSortChange(option)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center gap-1 ${
                              sortBy === option
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-secondary'
                            }`}
                          >
                            {option}
                            {sortBy === option && (
                              sortDirection === 'asc' ? 
                                <SortAsc className="w-3 h-3" /> : 
                                <SortDesc className="w-3 h-3" />
                            )}
                          </button>
                        ))}
                      </div>
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
