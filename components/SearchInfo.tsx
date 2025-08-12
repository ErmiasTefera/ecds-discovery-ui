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
    ? `Showing ${totalResults} of ${totalResults} Results`
    : `Showing ${startIndex}-${endIndex} of ${totalResults} Results`

  return (
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
      <p className="text-muted-foreground">{infoText}</p>
    </div>
  )
}

export default SearchInfo


