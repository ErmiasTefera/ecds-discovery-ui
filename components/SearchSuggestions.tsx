import React from 'react'
import { FileText, Book, GraduationCap } from 'lucide-react'
import type { MockResult } from '@/services'

interface SearchSuggestionsProps {
  results: MockResult[]
  selectedIndex: number
  onItemHover: (index: number) => void
  onItemClick: (result: MockResult) => void
}

const getTypeIcon = (type: 'article' | 'book' | 'thesis') => {
  switch (type) {
    case 'article':
      return <FileText className="w-4 h-4 text-primary" />
    case 'book':
      return <Book className="w-4 h-4 text-primary" />
    case 'thesis':
      return <GraduationCap className="w-4 h-4 text-primary" />
    default:
      return <FileText className="w-4 h-4 text-primary" />
  }
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  results,
  selectedIndex,
  onItemHover,
  onItemClick,
}) => {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="space-y-1">
          {results.map((result, index) => (
            <div
              key={result.id}
              onClick={() => onItemClick(result)}
              onMouseEnter={() => onItemHover(index)}
              className={`p-3 rounded cursor-pointer text-left transition-colors ${
                index === selectedIndex ? 'bg-primary/10' : 'hover:bg-primary/10'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">{getTypeIcon(result.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {result.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground text-left px-3">
            Use ↑↓ arrows to navigate • Press Enter to select • Escape to close
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchSuggestions


