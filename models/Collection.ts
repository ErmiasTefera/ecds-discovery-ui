export interface Collection {
  id: string
  name: string
  description?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
  resourceCount: number
  userId: string
}

export interface SavedResource {
  id: string
  resourceId: string
  collectionId: string
  savedAt: string
  userId: string
  resource: {
    id: string
    title: string
    authors: string[]
    type: string
    year: number
    journal?: string
    publisher?: string
  }
}

export interface CreateCollectionRequest {
  name: string
  description?: string
  isPublic: boolean
}

export interface SaveResourceRequest {
  resourceId: string
  collectionId: string
}

export interface CollectionResponse {
  success: boolean
  data: Collection | Collection[] | SavedResource
  message?: string
  timestamp: string
  requestId: string
}
