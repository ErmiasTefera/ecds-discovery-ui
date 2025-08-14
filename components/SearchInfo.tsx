import React from 'react'
import { useAtom } from 'jotai'
import {
  searchQueryAtom,
  advancedSearchCriteriaAtom,
  advancedSearchFiltersAtom,
  isAdvancedSearchActiveAtom,
  sortedResultsAtom,
  currentPageAtom,
  resultsPerPageAtom,
  searchLoadingAtom,
} from '@/atoms/searchAtoms'
import SortControls from '@/components/SortControls'
import ActiveFilters from './ActiveFilters'
 

const SearchInfo: React.FC = () => {
  const [query] = useAtom(searchQueryAtom)
  const [advancedCriteria] = useAtom(advancedSearchCriteriaAtom)
  const [advancedFilters] = useAtom(advancedSearchFiltersAtom)
  const [isAdvancedSearchActive] = useAtom(isAdvancedSearchActiveAtom)
  const [sortedResults] = useAtom(sortedResultsAtom)
  const [currentPage] = useAtom(currentPageAtom)
  const [resultsPerPage] = useAtom(resultsPerPageAtom)
  const [isLoading] = useAtom(searchLoadingAtom)

  const totalResults = sortedResults.length
  const startIndex = (currentPage - 1) * resultsPerPage + 1
  const endIndex = Math.min(currentPage * resultsPerPage, totalResults)

  const infoText = isLoading
    ? 'Searching...'
    : totalResults === 0
    ? 'No results found'
    : totalResults <= resultsPerPage
    ? `Showing ${totalResults} of ${totalResults} Results ${query ? ` for “${query}”` : ''}`
    : `Showing ${startIndex}-${endIndex} of ${totalResults} Results ${query ? ` for “${query}”` : ''}`

  // Build applied chips for a more visual summary
  const criteriaChips = advancedCriteria
    .filter(c => c.value.trim().length > 0)
    .map((c, idx) => (
      <span
        key={`crit-${idx}-${c.field}`}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
      >
        <span className="font-medium capitalize">{c.field}:</span> {c.value}
      </span>
    ))

  const filterChips: React.ReactNode[] = []
  if (advancedFilters.format !== 'all') {
    filterChips.push(
      <span key="format" className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
        <span className="font-medium">Format:</span> {advancedFilters.format}
      </span>
    )
  }
  if (advancedFilters.yearFrom || advancedFilters.yearTo) {
    filterChips.push(
      <span key="year" className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
        <span className="font-medium">Year:</span> {advancedFilters.yearFrom || '1900'} - {advancedFilters.yearTo || '2030'}
      </span>
    )
  }

  return (
    <div className="mb-6">
      <div className="">
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">{infoText}</p>
        </div>
      </div>
    </div>
  )
}

export default SearchInfo


