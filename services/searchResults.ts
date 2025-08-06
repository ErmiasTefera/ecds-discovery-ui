import type { SearchResult } from '@/models'

// Extended mock data for search results
export const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Machine Learning Applications in Healthcare: A Comprehensive Review',
    authors: ['Smith, J.', 'Johnson, M.', 'Chen, L.'],
    year: 2023,
    type: 'article',
    journal: 'Journal of Medical AI',
    description: 'This comprehensive review examines the latest developments in machine learning applications within healthcare, covering diagnostic imaging, predictive analytics, and personalized treatment approaches.',
    doi: '10.1234/jmai.2023.001',
    url: 'https://example.com/paper1',
    tags: ['machine learning', 'healthcare', 'AI', 'medical imaging'],
    downloadCount: 1247,
    citationCount: 89
  },
  {
    id: '2',
    title: 'Deep Learning for Computer Vision: Theory and Practice',
    authors: ['Chen, L.', 'Williams, R.'],
    year: 2022,
    type: 'book',
    publisher: 'Academic Press',
    description: 'A comprehensive guide to deep learning techniques in computer vision, covering convolutional neural networks, object detection, and image segmentation with practical implementations.',
    url: 'https://example.com/book1',
    tags: ['deep learning', 'computer vision', 'neural networks', 'CNN'],
    downloadCount: 2341,
    citationCount: 156
  },
  {
    id: '3',
    title: 'Climate Change Impact on Global Food Security: A Multi-Regional Analysis',
    authors: ['Anderson, K.', 'Rodriguez, M.'],
    year: 2023,
    type: 'article',
    journal: 'Environmental Science Today',
    description: 'An extensive analysis of how climate change affects food security across different global regions, with implications for policy and agricultural adaptation strategies.',
    doi: '10.1234/est.2023.045',
    url: 'https://example.com/paper3',
    tags: ['climate change', 'food security', 'agriculture', 'policy'],
    downloadCount: 892,
    citationCount: 67
  },
  {
    id: '4',
    title: 'Quantum Computing Algorithms for Optimization Problems',
    authors: ['Zhang, Y.', 'Brown, A.', 'Davis, P.'],
    year: 2024,
    type: 'thesis',
    description: 'This doctoral thesis explores novel quantum computing algorithms designed to solve complex optimization problems, with applications in logistics and financial modeling.',
    url: 'https://example.com/thesis1',
    tags: ['quantum computing', 'optimization', 'algorithms', 'QAOA'],
    downloadCount: 543,
    citationCount: 23
  },
  {
    id: '5',
    title: 'Artificial Intelligence Ethics in Modern Society',
    authors: ['Wilson, S.', 'Taylor, J.'],
    year: 2023,
    type: 'book',
    publisher: 'Ethics Publications',
    description: 'Exploring the ethical implications of artificial intelligence deployment in society, covering bias, privacy, accountability, and the future of human-AI interaction.',
    url: 'https://example.com/book2',
    tags: ['AI ethics', 'society', 'bias', 'privacy', 'accountability'],
    downloadCount: 1789,
    citationCount: 134
  },
  {
    id: '6',
    title: 'Neural Networks for Natural Language Processing: Recent Advances',
    authors: ['Martinez, C.', 'Lee, H.', 'Patel, R.'],
    year: 2022,
    type: 'article',
    journal: 'Computational Linguistics Review',
    description: 'A survey of recent advances in neural network architectures for natural language processing, including transformers, BERT, and GPT models.',
    doi: '10.1234/clr.2022.078',
    url: 'https://example.com/paper6',
    tags: ['NLP', 'neural networks', 'transformers', 'BERT', 'GPT'],
    downloadCount: 2156,
    citationCount: 198
  }
]

export type SortOption = 'relevance' | 'date' | 'citations' | 'downloads'
export type SortDirection = 'asc' | 'desc'

export const searchResources = (query: string): SearchResult[] => {
  if (!query.trim()) return mockSearchResults

  const searchTerm = query.toLowerCase()
  return mockSearchResults.filter(result =>
    result.title.toLowerCase().includes(searchTerm) ||
    result.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
    result.description.toLowerCase().includes(searchTerm) ||
    result.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    result.journal?.toLowerCase().includes(searchTerm) ||
    result.publisher?.toLowerCase().includes(searchTerm)
  )
}

export const sortSearchResults = (
  results: SearchResult[], 
  sortBy: SortOption, 
  direction: SortDirection,
  query?: string
): SearchResult[] => {
  const sorted = [...results].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'date':
        comparison = a.year - b.year
        break
      case 'citations':
        comparison = a.citationCount - b.citationCount
        break
      case 'downloads':
        comparison = a.downloadCount - b.downloadCount
        break
      case 'relevance':
      default:
        // Simple relevance scoring based on title match
        if (query) {
          const aScore = a.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
          const bScore = b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
          comparison = aScore - bScore
        } else {
          comparison = 0
        }
        break
    }

    return direction === 'asc' ? comparison : -comparison
  })

  return sorted
}