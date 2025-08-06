import React from 'react'
import Link from 'next/link'
import { FileText, Book, GraduationCap, ExternalLink, Download, Quote, Eye } from 'lucide-react'
import type { SearchResult } from '@/models'



interface SearchResultItemProps {
  result: SearchResult
  currentSearchQuery?: string
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, currentSearchQuery }) => {
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
                {result.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mb-2">
              By {formatAuthors(result.authors)}
            </p>
            {(result.journal || result.publisher) && (
              <p className="text-sm text-muted-foreground mb-3">
                Published in <span className="font-medium">{result.journal || result.publisher}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {result.description}
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
          <Link
            href={getDetailHref(result.id)}
            className="inline-flex items-center px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Details
            <Eye className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchResultItem
