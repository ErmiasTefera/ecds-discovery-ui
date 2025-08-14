import { httpService, type SuggestionParams, type ApiResponse } from './httpService'

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
    title: 'Community-Based Interventions to Reduce Maternal Mortality',
    authors: ['Ayele, M.', 'Johnson, M.'],
    year: 2023,
    type: 'article',
    journal: 'International Journal of Maternal Health'
  },
  {
    id: '2',
    title: 'Health Policy and Management: Strengthening Primary Care',
    authors: ['Chen, L.', 'Williams, R.'],
    year: 2022,
    type: 'book',
    publisher: 'Global Health Press'
  },
  {
    id: '3',
    title: 'Ambient Air Pollution and Cardiovascular Risk',
    authors: ['Anderson, K.'],
    year: 2023,
    type: 'article',
    journal: 'Environmental Health Perspectives'
  },
  {
    id: '4',
    title: 'Integrating Pharmacovigilance Systems in Low-Resource Settings',
    authors: ['Zhang, Y.', 'Brown, A.', 'Davis, P.'],
    year: 2024,
    type: 'thesis'
  },
  {
    id: '5',
    title: 'Nutrition Interventions to Reduce Stunting',
    authors: ['Wilson, S.'],
    year: 2023,
    type: 'book',
    publisher: 'Global Nutrition Initiative'
  },
  {
    id: '6',
    title: 'Field Epidemiology Methods for Outbreak Investigation',
    authors: ['Martinez, C.', 'Lee, H.'],
    year: 2022,
    type: 'article',
    journal: 'Journal of Field Epidemiology'
  },
  {
    id: '7',
    title: 'HIV/TB Co-infection Management in Resource-Limited Settings',
    authors: ['Thompson, R.', 'Garcia, M.'],
    year: 2023,
    type: 'article',
    journal: 'International Journal of Infectious Diseases'
  },
  {
    id: '8',
    title: 'Health Systems Strengthening in Ethiopia',
    authors: ['O\'Connor, P.', 'Singh, A.'],
    year: 2022,
    type: 'book',
    publisher: 'Ethiopian Public Health Institute'
  },
  {
    id: '9',
    title: 'Integration of Mental Health into Primary Health Care',
    authors: ['Davis, E.', 'Wang, L.'],
    year: 2024,
    type: 'article',
    journal: 'Journal of Global Mental Health'
  },
  {
    id: '10',
    title: 'Epidemiology of Non-Communicable Diseases in Urban Settings',
    authors: ['Johnson, A.', 'Brown, K.'],
    year: 2023,
    type: 'article',
    journal: 'Urban Health Quarterly'
  },
  {
    id: '11',
    title: 'Biostatistics for Public Health Research',
    authors: ['White, S.', 'Chen, H.'],
    year: 2022,
    type: 'book',
    publisher: 'Public Health Texts'
  },
  {
    id: '12',
    title: 'Determinants of Vaccine Hesitancy in Adolescents',
    authors: ['Taylor, R.', 'Gonzalez, P.'],
    year: 2024,
    type: 'thesis'
  },
  {
    id: '13',
    title: 'Cost-Effectiveness of Hypertension Treatment Protocols',
    authors: ['Wilson, K.', 'Martinez, D.'],
    year: 2023,
    type: 'article',
    journal: 'Health Economics and Policy'
  },
  {
    id: '14',
    title: 'WASH Programs and Child Health Outcomes',
    authors: ['Kim, Y.', 'Zhang, W.'],
    year: 2022,
    type: 'article',
    journal: 'Global Environmental Health'
  },
  {
    id: '15',
    title: 'Digital Health Interventions for Community Health Workers',
    authors: ['Patel, A.', 'Garcia, R.'],
    year: 2024,
    type: 'article',
    journal: 'Healthcare Technology Review'
  },
  {
    id: '16',
    title: 'Pharmacology of Antimalarial Drugs',
    authors: ['Brown, C.', 'Johnson, E.'],
    year: 2023,
    type: 'article',
    journal: 'Tropical Medicine and Pharmacology'
  },
  {
    id: '17',
    title: 'Occupational Health and Safety in Manufacturing',
    authors: ['Miller, G.', 'Anderson, P.'],
    year: 2022,
    type: 'book',
    publisher: 'Occupational Health Press'
  },
  {
    id: '18',
    title: 'Nutrition Transition and Obesity in Emerging Economies',
    authors: ['Rodriguez, S.', 'Wang, T.'],
    year: 2024,
    type: 'article',
    journal: 'Public Health Nutrition'
  },
  {
    id: '19',
    title: 'Climate Variability and Vector-Borne Disease Risk',
    authors: ['Lee, V.', 'Gonzalez, W.'],
    year: 2023,
    type: 'article',
    journal: 'Environmental Health and Epidemiology'
  },
  {
    id: '20',
    title: 'Medical Ethics in Clinical Research',
    authors: ['White, Z.', 'Chen, A.'],
    year: 2022,
    type: 'article',
    journal: 'Journal of Medical Ethics'
  },
  {
    id: '21',
    title: 'Primary Healthcare Financing and UHC',
    authors: ['Taylor, C.', 'Johnson, D.'],
    year: 2024,
    type: 'book',
    publisher: 'Health Systems Press'
  },
  {
    id: '22',
    title: 'Reproductive Health and Family Planning Uptake',
    authors: ['Anderson, F.', 'Wang, G.'],
    year: 2023,
    type: 'article',
    journal: 'Reproductive Health Studies'
  },
  {
    id: '23',
    title: 'Emergency and Disaster Preparedness in Health Systems',
    authors: ['Kim, I.', 'Garcia, J.'],
    year: 2024,
    type: 'thesis'
  },
  {
    id: '24',
    title: 'Epidemiology of Road Traffic Injuries',
    authors: ['Miller, L.', 'Rodriguez, M.'],
    year: 2023,
    type: 'article',
    journal: 'Injury Prevention and Control'
  },
  {
    id: '25',
    title: 'Epidemiological Methods in Public Health',
    authors: ['Thompson, O.', 'Chen, P.'],
    year: 2022,
    type: 'article',
    journal: 'Public Health Methods Review'
  }
]

export const getSearchSuggestions = async (query: string, limit: number = 5): Promise<MockResult[]> => {
  try {
    if (!query.trim()) return []

    const params: SuggestionParams = { query: query.trim(), limit }
    
    // Filter mock data based on query
    const searchTerm = query.toLowerCase()
    const filteredSuggestions = mockSuggestionsDatabase
      .filter(result =>
        result.title.toLowerCase().includes(searchTerm) ||
        result.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
        result.journal?.toLowerCase().includes(searchTerm) ||
        result.publisher?.toLowerCase().includes(searchTerm)
      )
      .slice(0, limit)

    const response: ApiResponse<MockResult[]> = await httpService.getSearchSuggestions(params, filteredSuggestions)
    return response.data
  } catch (error) {
    console.error('Error getting search suggestions:', error)
    // Return empty array on error
    return []
  }
}