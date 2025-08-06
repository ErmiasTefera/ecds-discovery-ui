'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'

interface FilterOption {
  id: string
  label: string
  count: number
}

interface FilterGroup {
  id: string
  title: string
  options: FilterOption[]
  type: 'checkbox' | 'radio'
}

const mockFilters: FilterGroup[] = [
  {
    id: 'type',
    title: 'Resource Type',
    type: 'checkbox',
    options: [
      { id: 'article', label: 'Journal Articles', count: 1247 },
      { id: 'book', label: 'Books', count: 342 },
      { id: 'thesis', label: 'Theses', count: 89 },
      { id: 'conference', label: 'Conference Papers', count: 567 },
      { id: 'report', label: 'Technical Reports', count: 234 }
    ]
  },
  {
    id: 'year',
    title: 'Publication Year',
    type: 'checkbox',
    options: [
      { id: '2024', label: '2024', count: 156 },
      { id: '2023', label: '2023', count: 423 },
      { id: '2022', label: '2022', count: 567 },
      { id: '2021', label: '2021', count: 489 },
      { id: '2020', label: '2020', count: 312 },
      { id: 'older', label: 'Before 2020', count: 1532 }
    ]
  },
  {
    id: 'subject',
    title: 'Subject Area',
    type: 'checkbox',
    options: [
      { id: 'computer-science', label: 'Computer Science', count: 892 },
      { id: 'engineering', label: 'Engineering', count: 543 },
      { id: 'medicine', label: 'Medicine & Health', count: 434 },
      { id: 'physics', label: 'Physics', count: 321 },
      { id: 'biology', label: 'Biology', count: 298 },
      { id: 'chemistry', label: 'Chemistry', count: 267 },
      { id: 'mathematics', label: 'Mathematics', count: 198 },
      { id: 'social-sciences', label: 'Social Sciences', count: 156 }
    ]
  },
  {
    id: 'access',
    title: 'Access Type',
    type: 'checkbox',
    options: [
      { id: 'open-access', label: 'Open Access', count: 1234 },
      { id: 'subscription', label: 'Subscription Required', count: 1567 },
      { id: 'free', label: 'Free to Read', count: 890 }
    ]
  },
  {
    id: 'language',
    title: 'Language',
    type: 'checkbox',
    options: [
      { id: 'english', label: 'English', count: 2341 },
      { id: 'spanish', label: 'Spanish', count: 234 },
      { id: 'french', label: 'French', count: 189 },
      { id: 'german', label: 'German', count: 156 },
      { id: 'chinese', label: 'Chinese', count: 134 },
      { id: 'other', label: 'Other Languages', count: 423 }
    ]
  }
]

const Filter: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    type: true,
    year: true,
    subject: false,
    access: false,
    language: false
  })
  const [showMore, setShowMore] = useState<Record<string, boolean>>({})

  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const groupFilters = prev[groupId] || []
      if (checked) {
        return {
          ...prev,
          [groupId]: [...groupFilters, optionId]
        }
      } else {
        return {
          ...prev,
          [groupId]: groupFilters.filter(id => id !== optionId)
        }
      }
    })
  }

  const removeFilter = (groupId: string, optionId: string) => {
    handleFilterChange(groupId, optionId, false)
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
  }

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  const toggleShowMore = (groupId: string) => {
    setShowMore(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  const getVisibleOptions = (options: FilterOption[], groupId: string) => {
    const showMoreForGroup = showMore[groupId]
    return showMoreForGroup ? options : options.slice(0, 5)
  }

  const getTotalSelectedCount = () => {
    return Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0)
  }

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        {getTotalSelectedCount() > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active Filters */}
      {getTotalSelectedCount() > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-2">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([groupId, filters]) =>
              filters.map(filterId => {
                const group = mockFilters.find(g => g.id === groupId)
                const option = group?.options.find(o => o.id === filterId)
                if (!option) return null

                return (
                  <span
                    key={`${groupId}-${filterId}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                  >
                    {option.label}
                    <button
                      onClick={() => removeFilter(groupId, filterId)}
                      className="hover:bg-primary/20 rounded-sm p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Filter Groups */}
      <div className="space-y-4">
        {mockFilters.map((group) => (
          <div key={group.id} className="border-b border-border pb-4 last:border-b-0">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex items-center justify-between w-full text-left mb-3"
            >
              <h3 className="text-sm font-medium text-foreground">{group.title}</h3>
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
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-1"
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
