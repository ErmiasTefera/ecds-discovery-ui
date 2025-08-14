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
  const [searchCriteria, setSearchCriteria] = useAtom(advancedSearchCriteriaAtom)
  const [filters, setFilters] = useAtom(advancedSearchFiltersAtom)
  const hasInitialized = React.useRef(false)

  useEffect(() => {
    if (isOpen && !hasInitialized.current) {
      // Always ensure we have at least the first three rows
      let criteria = searchCriteria.length > 0 ? searchCriteria : []
      
      // If no criteria provided and there's a main search query, use it as keyword
      if (criteria.length === 0 && mainSearchQuery.trim()) {
        criteria = [
          { field: 'keyword', value: mainSearchQuery.trim(), operator: 'AND' },
          { field: 'title', value: '', operator: 'AND' },
          { field: 'author', value: '', operator: 'AND' }
        ]
      }
      
      // Ensure minimum 3 rows and sort by content
      const processedCriteria = ensureMinimumCriteria(criteria)
      setSearchCriteria(processedCriteria)
      setFilters(initialFilters)
      
      hasInitialized.current = true
    }
    
    // Reset initialization flag when modal closes
    if (!isOpen) {
      hasInitialized.current = false
    }
  }, [isOpen, mainSearchQuery, searchCriteria, setSearchCriteria, setFilters, initialFilters])

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
    const newCriteria = [...searchCriteria]
    newCriteria[index] = { ...newCriteria[index], [field]: value }
    const processedCriteria = ensureMinimumCriteria(newCriteria)
    setSearchCriteria(processedCriteria)
  }

  const addCriteria = () => {
    const newCriteria = [...searchCriteria, { field: 'keyword', value: '', operator: 'AND' }]
    const processedCriteria = ensureMinimumCriteria(newCriteria)
    setSearchCriteria(processedCriteria)
  }

  const removeCriteria = (index: number) => {
    // Don't allow removing rows if we only have 3 rows (the minimum)
    if (searchCriteria.length > 3) {
      const newCriteria = searchCriteria.filter((_, i) => i !== index)
      const processedCriteria = ensureMinimumCriteria(newCriteria)
      setSearchCriteria(processedCriteria)
    }
  }

  const handleSearch = () => {
    const validCriteria = searchCriteria.filter(criteria => criteria.value.trim() !== '')
    
    // Update the global state with current criteria and filters
    setSearchCriteria(validCriteria.length > 0 ? searchCriteria : [])
    setFilters(filters)
    
    // Trigger the search
    onSearch(validCriteria, filters)
    onClose()
  }

  const handleReset = () => {
    // Reset to default 3 rows with empty values
    const defaultCriteria = [
      { field: 'keyword', value: '', operator: 'AND' },
      { field: 'title', value: '', operator: 'AND' },
      { field: 'author', value: '', operator: 'AND' }
    ]
    
    const processedCriteria = ensureMinimumCriteria(defaultCriteria)
    setSearchCriteria(processedCriteria)
    setFilters({
      yearFrom: '',
      yearTo: '',
      format: 'all',
      language: 'all'
    })
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search Criteria Section */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {searchCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Select
                      value={criteria.field}
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
                      value={criteria.value}
                      onChange={(e) => updateCriteria(index, 'value', e.target.value)}
                      placeholder="Enter your search term"
                      className="flex-1"
                    />

                    {index < searchCriteria.length - 1 && (
                      <Select
                        value={criteria.operator}
                        onValueChange={(value) => updateCriteria(index, 'operator', value)}
                      >
                        <SelectTrigger className="w-16">
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

                    {index === searchCriteria.length - 1 && (
                      <Button onClick={addCriteria} variant="ghost" size="icon" aria-label="Add search criteria">
                        <Plus className="w-4 h-4" />
                      </Button>
                    )}

                    {searchCriteria.length > 3 && (
                      <Button onClick={() => removeCriteria(index)} variant="ghost" size="icon" aria-label="Remove search criteria">
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Options Section */}
            <div className="space-y-4">
                {/* Year Range */}
                <div>
                  <Label className="mb-2 text-left">Year</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={filters.yearFrom}
                      onChange={(e) => setFilters({ ...filters, yearFrom: e.target.value })}
                      placeholder="YYYY"
                      min={1900}
                      max={2030}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">to</span>
                    <Input
                      type="number"
                      value={filters.yearTo}
                      onChange={(e) => setFilters({ ...filters, yearTo: e.target.value })}
                      placeholder="YYYY"
                      min={1900}
                      max={2030}
                      className="w-24"
                    />
                  </div>
                </div>

                {/* Format */}
                <div>
                  <Label className="mb-2 text-left">Format</Label>
                  <Select
                    value={filters.format}
                    onValueChange={(value) => setFilters({ ...filters, format: value })}
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
                    value={filters.language}
                    onValueChange={(value) => setFilters({ ...filters, language: value })}
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
