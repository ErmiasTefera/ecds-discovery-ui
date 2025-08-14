import React from 'react'
import { useAtom } from 'jotai'
import { SortAsc, SortDesc } from 'lucide-react'
import {
  sortByAtom,
  sortDirectionAtom,
  currentPageAtom,
} from '@/atoms/searchAtoms'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { SortOption } from '@/services'

const SortControls: React.FC = () => {
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortDirection, setSortDirection] = useAtom(sortDirectionAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)

  const handleSortChange = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(newSortBy)
      setSortDirection('desc')
    }
    setCurrentPage(1)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-foreground">Sort by:</span>
      <Select value={sortBy} onValueChange={(value) => handleSortChange(value as SortOption)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select sort option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="popularity">Popularity</SelectItem>
          <SelectItem value="recent">Recent ↑</SelectItem>
          <SelectItem value="oldest">Oldest ↓</SelectItem>
          <SelectItem value="title-asc">Title (A–Z)</SelectItem>
          <SelectItem value="title-desc">Title (Z–A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SortControls


