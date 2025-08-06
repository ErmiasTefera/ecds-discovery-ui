'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchComponent from '@/components/Search'
import Filter from '@/components/Filter'
import SearchResultItem from '@/components/SearchResultItem'
import LoadingSkeletonItem from '@/components/LoadingSkeletonItem'
import { ChevronDown, Grid, List, SortAsc, SortDesc } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  authors: string[]
  year: number
  type: 'article' | 'book' | 'thesis'
  journal?: string
  publisher?: string
  description: string
  doi?: string
  url?: string
  tags: string[]
  downloadCount: number
  citationCount: number
}

// Extended mock data for search results
const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Machine Learning Applications in Healthcare: A Comprehensive Review',
    authors: ['Smith, J.', 'Johnson, M.', 'Chen, L.'],
    year: 2023,
    type: 'article',
    journal: 'Journal of Medical AI',
    description: 'This comprehensive review examines the latest developments in machine learning applications within healthcare, covering diagnostic imaging, predictive analytics, and personalized treatment approaches.',
    doi: '10.1234/jmai.2023.001',
    url: 'https://example.com/paper1',
    tags: ['machine learning', 'healthcare', 'AI', 'medical imaging'],
    downloadCount: 1247,
    citationCount: 89
  },
  {
    id: '2',
    title: 'Deep Learning for Computer Vision: Theory and Practice',
    authors: ['Chen, L.', 'Williams, R.'],
    year: 2022,
    type: 'book',
    publisher: 'Academic Press',
    description: 'A comprehensive guide to deep learning techniques in computer vision, covering convolutional neural networks, object detection, and image segmentation with practical implementations.',
    url: 'https://example.com/book1',
    tags: ['deep learning', 'computer vision', 'neural networks', 'CNN'],
    downloadCount: 2341,
    citationCount: 156
  },
  {
    id: '3',
    title: 'Climate Change Impact on Global Food Security: A Multi-Regional Analysis',
    authors: ['Anderson, K.', 'Rodriguez, M.'],
    year: 2023,
    type: 'article',
    journal: 'Environmental Science Today',
    description: 'An extensive analysis of how climate change affects food security across different global regions, with implications for policy and agricultural adaptation strategies.',
    doi: '10.1234/est.2023.045',
    url: 'https://example.com/paper3',
    tags: ['climate change', 'food security', 'agriculture', 'policy'],
    downloadCount: 892,
    citationCount: 67
  },
  {
    id: '4',
    title: 'Quantum Computing Algorithms for Optimization Problems',
    authors: ['Zhang, Y.', 'Brown, A.', 'Davis, P.'],
    year: 2024,
    type: 'thesis',
    description: 'This doctoral thesis explores novel quantum computing algorithms designed to solve complex optimization problems, with applications in logistics and financial modeling.',
    url: 'https://example.com/thesis1',
    tags: ['quantum computing', 'optimization', 'algorithms', 'QAOA'],
    downloadCount: 543,
    citationCount: 23
  },
  {
    id: '5',
    title: 'Artificial Intelligence Ethics in Modern Society',
    authors: ['Wilson, S.', 'Taylor, J.'],
    year: 2023,
    type: 'book',
    publisher: 'Ethics Publications',
    description: 'Exploring the ethical implications of artificial intelligence deployment in society, covering bias, privacy, accountability, and the future of human-AI interaction.',
    url: 'https://example.com/book2',
    tags: ['AI ethics', 'society', 'bias', 'privacy', 'accountability'],
    downloadCount: 1789,
    citationCount: 134
  },
  {
    id: '6',
    title: 'Neural Networks for Natural Language Processing: Recent Advances',
    authors: ['Martinez, C.', 'Lee, H.', 'Patel, R.'],
    year: 2022,
    type: 'article',
    journal: 'Computational Linguistics Review',
    description: 'A survey of recent advances in neural network architectures for natural language processing, including transformers, BERT, and GPT models.',
    doi: '10.1234/clr.2022.078',
    url: 'https://example.com/paper6',
    tags: ['NLP', 'neural networks', 'transformers', 'BERT', 'GPT'],
    downloadCount: 2156,
    citationCount: 198
  }
]

type SortOption = 'relevance' | 'date' | 'citations' | 'downloads'
type SortDirection = 'asc' | 'desc'

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
    if (!query.trim()) return mockSearchResults
    
    const searchTerm = query.toLowerCase()
    return mockSearchResults.filter(result => 
      result.title.toLowerCase().includes(searchTerm) ||
      result.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
      result.description.toLowerCase().includes(searchTerm) ||
      result.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      result.journal?.toLowerCase().includes(searchTerm) ||
      result.publisher?.toLowerCase().includes(searchTerm)
    )
  }, [query])

  // Sort results
  const sortedResults = useMemo(() => {
    const sorted = [...filteredResults].sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'date':
          comparison = a.year - b.year
          break
        case 'citations':
          comparison = a.citationCount - b.citationCount
          break
        case 'downloads':
          comparison = a.downloadCount - b.downloadCount
          break
        case 'relevance':
        default:
          // Simple relevance scoring based on title match
          const aScore = a.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
          const bScore = b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
          comparison = aScore - bScore
          break
      }
      
      return sortDirection === 'asc' ? comparison : -comparison
    })
    
    return sorted
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
                      <SearchResultItem key={result.id} result={result} />
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
