import React from 'react'
import { useAtom } from 'jotai'
import { paginatedResultsAtom, searchLoadingAtom, viewModeAtom } from '@/atoms/searchAtoms'
import SearchResultItem from '@/components/SearchResultItem'
import LoadingSkeletonItem from '@/components/LoadingSkeletonItem'
import { searchQueryAtom } from '@/atoms/searchAtoms'

const SearchResults: React.FC = () => {
  const [viewMode] = useAtom(viewModeAtom)
  const [isLoading] = useAtom(searchLoadingAtom)
  const [results] = useAtom(paginatedResultsAtom)
  const [query] = useAtom(searchQueryAtom)

  return (
    <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}`}>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => <LoadingSkeletonItem key={index} />)
      ) : results.length > 0 ? (
        results.map((result) => (
          <SearchResultItem key={result.id} result={result} currentSearchQuery={query} />
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-2">No results found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  )
}

export default SearchResults


