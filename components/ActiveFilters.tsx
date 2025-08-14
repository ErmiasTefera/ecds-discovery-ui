import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'
import { useAtom } from 'jotai'
import {
  selectedFiltersAtom,
  filtersAtom,
  clearCommittedFiltersAtom,
  totalSelectedCountAtom,
  totalDraftSelectedCountAtom,
  commitDraftFiltersAtom,
  removeCommittedFilterAtom,
  draftSelectedFiltersAtom,
} from '@/atoms/filterAtoms'
import { Button } from '@/components/ui/button'

interface ActiveFiltersProps {
  onApplied?: () => void
  onCleared?: () => void
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ onApplied, onCleared }) => {
  const [selectedFilters] = useAtom(selectedFiltersAtom)
  const [filters] = useAtom(filtersAtom)
  const [totalSelected] = useAtom(totalSelectedCountAtom)
  const [, clearCommitted] = useAtom(clearCommittedFiltersAtom)
  // const [, removeFilter] = useAtom(removeFilterAtom)
  const [, removeCommittedFilter] = useAtom(removeCommittedFilterAtom)
  const [totalDraftSelected] = useAtom(totalDraftSelectedCountAtom)
  const [, commitDraft] = useAtom(commitDraftFiltersAtom)
  const [draftSelected] = useAtom(draftSelectedFiltersAtom)
  const searchParams = useSearchParams()
  const router = useRouter()

  const renderSelectedChips = (): React.ReactNode[] => {
    const chips: React.ReactNode[] = []
    Object.entries(selectedFilters).forEach(([groupId, filterIds]) => {
      filterIds.forEach((filterId) => {
        const group = filters.find((g) => g.id === groupId)
        const option = group?.options.find((o) => o.id === filterId)
        if (!option) return
        chips.push(
          <span
            key={`${groupId}-${filterId}`}
            className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
          >
            {option.label}
            <button onClick={() => removeCommittedFilter({ groupId, optionId: filterId })} className="hover:bg-primary/20 rounded-sm p-0.5">
              <X className="w-3 h-3" />
            </button>
          </span>
        )
      })
    })
    return chips
  }

  if (totalSelected === 0) return null

  return (
    <div className="">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              commitDraft()
              const params = new URLSearchParams(searchParams?.toString() || '')
              params.set('facets', encodeURIComponent(JSON.stringify(draftSelected)))
              router.push(`/search?${params.toString()}`)
              onApplied?.()
            }}
            disabled={totalDraftSelected === 0}
            size="sm"
          >
            Apply Filters
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearCommitted()
              const params = new URLSearchParams(searchParams?.toString() || '')
              params.delete('facets')
              router.push(`/search?${params.toString()}`)
              onCleared?.()
            }}
          >
            Clear all
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">{renderSelectedChips()}</div>
    </div>
  )
}

export default ActiveFilters


