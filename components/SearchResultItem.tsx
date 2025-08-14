import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { FileText, Book, GraduationCap } from 'lucide-react'
import type { SearchResult } from '@/models'
import SaveToCollectionModal from './SaveToCollectionModal'
import SearchResultFooter from './SearchResultFooter'
import { Bookmark } from 'lucide-react'
import { useAtom } from 'jotai'
import { isResourceSavedAtom, toggleSaveResourceAtom } from '@/atoms/collectionAtoms'



interface SearchResultItemProps {
  result: SearchResult
  currentSearchQuery?: string
}

// Helper function to highlight search terms
const highlightText = (text: string, searchQuery: string) => {
  if (!searchQuery || !text) return text
  
  const searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(term => term.length > 0)
  if (searchTerms.length === 0) return text
  
  let highlightedText = text
  
  searchTerms.forEach(term => {
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>')
  })
  
  return highlightedText
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, currentSearchQuery }) => {
  const [showSaveModal, setShowSaveModal] = React.useState(false)
  const isResourceSaved = useAtom(isResourceSavedAtom)[0]
  const [, toggleSave] = useAtom(toggleSaveResourceAtom)
  const searchParams = useSearchParams()

  
  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'article':
        return <FileText className="w-5 h-5 text-primary" />
      case 'book':
        return <Book className="w-5 h-5 text-primary" />
      case 'thesis':
        return <GraduationCap className="w-5 h-5 text-primary" />
      default:
        return <FileText className="w-5 h-5 text-primary" />
    }
  }

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'article':
        return 'Journal Article'
      case 'book':
        return 'Book'
      case 'thesis':
        return 'Thesis'
      default:
        return 'Document'
    }
  }

  const formatAuthors = (authors: string[]) => {
    if (authors.length <= 3) {
      return authors.join(', ')
    }
    return `${authors.slice(0, 3).join(', ')} et al.`
  }

  const getDetailHref = (resourceId: string) => {
    const baseHref = `/detail/${resourceId}`
    const params = new URLSearchParams(searchParams?.toString() || '')
    // Fallback to currentSearchQuery if URL has no q
    if (currentSearchQuery?.trim() && !params.get('q')) {
      params.set('q', currentSearchQuery.trim())
    }
    const qs = params.toString()
    return qs ? `${baseHref}?${qs}` : baseHref
  }

  return (
    <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      
      {/* Header with thumbnail */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className="flex-shrink-0">
            {result.thumbnailUrl ? (
              <Image
                src={result.thumbnailUrl}
                alt={result.title}
                width={64}
                height={64}
                className="w-16 h-16 rounded object-cover border border-border"
              />
            ) : (
              <div className="w-16 h-16 rounded bg-secondary flex items-center justify-center border border-border">
                {getTypeIcon(result.type)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 justify-between">
              <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {getTypeLabel(result.type)}
              </span>
              <span className="text-sm text-muted-foreground">{result.year}</span>
              </div>
              <button
            onClick={() => toggleSave({ resource: result })}
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              isResourceSaved(result.id)
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                : 'border border-border hover:bg-secondary'
            }`}
          >
            <Bookmark className={`w-3 h-3 ${isResourceSaved(result.id) ? 'fill-current' : ''}`} />
            <span className="ml-1">{isResourceSaved(result.id) ? 'Saved' : 'Save'}</span>
          </button>
            </div>
            <Link 
              href={getDetailHref(result.id)}
              className="block group"
            >
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                <span dangerouslySetInnerHTML={{ 
                  __html: highlightText(result.title, currentSearchQuery || '') 
                }} />
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mb-2">
              By <span dangerouslySetInnerHTML={{ 
                __html: highlightText(formatAuthors(result.authors), currentSearchQuery || '') 
              }} />
            </p>
            {(result.journal || result.publisher) && (
              <p className="text-sm text-muted-foreground mb-3">
                Published in <span className="font-medium" dangerouslySetInnerHTML={{ 
                  __html: highlightText(result.journal || result.publisher || '', currentSearchQuery || '') 
                }} />
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        <span dangerouslySetInnerHTML={{ 
          __html: highlightText(result.description, currentSearchQuery || '') 
        }} />
      </p>

      {/* Tags */}
      {result.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {result.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
          {result.tags.length > 4 && (
            <span className="text-xs text-muted-foreground">
              +{result.tags.length - 4} more
            </span>
          )}
        </div>
      )}

      <SearchResultFooter result={result} detailHref={getDetailHref(result.id)} />
      
      {/* Save to Collection Modal */}
      <SaveToCollectionModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        resource={result}
      />
    </div>
  )
}

export default SearchResultItem
