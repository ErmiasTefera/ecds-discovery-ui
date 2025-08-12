import { atom } from 'jotai'
import { sortSearchResults, type SortOption, type SortDirection } from '@/services'
import type { SearchResult } from '@/models'

export interface SearchCriteria {
  field: string
  value: string
  operator: string
}

export interface AdvancedSearchFilters {
  yearFrom: string
  yearTo: string
  format: string
  language: string
}

// Basic search query atom
export const searchQueryAtom = atom<string>('')

// Advanced search criteria atom
export const advancedSearchCriteriaAtom = atom<SearchCriteria[]>([])

// Advanced search filters atom
export const advancedSearchFiltersAtom = atom<AdvancedSearchFilters>({
  yearFrom: '',
  yearTo: '',
  format: 'all',
  language: 'all'
})

// Loading state atom
export const searchLoadingAtom = atom<boolean>(false)

// Search results atom (if needed for caching)
export const searchResultsAtom = atom<SearchResult[]>([])

// Combined search state atom for easy access
export const searchStateAtom = atom(
  (get) => ({
    query: get(searchQueryAtom),
    criteria: get(advancedSearchCriteriaAtom),
    filters: get(advancedSearchFiltersAtom),
    loading: get(searchLoadingAtom),
    results: get(searchResultsAtom)
  }),
  (get, set, newState: {
    query?: string
    criteria?: SearchCriteria[]
    filters?: AdvancedSearchFilters
    loading?: boolean
    results?: any[]
  }) => {
    if (newState.query !== undefined) set(searchQueryAtom, newState.query)
    if (newState.criteria !== undefined) set(advancedSearchCriteriaAtom, newState.criteria)
    if (newState.filters !== undefined) set(advancedSearchFiltersAtom, newState.filters)
    if (newState.loading !== undefined) set(searchLoadingAtom, newState.loading)
    if (newState.results !== undefined) set(searchResultsAtom, newState.results)
  }
)

// Derived atom to check if advanced search is active
export const isAdvancedSearchActiveAtom = atom((get) => {
  const criteria = get(advancedSearchCriteriaAtom)
  const filters = get(advancedSearchFiltersAtom)
  const query = get(searchQueryAtom)
  
  // Check if there are non-keyword criteria
  const hasNonKeywordCriteria = criteria.some(criteria => 
    criteria.field !== 'keyword' || criteria.value !== query
  )
  
  // Check if there are filters applied
  const hasFilters = filters.format !== 'all' || filters.yearFrom || filters.yearTo
  
  return hasNonKeywordCriteria || hasFilters
})

// Helper function to ensure minimum 3 criteria rows
export const ensureMinimumCriteria = (criteria: SearchCriteria[]): SearchCriteria[] => {
  const defaultFields = ['keyword', 'title', 'author']
  const minRows = 3
  
  let result = [...criteria]
  
  // Ensure we have at least 3 rows
  while (result.length < minRows) {
    result.push({
      field: defaultFields[result.length] || 'keyword',
      value: '',
      operator: 'AND'
    })
  }
  
  // Sort criteria: non-empty values first, then empty ones
  result.sort((a, b) => {
    const aHasValue = a.value.trim().length > 0
    const bHasValue = b.value.trim().length > 0
    
    if (aHasValue && !bHasValue) return -1
    if (!aHasValue && bHasValue) return 1
    return 0
  })
  
  return result
}

// Atom to reset all search state
export const resetSearchStateAtom = atom(
  null,
  (get, set) => {
    set(searchQueryAtom, '')
    set(advancedSearchCriteriaAtom, [])
    set(advancedSearchFiltersAtom, {
      yearFrom: '',
      yearTo: '',
      format: 'all',
      language: 'all'
    })
    set(searchLoadingAtom, false)
    set(searchResultsAtom, [])
  }
)

// Sorting state
export const sortByAtom = atom<SortOption>('relevance')
export const sortDirectionAtom = atom<SortDirection>('desc')

// View mode state
export const viewModeAtom = atom<'list' | 'grid'>('list')

// Pagination state
export const currentPageAtom = atom<number>(1)
export const resultsPerPageAtom = atom<number>(2)

// Derived: sorted results
export const sortedResultsAtom = atom((get) => {
  const results = get(searchResultsAtom)
  const sortBy = get(sortByAtom)
  const sortDirection = get(sortDirectionAtom)
  const query = get(searchQueryAtom)
  return sortSearchResults(results, sortBy, sortDirection, query)
})

// Derived: total pages
export const totalPagesAtom = atom((get) => {
  const sorted = get(sortedResultsAtom)
  const perPage = get(resultsPerPageAtom)
  return Math.max(1, Math.ceil(sorted.length / perPage))
})

// Derived: paginated results
export const paginatedResultsAtom = atom((get) => {
  const sorted = get(sortedResultsAtom)
  const page = get(currentPageAtom)
  const perPage = get(resultsPerPageAtom)
  const start = (page - 1) * perPage
  const end = start + perPage
  return sorted.slice(start, end)
})
