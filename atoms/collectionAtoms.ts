import { atom } from 'jotai'
import type { Collection, SavedResource } from '@/models'

export interface CollectionState {
  collections: Collection[]
  savedResources: SavedResource[]
  isLoading: boolean
  error: string | null
  selectedCollectionId: string | null
}

// Collection state atom
export const collectionStateAtom = atom<CollectionState>({
  collections: [],
  savedResources: [],
  isLoading: false,
  error: null,
  selectedCollectionId: null
})

// Individual collection atoms for easier access
export const collectionsAtom = atom(
  (get) => get(collectionStateAtom).collections,
  (get, set, collections: Collection[]) => {
    const currentState = get(collectionStateAtom)
    set(collectionStateAtom, {
      ...currentState,
      collections
    })
  }
)

export const savedResourcesAtom = atom(
  (get) => get(collectionStateAtom).savedResources,
  (get, set, savedResources: SavedResource[]) => {
    const currentState = get(collectionStateAtom)
    set(collectionStateAtom, {
      ...currentState,
      savedResources
    })
  }
)

export const collectionLoadingAtom = atom(
  (get) => get(collectionStateAtom).isLoading,
  (get, set, isLoading: boolean) => {
    const currentState = get(collectionStateAtom)
    set(collectionStateAtom, {
      ...currentState,
      isLoading
    })
  }
)

export const collectionErrorAtom = atom(
  (get) => get(collectionStateAtom).error,
  (get, set, error: string | null) => {
    const currentState = get(collectionStateAtom)
    set(collectionStateAtom, {
      ...currentState,
      error
    })
  }
)

export const selectedCollectionIdAtom = atom(
  (get) => get(collectionStateAtom).selectedCollectionId,
  (get, set, selectedCollectionId: string | null) => {
    const currentState = get(collectionStateAtom)
    set(collectionStateAtom, {
      ...currentState,
      selectedCollectionId
    })
  }
)

// Helper atoms for collection operations
export const createCollectionAtom = atom(
  null,
  async (get, set, collectionData: { name: string; description?: string; isPublic: boolean }) => {
    set(collectionLoadingAtom, true)
    set(collectionErrorAtom, null)
    
    try {
      // This will be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock collection creation
      const newCollection: Collection = {
        id: `collection-${Date.now()}`,
        name: collectionData.name,
        description: collectionData.description,
        isPublic: collectionData.isPublic,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        resourceCount: 0,
        userId: '1' // Mock user ID
      }
      
      const currentCollections = get(collectionsAtom)
      set(collectionsAtom, [...currentCollections, newCollection])
      
      return newCollection
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create collection'
      set(collectionErrorAtom, errorMessage)
      throw new Error(errorMessage)
    } finally {
      set(collectionLoadingAtom, false)
    }
  }
)

export const saveResourceAtom = atom(
  null,
  async (get, set, saveData: { resourceId: string; collectionId: string; resource: any }) => {
    set(collectionLoadingAtom, true)
    set(collectionErrorAtom, null)
    
    try {
      // This will be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock saved resource
      const savedResource: SavedResource = {
        id: `saved-${Date.now()}`,
        resourceId: saveData.resourceId,
        collectionId: saveData.collectionId,
        savedAt: new Date().toISOString(),
        userId: '1', // Mock user ID
        resource: {
          id: saveData.resource.id,
          title: saveData.resource.title,
          authors: saveData.resource.authors,
          type: saveData.resource.type,
          year: saveData.resource.year,
          journal: saveData.resource.journal,
          publisher: saveData.resource.publisher
        }
      }
      
      const currentSavedResources = get(savedResourcesAtom)
      set(savedResourcesAtom, [...currentSavedResources, savedResource])
      
      // Update collection resource count
      const currentCollections = get(collectionsAtom)
      const updatedCollections = currentCollections.map(collection => 
        collection.id === saveData.collectionId 
          ? { ...collection, resourceCount: collection.resourceCount + 1, updatedAt: new Date().toISOString() }
          : collection
      )
      set(collectionsAtom, updatedCollections)
      
      return savedResource
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save resource'
      set(collectionErrorAtom, errorMessage)
      throw new Error(errorMessage)
    } finally {
      set(collectionLoadingAtom, false)
    }
  }
)

export const loadCollectionsAtom = atom(
  null,
  async (get, set) => {
    set(collectionLoadingAtom, true)
    set(collectionErrorAtom, null)
    
    try {
      // This will be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock collections data
      const mockCollections: Collection[] = [
        {
          id: 'collection-1',
          name: 'Research Papers',
          description: 'Important research papers for my thesis',
          isPublic: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date().toISOString(),
          resourceCount: 5,
          userId: '1'
        },
        {
          id: 'collection-2',
          name: 'Machine Learning',
          description: 'Papers and resources about ML',
          isPublic: true,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date().toISOString(),
          resourceCount: 12,
          userId: '1'
        }
      ]
      
      set(collectionsAtom, mockCollections)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load collections'
      set(collectionErrorAtom, errorMessage)
    } finally {
      set(collectionLoadingAtom, false)
    }
  }
)

// Check if a resource is already saved
export const isResourceSavedAtom = atom(
  (get) => (resourceId: string) => {
    const savedResources = get(savedResourcesAtom)
    return savedResources.some(saved => saved.resourceId === resourceId)
  }
)

// Toggle save/unsave a resource (in-memory mock)
export const toggleSaveResourceAtom = atom(
  null,
  async (get, set, payload: { resource: any }) => {
    const saved = get(savedResourcesAtom)
    const existing = saved.find(s => s.resourceId === payload.resource.id)
    if (existing) {
      // Unsave
      set(savedResourcesAtom, saved.filter(s => s.resourceId !== payload.resource.id))
      return { saved: false }
    }
    // Save to a default collection (first or create a temp one)
    const collections = get(collectionsAtom)
    const targetCollection = collections[0] || {
      id: 'collection-quick',
      name: 'Saved',
      description: 'Quick saved resources',
      isPublic: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      resourceCount: 0,
      userId: '1'
    }
    if (!collections[0]) {
      set(collectionsAtom, [targetCollection])
    }
    const newSaved: SavedResource = {
      id: `saved-${Date.now()}`,
      resourceId: payload.resource.id,
      collectionId: targetCollection.id,
      savedAt: new Date().toISOString(),
      userId: '1',
      resource: {
        id: payload.resource.id,
        title: payload.resource.title,
        authors: payload.resource.authors || [],
        type: payload.resource.type,
        year: payload.resource.year,
        journal: payload.resource.journal,
        publisher: payload.resource.publisher,
      }
    }
    set(savedResourcesAtom, [...saved, newSaved])
    return { saved: true }
  }
)
