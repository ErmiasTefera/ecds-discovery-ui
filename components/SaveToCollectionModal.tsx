'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { X, Plus, Folder, Check, Loader2 } from 'lucide-react'
import { 
  collectionsAtom, 
  createCollectionAtom, 
  saveResourceAtom, 
  collectionLoadingAtom,
  collectionErrorAtom,
  loadCollectionsAtom
} from '@/atoms/collectionAtoms'
import { isAuthenticatedAtom } from '@/atoms/authAtoms'
import type { SearchResult, DetailResource } from '@/models'

interface SaveToCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  resource: SearchResult | DetailResource
}

const SaveToCollectionModal: React.FC<SaveToCollectionModalProps> = ({ 
  isOpen, 
  onClose, 
  resource 
}) => {
  const router = useRouter()
  const [isAuthenticated] = useAtom(isAuthenticatedAtom)
  const [collections] = useAtom(collectionsAtom)
  const [isLoading] = useAtom(collectionLoadingAtom)
  const [error] = useAtom(collectionErrorAtom)
  const [, loadCollections] = useAtom(loadCollectionsAtom)
  const [, createCollection] = useAtom(createCollectionAtom)
  const [, saveResource] = useAtom(saveResourceAtom)
  
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState('')
  const [newCollectionDescription, setNewCollectionDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadCollections()
    }
  }, [isOpen, isAuthenticated, loadCollections])

  useEffect(() => {
    if (collections.length > 0 && !selectedCollectionId) {
      setSelectedCollectionId(collections[0].id)
    }
  }, [collections, selectedCollectionId])

  const handleSave = async () => {
    if (!isAuthenticated) {
      router.push('/auth/sign-in')
      return
    }

    if (!selectedCollectionId) {
      return
    }

    setIsSaving(true)
    try {
      await saveResource({
        resourceId: resource.id,
        collectionId: selectedCollectionId,
        resource: {
          id: resource.id,
          title: resource.title,
          authors: resource.authors,
          type: resource.type,
          year: resource.year,
          journal: 'journal' in resource ? resource.journal : undefined,
          publisher: 'publisher' in resource ? resource.publisher : undefined
        }
      })
      onClose()
    } catch (error) {
      console.error('Failed to save resource:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) return

    try {
      const newCollection = await createCollection({
        name: newCollectionName.trim(),
        description: newCollectionDescription.trim() || undefined,
        isPublic
      })
      setSelectedCollectionId(newCollection.id)
      setShowCreateForm(false)
      setNewCollectionName('')
      setNewCollectionDescription('')
      setIsPublic(false)
    } catch (error) {
      console.error('Failed to create collection:', error)
    }
  }

  if (!isOpen) return null

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-background rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Sign In Required
            </h2>
            <p className="text-muted-foreground mb-6">
              You need to sign in to save resources to collections.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/auth/sign-in')}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onClose}
                className="flex-1 border border-border px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Save to Collection
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resource Preview */}
        <div className="bg-secondary/20 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-foreground mb-2 line-clamp-2">
            {resource.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {resource.authors.join(', ')} • {resource.year}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {!showCreateForm ? (
              <>
                {/* Collection Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Choose Collection
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {collections.map((collection) => (
                      <button
                        key={collection.id}
                        onClick={() => setSelectedCollectionId(collection.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          selectedCollectionId === collection.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:bg-secondary/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Folder className="w-4 h-4 text-muted-foreground" />
                          <div className="text-left">
                            <p className="font-medium text-foreground">{collection.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {collection.resourceCount} resources
                            </p>
                          </div>
                        </div>
                        {selectedCollectionId === collection.id && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Create New Collection Button */}
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full flex items-center justify-center space-x-2 p-3 border border-dashed border-border rounded-lg hover:bg-secondary/50 transition-colors mb-6"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Collection</span>
                </button>
              </>
            ) : (
              <>
                {/* Create Collection Form */}
                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-4">Create New Collection</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Collection Name *
                      </label>
                      <input
                        type="text"
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter collection name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Description
                      </label>
                      <textarea
                        value={newCollectionDescription}
                        onChange={(e) => setNewCollectionDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Optional description"
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isPublic"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="rounded border-border"
                      />
                      <label htmlFor="isPublic" className="text-sm text-foreground">
                        Make collection public
                      </label>
                    </div>
                  </div>
                </div>

                {/* Back to Selection Button */}
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="w-full p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors mb-6"
                >
                  Back to Collections
                </button>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 p-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={showCreateForm ? handleCreateCollection : handleSave}
                disabled={isSaving || (showCreateForm ? !newCollectionName.trim() : !selectedCollectionId)}
                className="flex-1 bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : showCreateForm ? (
                  'Create & Save'
                ) : (
                  'Save to Collection'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SaveToCollectionModal
