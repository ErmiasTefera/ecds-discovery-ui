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
    title: 'Blockchain Technology in Supply Chain Management',
    authors: ['Thompson, R.', 'Garcia, M.'],
    year: 2023,
    type: 'article',
    journal: 'International Journal of Operations Management'
  },
  {
    id: '8',
    title: 'Sustainable Energy Systems: Renewable Technologies',
    authors: ['O\'Connor, P.', 'Singh, A.'],
    year: 2022,
    type: 'book',
    publisher: 'Green Energy Press'
  },
  {
    id: '9',
    title: 'Mental Health Interventions in Digital Age',
    authors: ['Davis, E.', 'Wang, L.'],
    year: 2024,
    type: 'article',
    journal: 'Journal of Clinical Psychology'
  },
  {
    id: '10',
    title: 'Urban Planning and Smart Cities: Data-Driven Approaches',
    authors: ['Johnson, A.', 'Brown, K.'],
    year: 2023,
    type: 'article',
    journal: 'Urban Studies Quarterly'
  },
  {
    id: '11',
    title: 'Microbiome Research in Human Health: From Gut to Brain',
    authors: ['White, S.', 'Chen, H.'],
    year: 2022,
    type: 'book',
    publisher: 'Medical Science Publishers'
  },
  {
    id: '12',
    title: 'Cybersecurity in Critical Infrastructure',
    authors: ['Taylor, R.', 'Gonzalez, P.'],
    year: 2024,
    type: 'thesis'
  },
  {
    id: '13',
    title: 'Economic Impact of Remote Work: Productivity and Well-being',
    authors: ['Wilson, K.', 'Martinez, D.'],
    year: 2023,
    type: 'article',
    journal: 'Journal of Organizational Behavior'
  },
  {
    id: '14',
    title: 'Advanced Materials for Energy Storage',
    authors: ['Kim, Y.', 'Zhang, W.'],
    year: 2022,
    type: 'article',
    journal: 'Materials Science and Engineering'
  },
  {
    id: '15',
    title: 'Digital Transformation in Healthcare: Telemedicine and AI',
    authors: ['Patel, A.', 'Garcia, R.'],
    year: 2024,
    type: 'article',
    journal: 'Healthcare Technology Review'
  },
  {
    id: '16',
    title: 'Social Media and Political Polarization',
    authors: ['Brown, C.', 'Johnson, E.'],
    year: 2023,
    type: 'article',
    journal: 'Political Communication Studies'
  },
  {
    id: '17',
    title: 'Robotics in Manufacturing: Industry 4.0',
    authors: ['Miller, G.', 'Anderson, P.'],
    year: 2022,
    type: 'book',
    publisher: 'Industrial Technology Press'
  },
  {
    id: '18',
    title: 'Environmental Economics: Carbon Pricing Solutions',
    authors: ['Rodriguez, S.', 'Wang, T.'],
    year: 2024,
    type: 'article',
    journal: 'Environmental Economics Quarterly'
  },
  {
    id: '19',
    title: 'Neuroscience of Learning: Cognitive Enhancement',
    authors: ['Lee, V.', 'Gonzalez, W.'],
    year: 2023,
    type: 'article',
    journal: 'Educational Neuroscience'
  },
  {
    id: '20',
    title: 'Space Exploration Technologies: Mars Mission Planning',
    authors: ['White, Z.', 'Chen, A.'],
    year: 2022,
    type: 'article',
    journal: 'Space Science and Technology'
  },
  {
    id: '21',
    title: 'Financial Technology and Digital Banking',
    authors: ['Taylor, C.', 'Johnson, D.'],
    year: 2024,
    type: 'book',
    publisher: 'Financial Technology Press'
  },
  {
    id: '22',
    title: 'Biodiversity Conservation in Urban Environments',
    authors: ['Anderson, F.', 'Wang, G.'],
    year: 2023,
    type: 'article',
    journal: 'Urban Ecology and Conservation'
  },
  {
    id: '23',
    title: 'Quantum Machine Learning: Drug Discovery Applications',
    authors: ['Kim, I.', 'Garcia, J.'],
    year: 2024,
    type: 'thesis'
  },
  {
    id: '24',
    title: 'Social Psychology of Online Communities',
    authors: ['Miller, L.', 'Rodriguez, M.'],
    year: 2023,
    type: 'article',
    journal: 'Social Psychology Quarterly'
  },
  {
    id: '25',
    title: 'Advanced Manufacturing Processes: 3D Printing',
    authors: ['Thompson, O.', 'Chen, P.'],
    year: 2022,
    type: 'article',
    journal: 'Manufacturing Technology Review'
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