import type { SearchResult } from '@/models'
import { httpService, type SearchParams, type ApiResponse } from './httpService'

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
  },
  {
    id: '7',
    title: 'Blockchain Technology in Supply Chain Management: A Systematic Review',
    authors: ['Thompson, R.', 'Garcia, M.', 'Kim, S.'],
    year: 2023,
    type: 'article',
    journal: 'International Journal of Operations Management',
    description: 'A systematic review of blockchain applications in supply chain management, analyzing transparency, traceability, and efficiency improvements across various industries.',
    doi: '10.1234/ijom.2023.012',
    url: 'https://example.com/paper7',
    tags: ['blockchain', 'supply chain', 'transparency', 'traceability'],
    downloadCount: 1567,
    citationCount: 78
  },
  {
    id: '8',
    title: 'Sustainable Energy Systems: Renewable Technologies and Policy Frameworks',
    authors: ['O\'Connor, P.', 'Singh, A.'],
    year: 2022,
    type: 'book',
    publisher: 'Green Energy Press',
    description: 'Comprehensive analysis of renewable energy technologies, policy frameworks, and economic considerations for sustainable energy transition.',
    url: 'https://example.com/book3',
    tags: ['renewable energy', 'sustainability', 'policy', 'green technology'],
    downloadCount: 2987,
    citationCount: 203
  },
  {
    id: '9',
    title: 'Mental Health Interventions in Digital Age: Efficacy of Online Therapy Platforms',
    authors: ['Davis, E.', 'Wang, L.', 'Rodriguez, C.'],
    year: 2024,
    type: 'article',
    journal: 'Journal of Clinical Psychology',
    description: 'Meta-analysis of online therapy platform efficacy, comparing traditional face-to-face interventions with digital mental health solutions.',
    doi: '10.1234/jcp.2024.034',
    url: 'https://example.com/paper9',
    tags: ['mental health', 'digital therapy', 'online platforms', 'psychology'],
    downloadCount: 2341,
    citationCount: 145
  },
  {
    id: '10',
    title: 'Urban Planning and Smart Cities: Data-Driven Approaches to Urban Development',
    authors: ['Johnson, A.', 'Brown, K.', 'Miller, T.'],
    year: 2023,
    type: 'article',
    journal: 'Urban Studies Quarterly',
    description: 'Examination of data-driven urban planning approaches, IoT integration, and smart city infrastructure development strategies.',
    doi: '10.1234/usq.2023.067',
    url: 'https://example.com/paper10',
    tags: ['urban planning', 'smart cities', 'IoT', 'data-driven'],
    downloadCount: 1892,
    citationCount: 112
  },
  {
    id: '11',
    title: 'Microbiome Research in Human Health: From Gut to Brain',
    authors: ['White, S.', 'Chen, H.', 'Anderson, M.'],
    year: 2022,
    type: 'book',
    publisher: 'Medical Science Publishers',
    description: 'Comprehensive exploration of the human microbiome, its role in health and disease, and therapeutic applications.',
    url: 'https://example.com/book4',
    tags: ['microbiome', 'human health', 'gut-brain axis', 'therapeutics'],
    downloadCount: 3456,
    citationCount: 267
  },
  {
    id: '12',
    title: 'Cybersecurity in Critical Infrastructure: Threat Assessment and Defense Strategies',
    authors: ['Taylor, R.', 'Gonzalez, P.', 'Lee, J.'],
    year: 2024,
    type: 'thesis',
    description: 'Comprehensive analysis of cybersecurity threats to critical infrastructure and development of advanced defense mechanisms.',
    url: 'https://example.com/thesis2',
    tags: ['cybersecurity', 'critical infrastructure', 'threat assessment', 'defense'],
    downloadCount: 987,
    citationCount: 45
  },
  {
    id: '13',
    title: 'Economic Impact of Remote Work: Productivity, Well-being, and Organizational Change',
    authors: ['Wilson, K.', 'Martinez, D.', 'Thompson, L.'],
    year: 2023,
    type: 'article',
    journal: 'Journal of Organizational Behavior',
    description: 'Analysis of remote work adoption, its economic implications, productivity outcomes, and organizational transformation patterns.',
    doi: '10.1234/job.2023.089',
    url: 'https://example.com/paper13',
    tags: ['remote work', 'productivity', 'organizational behavior', 'economics'],
    downloadCount: 2765,
    citationCount: 189
  },
  {
    id: '14',
    title: 'Advanced Materials for Energy Storage: Next-Generation Battery Technologies',
    authors: ['Kim, Y.', 'Zhang, W.', 'O\'Brien, S.'],
    year: 2022,
    type: 'article',
    journal: 'Materials Science and Engineering',
    description: 'Review of advanced materials for energy storage applications, focusing on lithium-ion alternatives and solid-state batteries.',
    doi: '10.1234/mse.2022.156',
    url: 'https://example.com/paper14',
    tags: ['energy storage', 'battery technology', 'materials science', 'lithium-ion'],
    downloadCount: 3124,
    citationCount: 234
  },
  {
    id: '15',
    title: 'Digital Transformation in Healthcare: Telemedicine and AI Integration',
    authors: ['Patel, A.', 'Garcia, R.', 'White, M.'],
    year: 2024,
    type: 'article',
    journal: 'Healthcare Technology Review',
    description: 'Comprehensive analysis of digital transformation in healthcare, including telemedicine adoption and AI integration strategies.',
    doi: '10.1234/htr.2024.023',
    url: 'https://example.com/paper15',
    tags: ['digital health', 'telemedicine', 'AI integration', 'healthcare'],
    downloadCount: 1987,
    citationCount: 156
  },
  {
    id: '16',
    title: 'Social Media and Political Polarization: Algorithmic Influence on Public Discourse',
    authors: ['Brown, C.', 'Johnson, E.', 'Davis, F.'],
    year: 2023,
    type: 'article',
    journal: 'Political Communication Studies',
    description: 'Investigation of social media algorithms and their role in political polarization, echo chambers, and democratic discourse.',
    doi: '10.1234/pcs.2023.078',
    url: 'https://example.com/paper16',
    tags: ['social media', 'political polarization', 'algorithms', 'democracy'],
    downloadCount: 3421,
    citationCount: 298
  },
  {
    id: '17',
    title: 'Robotics in Manufacturing: Industry 4.0 and Automation Technologies',
    authors: ['Miller, G.', 'Anderson, P.', 'Taylor, Q.'],
    year: 2022,
    type: 'book',
    publisher: 'Industrial Technology Press',
    description: 'Comprehensive guide to robotics integration in manufacturing, covering Industry 4.0 principles and automation strategies.',
    url: 'https://example.com/book5',
    tags: ['robotics', 'manufacturing', 'Industry 4.0', 'automation'],
    downloadCount: 2234,
    citationCount: 167
  },
  {
    id: '18',
    title: 'Environmental Economics: Carbon Pricing and Market-Based Solutions',
    authors: ['Rodriguez, S.', 'Wang, T.', 'Kim, U.'],
    year: 2024,
    type: 'article',
    journal: 'Environmental Economics Quarterly',
    description: 'Analysis of carbon pricing mechanisms, market-based environmental solutions, and economic incentives for sustainability.',
    doi: '10.1234/eeq.2024.045',
    url: 'https://example.com/paper18',
    tags: ['environmental economics', 'carbon pricing', 'market solutions', 'sustainability'],
    downloadCount: 1654,
    citationCount: 98
  },
  {
    id: '19',
    title: 'Neuroscience of Learning: Cognitive Enhancement and Educational Applications',
    authors: ['Lee, V.', 'Gonzalez, W.', 'Thompson, X.'],
    year: 2023,
    type: 'article',
    journal: 'Educational Neuroscience',
    description: 'Exploration of neuroscience principles in learning, cognitive enhancement techniques, and educational technology applications.',
    doi: '10.1234/en.2023.112',
    url: 'https://example.com/paper19',
    tags: ['neuroscience', 'learning', 'cognitive enhancement', 'education'],
    downloadCount: 2876,
    citationCount: 223
  },
  {
    id: '20',
    title: 'Space Exploration Technologies: Mars Mission Planning and Interplanetary Travel',
    authors: ['White, Z.', 'Chen, A.', 'Martinez, B.'],
    year: 2022,
    type: 'article',
    journal: 'Space Science and Technology',
    description: 'Comprehensive analysis of space exploration technologies, Mars mission planning, and interplanetary travel challenges.',
    doi: '10.1234/sst.2022.189',
    url: 'https://example.com/paper20',
    tags: ['space exploration', 'Mars missions', 'interplanetary travel', 'space technology'],
    downloadCount: 3987,
    citationCount: 345
  },
  {
    id: '21',
    title: 'Financial Technology and Digital Banking: Disruption and Innovation',
    authors: ['Taylor, C.', 'Johnson, D.', 'Brown, E.'],
    year: 2024,
    type: 'book',
    publisher: 'Financial Technology Press',
    description: 'Analysis of fintech disruption in traditional banking, digital payment systems, and financial innovation trends.',
    url: 'https://example.com/book6',
    tags: ['fintech', 'digital banking', 'financial innovation', 'payments'],
    downloadCount: 2567,
    citationCount: 189
  },
  {
    id: '22',
    title: 'Biodiversity Conservation in Urban Environments: Green Infrastructure and Wildlife Corridors',
    authors: ['Anderson, F.', 'Wang, G.', 'Patel, H.'],
    year: 2023,
    type: 'article',
    journal: 'Urban Ecology and Conservation',
    description: 'Study of biodiversity conservation strategies in urban environments, including green infrastructure and wildlife corridor design.',
    doi: '10.1234/uec.2023.234',
    url: 'https://example.com/paper22',
    tags: ['biodiversity', 'urban conservation', 'green infrastructure', 'wildlife'],
    downloadCount: 1432,
    citationCount: 87
  },
  {
    id: '23',
    title: 'Quantum Machine Learning: Algorithms and Applications in Drug Discovery',
    authors: ['Kim, I.', 'Garcia, J.', 'White, K.'],
    year: 2024,
    type: 'thesis',
    description: 'Development of quantum machine learning algorithms for drug discovery, molecular modeling, and pharmaceutical applications.',
    url: 'https://example.com/thesis3',
    tags: ['quantum ML', 'drug discovery', 'molecular modeling', 'pharmaceuticals'],
    downloadCount: 1234,
    citationCount: 67
  },
  {
    id: '24',
    title: 'Social Psychology of Online Communities: Identity, Belonging, and Digital Relationships',
    authors: ['Miller, L.', 'Rodriguez, M.', 'Lee, N.'],
    year: 2023,
    type: 'article',
    journal: 'Social Psychology Quarterly',
    description: 'Investigation of social psychology principles in online communities, digital identity formation, and virtual relationship dynamics.',
    doi: '10.1234/spq.2023.156',
    url: 'https://example.com/paper24',
    tags: ['social psychology', 'online communities', 'digital identity', 'relationships'],
    downloadCount: 2987,
    citationCount: 234
  },
  {
    id: '25',
    title: 'Advanced Manufacturing Processes: 3D Printing and Additive Manufacturing',
    authors: ['Thompson, O.', 'Chen, P.', 'Taylor, Q.'],
    year: 2022,
    type: 'article',
    journal: 'Manufacturing Technology Review',
    description: 'Comprehensive review of advanced manufacturing processes, focusing on 3D printing technologies and additive manufacturing applications.',
    doi: '10.1234/mtr.2022.278',
    url: 'https://example.com/paper25',
    tags: ['3D printing', 'additive manufacturing', 'advanced processes', 'manufacturing'],
    downloadCount: 3456,
    citationCount: 289
  }
]

