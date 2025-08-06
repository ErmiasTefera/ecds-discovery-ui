export interface MockResult {
  id: string
  title: string
  authors: string[]
  year: number
  type: 'article' | 'book' | 'thesis'
  journal?: string
  publisher?: string
}

// Mock data for search suggestions
export const mockSuggestionsDatabase: MockResult[] = [
  {
    id: '1',
    title: 'Machine Learning Applications in Healthcare: A Comprehensive Review',
    authors: ['Smith, J.', 'Johnson, M.'],
    year: 2023,
    type: 'article',
    journal: 'Journal of Medical AI'
  },
  {
    id: '2',
    title: 'Deep Learning for Computer Vision: Theory and Practice',
    authors: ['Chen, L.', 'Williams, R.'],
    year: 2022,
    type: 'book',
    publisher: 'Academic Press'
  },
  {
    id: '3',
    title: 'Climate Change Impact on Global Food Security',
    authors: ['Anderson, K.'],
    year: 2023,
    type: 'article',
    journal: 'Environmental Science Today'
  },
  {
    id: '4',
    title: 'Quantum Computing Algorithms for Optimization Problems',
    authors: ['Zhang, Y.', 'Brown, A.', 'Davis, P.'],
    year: 2024,
    type: 'thesis'
  },
  {
    id: '5',
    title: 'Artificial Intelligence Ethics in Modern Society',
    authors: ['Wilson, S.'],
    year: 2023,
    type: 'book',
    publisher: 'Ethics Publications'
  },
  {
    id: '6',
    title: 'Neural Networks for Natural Language Processing',
    authors: ['Martinez, C.', 'Lee, H.'],
    year: 2022,
    type: 'article',
    journal: 'Computational Linguistics Review'
  },
  {
    id: '7',
    title: 'Sustainable Energy Solutions for Urban Development',
    authors: ['Thompson, R.'],
    year: 2023,
    type: 'thesis'
  },
  {
    id: '8',
    title: 'Blockchain Technology in Financial Services',
    authors: ['Garcia, M.', 'Ahmed, N.'],
    year: 2024,
    type: 'article',
    journal: 'Financial Technology Quarterly'
  }
]

export const getSearchSuggestions = (query: string, limit: number = 5): MockResult[] => {
  if (!query.trim()) return []

  const searchTerm = query.toLowerCase()
  return mockSuggestionsDatabase
    .filter(result =>
      result.title.toLowerCase().includes(searchTerm) ||
      result.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
      result.journal?.toLowerCase().includes(searchTerm) ||
      result.publisher?.toLowerCase().includes(searchTerm)
    )
    .slice(0, limit)
}