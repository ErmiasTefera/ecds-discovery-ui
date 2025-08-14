'use client'

import React, { useEffect } from 'react'
import { X, Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAtom } from 'jotai'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { 
  advancedSearchCriteriaAtom, 
  advancedSearchFiltersAtom,
  ensureMinimumCriteria,
  type SearchCriteria,
  type AdvancedSearchFilters
} from '@/atoms/searchAtoms'

interface AdvancedSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (criteria: SearchCriteria[], filters: AdvancedSearchFilters) => void
  initialFilters?: AdvancedSearchFilters
  mainSearchQuery?: string
}

const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  isOpen,
  onClose,
  onSearch,
  initialFilters = {
    yearFrom: '',
    yearTo: '',
    format: 'all',
    language: 'all'
  },
  mainSearchQuery = ''
}) => {
  // Global atoms (persisted when user clicks Search)
  const [globalCriteria, setGlobalCriteria] = useAtom(advancedSearchCriteriaAtom)
  const [, setGlobalFilters] = useAtom(advancedSearchFiltersAtom)
  // Local, non-persisted modal state
  const [localCriteria, setLocalCriteria] = React.useState<SearchCriteria[]>([])
  const [localFilters, setLocalFilters] = React.useState<AdvancedSearchFilters>(initialFilters)
  const hasInitialized = React.useRef(false)

  useEffect(() => {
    if (isOpen && !hasInitialized.current) {
      // Initialize local state from global state but DO NOT persist until Search
      let criteria = globalCriteria.length > 0 ? globalCriteria : []
      if (criteria.length === 0 && mainSearchQuery.trim()) {
        criteria = [
          { field: 'keyword', value: mainSearchQuery.trim(), operator: 'AND' },
          { field: 'title', value: '', operator: 'AND' },
          { field: 'author', value: '', operator: 'AND' }
        ]
      }
      const processedCriteria = ensureMinimumCriteria(criteria)
      setLocalCriteria(processedCriteria)
      setLocalFilters(initialFilters)
      hasInitialized.current = true
    }
    if (!isOpen) {
      hasInitialized.current = false
    }
  }, [isOpen, mainSearchQuery, globalCriteria, initialFilters])

  const fieldOptions = [
    { value: 'keyword', label: 'Keyword' },
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'subject', label: 'Subject' },
    { value: 'publisher', label: 'Publisher' },
    { value: 'doi', label: 'DOI' },
    { value: 'isbn', label: 'ISBN' }
  ]

  const operatorOptions = [
    { value: 'AND', label: 'AND' },
    { value: 'OR', label: 'OR' },
    { value: 'NOT', label: 'NOT' }
  ]

  const formatOptions = [
    { value: 'all', label: 'All formats' },
    { value: 'article', label: 'Articles' },
    { value: 'book', label: 'Books' },
    { value: 'thesis', label: 'Theses' },
    { value: 'conference', label: 'Conference Papers' },
    { value: 'report', label: 'Reports' }
  ]

  const languageOptions = [
    { value: 'all', label: 'All languages' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' }
  ]

  const updateCriteria = (index: number, field: keyof SearchCriteria, value: string) => {
    const newCriteria = [...localCriteria]
    newCriteria[index] = { ...newCriteria[index], [field]: value }
    const processedCriteria = ensureMinimumCriteria(newCriteria)
    setLocalCriteria(processedCriteria)
  }

  const addCriteria = () => {
    const newCriteria = [...localCriteria, { field: 'keyword', value: '', operator: 'AND' }]
    const processedCriteria = ensureMinimumCriteria(newCriteria)
    setLocalCriteria(processedCriteria)
  }

  const removeCriteria = (index: number) => {
    if (localCriteria.length > 3) {
      const newCriteria = localCriteria.filter((_, i) => i !== index)
      const processedCriteria = ensureMinimumCriteria(newCriteria)
      setLocalCriteria(processedCriteria)
    }
  }

  const handleSearch = () => {
    const validCriteria = localCriteria.filter(criteria => criteria.value.trim() !== '')
    // Persist to global atoms only here
    setGlobalCriteria(validCriteria.length > 0 ? localCriteria : [])
    setGlobalFilters(localFilters)
    onSearch(validCriteria, localFilters)
    onClose()
  }

  const handleReset = () => {
    const defaultCriteria = [
      { field: 'keyword', value: '', operator: 'AND' },
      { field: 'title', value: '', operator: 'AND' },
      { field: 'author', value: '', operator: 'AND' }
    ]
    const processedCriteria = ensureMinimumCriteria(defaultCriteria)
    setLocalCriteria(processedCriteria)
    setLocalFilters({ yearFrom: '', yearTo: '', format: 'all', language: 'all' })
  }

  // --- Preview builders ---
  const getFieldLabel = (value: string) => fieldOptions.find(o => o.value === value)?.label || value
  const getFormatLabel = (value: string) => formatOptions.find(o => o.value === value)?.label || value
  const getLanguageLabel = (value: string) => languageOptions.find(o => o.value === value)?.label || value

  const buildCriteriaPreview = () => {
    const filled = localCriteria.filter(c => c.value.trim().length > 0)
    if (filled.length === 0) return 'Add criteria to see a combined query preview.'

    let preview = ''
    filled.forEach((criteria, index) => {
      const token = `(${getFieldLabel(criteria.field)}: "${criteria.value.trim()}")`
      if (index === 0) {
        preview = token
      } else {
        const joinOperator = filled[index - 1].operator === 'NOT' ? 'AND NOT' : filled[index - 1].operator || 'AND'
        preview += ` ${joinOperator} ${token}`
      }
    })
    return preview
  }

  const buildFilterBadges = (): string[] => {
    const badges: string[] = []
    if (localFilters.format && localFilters.format !== 'all') badges.push(`Format: ${getFormatLabel(localFilters.format)}`)
    if (localFilters.language && localFilters.language !== 'all') badges.push(`Language: ${getLanguageLabel(localFilters.language)}`)
    if (localFilters.yearFrom || localFilters.yearTo) {
      const from = localFilters.yearFrom || '2000'
      const to = localFilters.yearTo || '2025'
      badges.push(`Year: ${from}–${to}`)
    }
    return badges
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Advanced Search</h2>
          <Button onClick={onClose} variant="ghost" size="icon" aria-label="Close modal">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {/* Search Criteria Section */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {localCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Select
                      value={localCriteria[index].field}
                      onValueChange={(value) => updateCriteria(index, 'field', value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      type="text"
                      value={localCriteria[index].value}
                      onChange={(e) => updateCriteria(index, 'value', e.target.value)}
                      placeholder="Enter your search term"
                      className="flex-1 h-11"
                    />

                    {index < localCriteria.length - 1 && (
                      <Select
                        value={localCriteria[index].operator}
                        onValueChange={(value) => updateCriteria(index, 'operator', value)}
                      >
                        <SelectTrigger className="">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {operatorOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {index === localCriteria.length - 1 && (
                      <Button onClick={addCriteria} variant="ghost" size="icon" aria-label="Add search criteria">
                        <Plus className="w-4 h-4" />
                      </Button>
                    )}

                    {localCriteria.length > 3 && (
                      <Button onClick={() => removeCriteria(index)} variant="ghost" size="icon" aria-label="Remove search criteria">
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {/* Live Search Preview */}
              <div className="mt-6 p-4 border border-border rounded-md bg-secondary/30">
                <div className="text-sm font-semibold text-foreground mb-2">Search preview</div>
                <p className="text-sm text-muted-foreground break-words">
                  {buildCriteriaPreview()}
                </p>
                {buildFilterBadges().length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {buildFilterBadges().map((badge) => (
                      <span key={badge} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Filter Options Section */}
            <div className="space-y-4">
                {/* Year Range (Slider) */}
                <div>
                  <Label className="mb-2 text-left">Year</Label>
                  <div className="px-1 py-3 border border-border rounded-md">
                    <Slider
                      value={[Number(localFilters.yearFrom || 2000), Number(localFilters.yearTo || 2025)]}
                      min={2000}
                      max={2025}
                      step={1}
                      onValueChange={(vals: number[]) =>
                        setLocalFilters({
                          ...localFilters,
                          yearFrom: String(vals[0]),
                          yearTo: String(vals[1]),
                        })
                      }
                    />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>{localFilters.yearFrom || '2000'}</span>
                      <span>{localFilters.yearTo || '2025'}</span>
                    </div>
                  </div>
                </div>

                {/* Format */}
                <div>
                  <Label className="mb-2 text-left">Format</Label>
                  <Select
                    value={localFilters.format}
                    onValueChange={(value) => setLocalFilters({ ...localFilters, format: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formatOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div>
                  <Label className="mb-2 text-left">Language</Label>
                  <Select
                    value={localFilters.language}
                    onValueChange={(value) => setLocalFilters({ ...localFilters, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button onClick={handleReset} variant="ghost">Reset</Button>
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline">Cancel</Button>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedSearchModal
