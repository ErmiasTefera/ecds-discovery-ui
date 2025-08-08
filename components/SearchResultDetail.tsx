'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { 
  FileText, 
  Book, 
  GraduationCap, 
  ExternalLink, 
  Download, 
  Quote, 
  Copy, 
  Share,
  Bookmark,
  Calendar,
  Users,
  MapPin,
  Tag,
  Link as LinkIcon
} from 'lucide-react'
import type { DetailResource } from '@/models'
import { isResourceSavedAtom } from '@/atoms/collectionAtoms'
import SaveToCollectionModal from './SaveToCollectionModal'



interface SearchResultDetailProps {
  resource: DetailResource
  currentSearchQuery?: string
}

type TabType = 'overview' | 'references' | 'related' | 'metrics'

const SearchResultDetail: React.FC<SearchResultDetailProps> = ({ resource, currentSearchQuery }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [showSaveModal, setShowSaveModal] = useState(false)

  const isResourceSaved = useAtom(isResourceSavedAtom)[0]

  const getTypeIcon = (type: DetailResource['type']) => {
    switch (type) {
      case 'article':
        return <FileText className="w-6 h-6 text-primary" />
      case 'book':
        return <Book className="w-6 h-6 text-primary" />
      case 'thesis':
        return <GraduationCap className="w-6 h-6 text-primary" />
      default:
        return <FileText className="w-6 h-6 text-primary" />
    }
  }

  const getTypeLabel = (type: DetailResource['type']) => {
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

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(type)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const formatCitation = () => {
    const authors = resource.authors.join(', ')
    const year = resource.year
    const title = resource.title
    
    if (resource.type === 'article') {
      return `${authors} (${year}). ${title}. ${resource.journal || 'Unknown Journal'}${resource.volume ? `, ${resource.volume}` : ''}${resource.issue ? `(${resource.issue})` : ''}${resource.pages ? `, ${resource.pages}` : ''}.${resource.doi ? ` https://doi.org/${resource.doi}` : ''}`
    } else if (resource.type === 'book') {
      return `${authors} (${year}). ${title}. ${resource.publisher || 'Unknown Publisher'}.${resource.isbn ? ` ISBN: ${resource.isbn}` : ''}`
    } else {
      return `${authors} (${year}). ${title}. [Thesis]. ${resource.affiliations?.[0] || 'Unknown Institution'}.`
    }
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

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', count: null },
    { id: 'references' as TabType, label: 'References', count: resource.references?.length || 0 },
    { id: 'related' as TabType, label: 'Related Resources', count: resource.relatedResources?.length || 0 },
    { id: 'metrics' as TabType, label: 'Metrics', count: null }
  ]

  return (
    <div className="bg-background">
      {/* Header Section */}
      <div className="bg-background border border-border rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4 flex-1">
            <div className="flex-shrink-0 mt-1">
              {getTypeIcon(resource.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  {getTypeLabel(resource.type)}
                </span>
                <span className="text-muted-foreground">{resource.year}</span>
                {resource.language && (
                  <span className="text-muted-foreground text-sm">
                    {resource.language}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">
                {resource.title}
              </h1>
              <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{resource.authors.join(', ')}</span>
                </div>
              </div>
              {(resource.journal || resource.publisher) && (
                <div className="flex items-center space-x-1 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">
                    {resource.journal || resource.publisher}
                    {resource.volume && `, Vol. ${resource.volume}`}
                    {resource.issue && `, Issue ${resource.issue}`}
                    {resource.pages && `, pp. ${resource.pages}`}
                  </span>
                </div>
              )}
              {resource.publicationDate && (
                <div className="flex items-center space-x-1 text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Published: {new Date(resource.publicationDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {resource.doi && (
            <Link
              href={`https://doi.org/${resource.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-border text-foreground rounded-md hover:bg-secondary transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              DOI
            </Link>
          )}
          {resource.url && (
            <Link
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-border text-foreground rounded-md hover:bg-secondary transition-colors"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Full Text
            </Link>
          )}
          <button
            onClick={() => handleCopy(formatCitation(), 'citation')}
            className="inline-flex items-center px-4 py-2 border border-border text-foreground rounded-md hover:bg-secondary transition-colors"
          >
            <Quote className="w-4 h-4 mr-2" />
            {copySuccess === 'citation' ? 'Copied!' : 'Cite'}
          </button>
          <button
            onClick={() => handleCopy(window.location.href, 'link')}
            className="inline-flex items-center px-4 py-2 border border-border text-foreground rounded-md hover:bg-secondary transition-colors"
          >
            <Share className="w-4 h-4 mr-2" />
            {copySuccess === 'link' ? 'Copied!' : 'Share'}
          </button>
          <button
            onClick={() => setShowSaveModal(true)}
            className={`inline-flex items-center px-4 py-2 rounded-md transition-colors ${
              isResourceSaved(resource.id)
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            <Bookmark className={`w-4 h-4 mr-2 ${isResourceSaved(resource.id) ? 'fill-current' : ''}`} />
            {isResourceSaved(resource.id) ? 'Saved' : 'Save'}
          </button>
        </div>

        {/* Metrics */}
        <div className="flex items-center space-x-8 mt-6 pt-6 border-t border-border">
          <div className="flex items-center space-x-2">
            <Quote className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{resource.citationCount}</span> citations
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Download className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{resource.downloadCount.toLocaleString()}</span> downloads
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {tab.label}
              {tab.count !== null && tab.count > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Abstract */}
            {resource.abstract && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Abstract</h2>
                <div className="bg-secondary/20 rounded-lg p-6">
                  <p className="text-foreground leading-relaxed">{resource.abstract}</p>
                </div>
              </section>
            )}

            {/* Keywords */}
            {resource.keywords && resource.keywords.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {resource.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {keyword}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Affiliations */}
            {resource.affiliations && resource.affiliations.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Author Affiliations</h2>
                <ul className="space-y-2">
                  {resource.affiliations.map((affiliation, index) => (
                    <li key={index} className="flex items-center space-x-2 text-foreground">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{affiliation}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Subject Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Subject Areas</h2>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'references' && (
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-6">References</h2>
            {resource.references && resource.references.length > 0 ? (
              <div className="space-y-4">
                {resource.references.map((reference, index) => (
                  <div key={index} className="bg-secondary/10 rounded-lg p-4 border-l-4 border-primary">
                    <p className="text-sm text-foreground">{reference}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No references available for this resource.</p>
            )}
          </section>
        )}

        {activeTab === 'related' && (
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-6">Related Resources</h2>
            {resource.relatedResources && resource.relatedResources.length > 0 ? (
              <div className="space-y-4">
                {resource.relatedResources.map((related) => (
                  <div key={related.id} className="border border-border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link
                          href={getDetailHref(related.id)}
                          className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {related.title}
                        </Link>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-muted-foreground capitalize">
                            {related.type}
                          </span>
                          <span className="text-sm text-primary">
                            {related.relationship}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No related resources found.</p>
            )}
          </section>
        )}

        {activeTab === 'metrics' && (
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-6">Usage Metrics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary/10 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Quote className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-medium text-foreground">Citations</h3>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {resource.citationCount}
                </div>
                <p className="text-sm text-muted-foreground">
                  Times this work has been cited by other researchers
                </p>
              </div>
              
              <div className="bg-secondary/10 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Download className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-medium text-foreground">Downloads</h3>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {resource.downloadCount.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">
                  Total number of downloads across all platforms
                </p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Citation Box */}
      <div className="mt-12 bg-secondary/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">How to Cite</h3>
          <button
            onClick={() => handleCopy(formatCitation(), 'full-citation')}
            className="inline-flex items-center px-3 py-1 text-sm border border-border rounded-md hover:bg-secondary transition-colors"
          >
            <Copy className="w-3 h-3 mr-1" />
            {copySuccess === 'full-citation' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="bg-background rounded-md p-4 border border-border">
          <p className="text-sm text-foreground font-mono leading-relaxed">
            {formatCitation()}
          </p>
        </div>
      </div>
      
      {/* Save to Collection Modal */}
      <SaveToCollectionModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        resource={resource}
      />
    </div>
  )
}

export default SearchResultDetail