'use client'

import React from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import SearchResultDetail from '@/components/SearchResultDetail'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { getDetailResource } from '@/services'



export default function DetailPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const resourceId = params?.resourceId as string
  const searchQuery = searchParams?.get('q') || ''

  // Find the resource by ID
  const resource = getDetailResource(resourceId)

  if (!resource) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <span>/</span>
            <Link 
              href={searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '/search'} 
              className="hover:text-primary transition-colors"
            >
              {searchQuery ? 'Search Results' : 'Search'}
            </Link>
            <span>/</span>
            <span className="text-foreground">Resource Not Found</span>
          </nav>

          {/* Error State */}
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">Resource Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The resource you're looking for doesn't exist or may have been removed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center px-4 py-2 border border-border text-foreground rounded-md hover:bg-secondary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </button>
              <Link
                href={searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '/search'}
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Search className="w-4 h-4 mr-2" />
                {searchQuery ? 'Back to Search' : 'New Search'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <span>/</span>
          <Link 
            href={searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '/search'} 
            className="hover:text-primary transition-colors"
          >
            {searchQuery ? 'Search Results' : 'Search'}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-xs">
            {resource.title}
          </span>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              if (searchQuery) {
                router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
              } else {
                router.back()
              }
            }}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {searchQuery ? 'Back to search results' : 'Back to results'}
          </button>
        </div>

        {/* Detail Component */}
        <SearchResultDetail resource={resource} currentSearchQuery={searchQuery} />
      </div>
    </div>
  )
}
