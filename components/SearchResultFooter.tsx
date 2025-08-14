import React, { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Download, Quote, Eye, Sparkles, Loader2, Eye as EyeIcon, ChevronUp, ChevronDown } from 'lucide-react'
import CitationDialog from '@/components/CitationDialog'
import type { SearchResult } from '@/models'
import { httpService } from '@/services/httpService'

interface SearchResultFooterProps {
  result: SearchResult
  detailHref: string
}

const SearchResultFooter: React.FC<SearchResultFooterProps> = ({ result, detailHref }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [hasRequestedSummary, setHasRequestedSummary] = useState(false)
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(false)

  const handleGetAISummary = async () => {
    if (hasRequestedSummary) return
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

  return (
    <>
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
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">AI Summary</span>
              </div>
              <button
                type="button"
                onClick={() => setIsSummaryCollapsed((v) => !v)}
                className="inline-flex items-center text-xs text-primary hover:text-primary/80"
                aria-label={isSummaryCollapsed ? 'Expand AI summary' : 'Collapse AI summary'}
              >
                {isSummaryCollapsed ? (
                  <>
                    Show
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </>
                ) : (
                  <>
                    Hide
                    <ChevronUp className="w-3 h-3 ml-1" />
                  </>
                )}
              </button>
            </div>
            {!isSummaryCollapsed && (
              <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                {aiSummary}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Metrics and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Metrics */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Quote className="w-3 h-3" />
            <span>{result.citationCount} citations</span>
          </div>
          <div className="flex items-center space-x-1">
            <Download className="w-3 h-3" />
            <span>{result.downloadCount.toLocaleString()} downloads</span>
          </div>
          <div className="flex items-center space-x-1">
            <EyeIcon className="w-3 h-3" />
            <span>{(result.viewCount ?? Math.max(500, result.downloadCount * 2)).toLocaleString()} views</span>
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
          <CitationDialog
            triggerLabel="Cite"
            apa={`${result.authors.join(', ')} (${result.year}). ${result.title}. ${result.journal || result.publisher || ''}.`}
            mla={`${result.authors.join(', ')}. "${result.title}." ${result.journal || result.publisher || ''}, ${result.year}.`}
            chicago={`${result.authors.join(', ')}. ${result.year}. ${result.title}. ${result.journal || result.publisher || ''}.`}
          />
          <Link
            href={detailHref}
            className="inline-flex items-center px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Details
            <Eye className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default SearchResultFooter