export type SortOption = 'relevance' | 'popularity' | 'recent' | 'oldest' | 'title-asc' | 'title-desc'
export type SortDirection = 'asc' | 'desc'

export const searchResources = async (query: string): Promise<SearchResult[]> => {
  try {
    const params: SearchParams = { query: query.trim() }
    
    // Filter mock data based on query
    let filteredResults = mockSearchResults
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      filteredResults = mockSearchResults.filter(result =>
        result.title.toLowerCase().includes(searchTerm) ||
        result.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
        result.description.toLowerCase().includes(searchTerm) ||
        result.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        result.journal?.toLowerCase().includes(searchTerm) ||
        result.publisher?.toLowerCase().includes(searchTerm)
      )
    }

    const response: ApiResponse<SearchResult[]> = await httpService.searchResources(params, filteredResults)
    return response.data
  } catch (error) {
    console.error('Error searching resources:', error)
    // Return empty array on error, but in production you might want to show an error message
    return []
  }
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
      case 'recent':
        comparison = a.year - b.year // will be reversed to desc below
        direction = 'desc'
        break;
      case 'oldest':
        comparison = a.year - b.year
        direction = 'asc'
        break;
      case 'title-asc':
      case 'title-desc':
        comparison = a.title.localeCompare(b.title)
        direction = sortBy === 'title-asc' ? 'asc' : 'desc'
        break;
      case 'popularity': {
        const aScore = a.citationCount * 2 + a.downloadCount
        const bScore = b.citationCount * 2 + b.downloadCount
        comparison = aScore - bScore
        direction = 'desc'
        break;
      }
      case 'relevance':
      default: {
        // Simple relevance scoring based on title match
        if (query) {
          const aScore = a.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
          const bScore = b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
          comparison = aScore - bScore
        } else {
          comparison = 0
        }
        direction = 'desc'
        break;
      }
    }

    return direction === 'asc' ? comparison : -comparison
  })

  return sorted
}