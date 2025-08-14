'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import SearchResultDetail from '@/components/SearchResultDetail'
import { ArrowLeft, Home, Search, Loader2 } from 'lucide-react'
import { getDetailResource } from '@/services'
import type { DetailResource } from '@/models'



export default function DetailPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const resourceId = params?.resourceId as string
  const searchQuery = searchParams?.get('q') || ''
  const facets = searchParams?.get('facets') || ''
  const criteria = searchParams?.get('criteria') || ''
  const filters = searchParams?.get('filters') || ''

  const searchHref = (() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (facets) params.set('facets', facets)
    if (criteria) params.set('criteria', criteria)
    if (filters) params.set('filters', filters)
    const qs = params.toString()
    return `/search${qs ? `?${qs}` : ''}`
  })()

  // State for resource and loading
  const [resource, setResource] = useState<DetailResource | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Fetch resource data
  useEffect(() => {
    const fetchResource = async () => {
      if (!resourceId) {
        setError(true)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(false)
      
      try {
        const resourceData = await getDetailResource(resourceId)
        setResource(resourceData)
      } catch (err) {
        console.error('Error fetching resource:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchResource()
  }, [resourceId])

  if (loading) {
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
              href={searchHref} 
              className="hover:text-primary transition-colors"
            >
              {searchQuery ? 'Search Results' : 'Search'}
            </Link>
            <span>/</span>
            <span className="text-foreground">Loading...</span>
          </nav>

          {/* Loading State */}
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <h1 className="text-2xl font-bold text-foreground mb-4">Loading Resource...</h1>
            <p className="text-muted-foreground">
              Please wait while we fetch the resource details.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !resource) {
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
              The resource you&apos;re looking for doesn&apos;t exist or may have been removed.
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
                href={searchHref} 
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
            href={searchHref} 
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
              if (searchQuery || facets || criteria || filters) {
                router.push(searchHref)
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
