export interface DetailResource {
  id: string
  title: string
  authors: string[]
  year: number
  type: 'article' | 'book' | 'thesis'
  journal?: string
  publisher?: string
  description: string
  doi?: string
  url?: string
  tags: string[]
  downloadCount: number
  citationCount: number
  abstract?: string
  keywords?: string[]
  pages?: string
  volume?: string
  issue?: string
  isbn?: string
  language?: string
  publicationDate?: string
  affiliations?: string[]
  references?: string[]
  relatedResources?: Array<{
    id: string
    title: string
    type: string
    relationship: string
  }>
}