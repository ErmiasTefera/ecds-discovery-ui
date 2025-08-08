import React, { useState } from 'react'
import Link from 'next/link'
import { FileText, Book, GraduationCap, ExternalLink, Download, Quote, Eye, Sparkles, Loader2, Bookmark } from 'lucide-react'
import { useAtom } from 'jotai'
import type { SearchResult } from '@/models'
import { httpService } from '@/services/httpService'
import { isAuthenticatedAtom } from '@/atoms/authAtoms'
import { isResourceSavedAtom } from '@/atoms/collectionAtoms'
import SaveToCollectionModal from './SaveToCollectionModal'



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
  const [aiSummary, setAiSummary] = useState<string | null>(null)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [hasRequestedSummary, setHasRequestedSummary] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [isAuthenticated] = useAtom(isAuthenticatedAtom)
  const isResourceSaved = useAtom(isResourceSavedAtom)[0]

  const handleGetAISummary = async () => {
    if (hasRequestedSummary) return // Prevent multiple requests
    
    setIsLoadingSummary(true)
    setHasRequestedSummary(true)
    
    try {
      const response = await httpService.getAISummary(result.id)
      if (response.success) {
        setAiSummary(response.data.summary)
      }
    } catch (error) {
      console.error('Failed to get AI summary:', error)
    } finally {
      setIsLoadingSummary(false)
    }
  }
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
    if (currentSearchQuery?.trim()) {
      const searchParams = new URLSearchParams()
      searchParams.set('q', currentSearchQuery.trim())
      return `${baseHref}?${searchParams.toString()}`
    }
    return baseHref
  }

  return (
    <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-shrink-0 mt-1">
            {getTypeIcon(result.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {getTypeLabel(result.type)}
              </span>
              <span className="text-sm text-muted-foreground">{result.year}</span>
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

      {/* AI Summary Section */}
      <div className="mb-4">
        {!hasRequestedSummary && (
          <button
            onClick={handleGetAISummary}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Get AI Summary
          </button>
        )}
        
        {isLoadingSummary && (
          <div className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-md">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Generating AI summary...</span>
          </div>
        )}
        
        {aiSummary && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">AI Summary</span>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              {aiSummary}
            </p>
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Quote className="w-3 h-3" />
            <span>{result.citationCount} citations</span>
          </div>
          <div className="flex items-center space-x-1">
            <Download className="w-3 h-3" />
            <span>{result.downloadCount.toLocaleString()} downloads</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {result.doi && (
            <Link
              href={`https://doi.org/${result.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 border border-border text-xs font-medium rounded-md hover:bg-secondary transition-colors"
            >
              DOI
              <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
          )}
          {result.url && (
            <Link
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 border border-border text-xs font-medium rounded-md hover:bg-secondary transition-colors"
            >
              View
              <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
          )}
          <button
            onClick={() => setShowSaveModal(true)}
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              isResourceSaved(result.id)
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                : 'border border-border hover:bg-secondary'
            }`}
          >
            <Bookmark className={`w-3 h-3 ml-1 ${isResourceSaved(result.id) ? 'fill-current' : ''}`} />
            {isResourceSaved(result.id) ? 'Saved' : 'Save'}
          </button>
          <Link
            href={getDetailHref(result.id)}
            className="inline-flex items-center px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Details
            <Eye className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>
      
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
