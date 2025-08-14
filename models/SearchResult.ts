export interface SearchResult {
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
  thumbnailUrl?: string
  tags: string[]
  downloadCount: number
  citationCount: number
}