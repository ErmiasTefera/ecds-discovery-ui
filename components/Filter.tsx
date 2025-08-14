'use client'

import React, { useEffect } from 'react'
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { getFilters } from '@/services'
import type { FilterOption } from '@/models'
import { Badge } from './ui/badge'
import { useAtom } from 'jotai'
import {
  filtersAtom,
  filtersLoadingAtom,
  filtersErrorAtom,
  draftSelectedFiltersAtom,
  expandedGroupsAtom,
  showMoreAtom,
  changeFilterSelectionAtom,
  toggleGroupAtom,
  toggleShowMoreAtom,
  resetDraftFiltersAtom,
  editModeAtom,
} from '@/atoms/filterAtoms'
import SortControls from './SortControls'
import ActiveFilters from './ActiveFilters'
// ActiveFilters is used elsewhere; Filter focuses on groups and selection

const Filter: React.FC = () => {
  const [filters, setFilters] = useAtom(filtersAtom)
  const [loading, setLoading] = useAtom(filtersLoadingAtom)
  const [error, setError] = useAtom(filtersErrorAtom)
  const [selectedFilters] = useAtom(draftSelectedFiltersAtom)
  const [expandedGroups] = useAtom(expandedGroupsAtom)
  const [showMore] = useAtom(showMoreAtom)
  const [, changeSelection] = useAtom(changeFilterSelectionAtom)
  const [, toggleGroup] = useAtom(toggleGroupAtom)
  const [, toggleShowMore] = useAtom(toggleShowMoreAtom)
  const [, resetDraft] = useAtom(resetDraftFiltersAtom)
  const [, setEditMode] = useAtom(editModeAtom)

  // Fetch filters
  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true)
      setError(false)
      
      try {
        const filterData = await getFilters()
        setFilters(filterData)
      } catch (err) {
        console.error('Error fetching filters:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchFilters()
  }, [setFilters, setLoading, setError])

  // When the Filter component mounts in any context (sidebar or dialog), sync draft with committed state
  useEffect(() => {
    setEditMode(typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches ? 'sidebar' : 'dialog')
    resetDraft()
  }, [resetDraft, setEditMode])

  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    changeSelection({ groupId, optionId, checked })
  }

  // const removeFilter = (groupId: string, optionId: string) => {
  //   changeSelection({ groupId, optionId, checked: false })
  // }

  const getVisibleOptions = (options: FilterOption[], groupId: string) => {
    const showMoreForGroup = showMore[groupId]
    return showMoreForGroup ? options : options.slice(0, 5)
  }

  // const getTotalSelectedCount = () => Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0)

  if (loading) {
    return (
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading filters...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Failed to load filters. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Refine Results</h2>
      </div>
      
      <ActiveFilters />

      <div className='mt-4 flex items-center justify-between'>
      <SortControls/>
      </div>

      {/* Filter Groups */}
      <div className="mt-4 space-y-4">
        {filters.map((group) => (
          <div key={group.id} className="border-b border-border pb-4 last:border-b-0">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex items-center justify-between w-full text-left mb-3"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-foreground">{group.title}</h3>
                {!!(selectedFilters[group.id]?.length) && (
                  <Badge className="bg-primary/10 text-primary">{selectedFilters[group.id].length}</Badge>
                )}
              </div>
              {expandedGroups[group.id] ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {expandedGroups[group.id] && (
              <div className="space-y-2">
                {getVisibleOptions(group.options, group.id).map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center justify-between cursor-pointer hover:bg-secondary/50 rounded p-1 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedFilters[group.id]?.includes(option.id) || false}
                        onChange={(e) => handleFilterChange(group.id, option.id, e.target.checked)}
                        className="checkbox checkbox-primary"
                      />
                      <span className="text-sm text-foreground">{option.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {option.count.toLocaleString()}
                    </span>
                  </label>
                ))}

                {group.options.length > 5 && (
                  <button
                    onClick={() => toggleShowMore(group.id)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors mt-2"
                  >
                    {showMore[group.id] 
                      ? 'Show less' 
                      : `Show ${group.options.length - 5} more`}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter
