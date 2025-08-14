'use client'

import React from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { savedResourcesAtom, toggleSaveResourceAtom } from '@/atoms/collectionAtoms'
import { Bookmark, ArrowLeft } from 'lucide-react'

export default function SavedPage() {
  const [savedResources] = useAtom(savedResourcesAtom)
  const [, toggleSave] = useAtom(toggleSaveResourceAtom)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Saved Resources</h1>
          <Link href="/search" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Search
          </Link>
        </div>

        {savedResources.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-lg">
            <Bookmark className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">You haven't saved any resources yet.</p>
            <p className="text-sm text-muted-foreground">Browse and click Save on results to add them here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedResources.map((saved) => (
              <div key={saved.id} className="border border-border rounded-lg p-4 bg-background">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link href={`/detail/${saved.resourceId}`} className="text-lg font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                      {saved.resource.title}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {saved.resource.authors?.join(', ')} • {saved.resource.year} • {saved.resource.journal || saved.resource.publisher || saved.resource.type}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleSave({ resource: { id: saved.resourceId, ...saved.resource } })}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md border border-border hover:bg-secondary transition-colors"
                  >
                    <Bookmark className="w-3 h-3 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


