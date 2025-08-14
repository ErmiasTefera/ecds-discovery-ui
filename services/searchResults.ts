import type { SearchResult } from '@/models'
import { httpService, type SearchParams, type ApiResponse } from './httpService'

// Extended mock data for search results
export const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Community-Based Interventions to Reduce Maternal Mortality in Sub-Saharan Africa',
    authors: ['Ayele, M.', 'Johnson, M.', 'Chen, L.'],
    year: 2023,
    type: 'article',
    journal: 'International Journal of Maternal Health',
    description: 'A systematic review of community health worker programs, referral systems, and emergency obstetric care to reduce maternal mortality across Sub-Saharan Africa.',
    doi: '10.1234/ijmh.2023.001',
    url: 'https://example.com/maternal-mortality',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=1&size=128',
    tags: ['maternal health', 'public health', 'Africa', 'interventions'],
    downloadCount: 1247,
    citationCount: 89
  },
  {
    id: '2',
    title: 'Health Policy and Management: Strengthening Primary Health Care Systems',
    authors: ['Chen, L.', 'Williams, R.'],
    year: 2022,
    type: 'book',
    publisher: 'Global Health Press',
    description: 'Comprehensive strategies for strengthening primary health care systems, leadership, governance, and quality improvement in low- and middle-income countries.',
    url: 'https://example.com/health-policy-book',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=2&size=128',
    tags: ['health policy', 'management', 'primary care', 'systems'],
    downloadCount: 2341,
    citationCount: 156
  },
  {
    id: '3',
    title: 'Ambient Air Pollution and Cardiovascular Risk in Urban Populations',
    authors: ['Anderson, K.', 'Rodriguez, M.'],
    year: 2023,
    type: 'article',
    journal: 'Environmental Health Perspectives',
    description: 'Multi-city cohort study quantifying the association between PM2.5 exposure and cardiovascular events in urban settings.',
    doi: '10.1234/ehp.2023.045',
    url: 'https://example.com/air-pollution-cvd',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=3&size=128',
    tags: ['environmental health', 'air pollution', 'cardiovascular disease', 'PM2.5'],
    downloadCount: 892,
    citationCount: 67
  },
  {
    id: '4',
    title: 'Integrating Pharmacovigilance Systems in Low-Resource Settings',
    authors: ['Zhang, Y.', 'Brown, A.', 'Davis, P.'],
    year: 2024,
    type: 'thesis',
    description: 'A doctoral thesis proposing scalable models for adverse drug reaction reporting and signal detection in low-resource health systems.',
    url: 'https://example.com/pharmacovigilance-thesis',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=4&size=128',
    tags: ['pharmacovigilance', 'drug safety', 'health systems'],
    downloadCount: 543,
    citationCount: 23
  },
  {
    id: '5',
    title: 'Nutrition Interventions to Reduce Stunting: Evidence and Implementation',
    authors: ['Wilson, S.', 'Taylor, J.'],
    year: 2023,
    type: 'book',
    publisher: 'Global Nutrition Initiative',
    description: 'Evidence-based review of micronutrient supplementation, complementary feeding, and multisectoral approaches to reduce stunting.',
    url: 'https://example.com/nutrition-stunting',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=5&size=128',
    tags: ['nutrition', 'stunting', 'maternal and child health', 'implementation'],
    downloadCount: 1789,
    citationCount: 134
  },
  {
    id: '6',
    title: 'Field Epidemiology Methods for Outbreak Investigation',
    authors: ['Martinez, C.', 'Lee, H.', 'Patel, R.'],
    year: 2022,
    type: 'article',
    journal: 'Journal of Field Epidemiology',
    description: 'Practical guidance on case definitions, line lists, and analytical approaches for infectious disease outbreak investigations.',
    doi: '10.1234/jfe.2022.078',
    url: 'https://example.com/epidemiology-methods',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=6&size=128',
    tags: ['epidemiology', 'infectious diseases', 'outbreak investigation'],
    downloadCount: 2156,
    citationCount: 198
  },
  {
    id: '7',
    title: 'HIV/TB Co-infection Management in Resource-Limited Settings: A Systematic Review',
    authors: ['Thompson, R.', 'Garcia, M.', 'Kim, S.'],
    year: 2023,
    type: 'article',
    journal: 'International Journal of Infectious Diseases',
    description: 'Review of diagnostic algorithms, treatment adherence strategies, and programmatic integration for HIV/TB co-infection.',
    doi: '10.1234/ijid.2023.012',
    url: 'https://example.com/hiv-tb',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=7&size=128',
    tags: ['infectious diseases', 'HIV', 'tuberculosis', 'co-infection'],
    downloadCount: 1567,
    citationCount: 78
  },
  {
    id: '8',
    title: 'Health Systems Strengthening in Ethiopia: Primary Care and Referral Networks',
    authors: ['O\'Connor, P.', 'Singh, A.'],
    year: 2022,
    type: 'book',
    publisher: 'Ethiopian Public Health Institute',
    description: 'Analysis of primary health care, community health extension programs, and referral networks in Ethiopia.',
    url: 'https://example.com/ethiopia-health-system',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=8&size=128',
    tags: ['Ethiopian health system', 'primary care', 'health systems'],
    downloadCount: 2987,
    citationCount: 203
  },
  {
    id: '9',
    title: 'Integration of Mental Health Services into Primary Health Care',
    authors: ['Davis, E.', 'Wang, L.', 'Rodriguez, C.'],
    year: 2024,
    type: 'article',
    journal: 'Journal of Global Mental Health',
    description: 'A meta-analysis of collaborative care models and task-shifting approaches for integrating mental health into primary care.',
    doi: '10.1234/jgmh.2024.034',
    url: 'https://example.com/mental-health-phc',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=9&size=128',
    tags: ['mental health', 'primary care', 'integration', 'task shifting'],
    downloadCount: 2341,
    citationCount: 145
  },
  {
    id: '10',
    title: 'Epidemiology and Control of Non-Communicable Diseases in Urban Settings',
    authors: ['Johnson, A.', 'Brown, K.', 'Miller, T.'],
    year: 2023,
    type: 'article',
    journal: 'Urban Health Quarterly',
    description: 'Data-driven approaches to surveillance, prevention, and control of hypertension, diabetes, and cardiovascular diseases in cities.',
    doi: '10.1234/uhq.2023.067',
    url: 'https://example.com/urban-ncds',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=10&size=128',
    tags: ['non-communicable diseases', 'hypertension', 'diabetes', 'urban health'],
    downloadCount: 1892,
    citationCount: 112
  },
  {
    id: '11',
    title: 'Biostatistics for Public Health Research: Methods and Applications',
    authors: ['White, S.', 'Chen, H.', 'Anderson, M.'],
    year: 2022,
    type: 'book',
    publisher: 'Public Health Texts',
    description: 'Applied biostatistics covering study design, regression, survival analysis, and causal inference for public health.',
    url: 'https://example.com/biostatistics-book',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=11&size=128',
    tags: ['biostatistics', 'public health', 'research methods'],
    downloadCount: 3456,
    citationCount: 267
  },
  {
    id: '12',
    title: 'Determinants of Vaccine Hesitancy and Uptake in Adolescents',
    authors: ['Taylor, R.', 'Gonzalez, P.', 'Lee, J.'],
    year: 2024,
    type: 'thesis',
    description: 'Mixed-methods exploration of social, behavioral, and structural determinants influencing vaccine acceptance among adolescents.',
    url: 'https://example.com/vaccine-hesitancy',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=12&size=128',
    tags: ['immunization', 'vaccine hesitancy', 'adolescents'],
    downloadCount: 987,
    citationCount: 45
  },
  {
    id: '13',
    title: 'Cost-Effectiveness Analysis of Hypertension Treatment Protocols',
    authors: ['Wilson, K.', 'Martinez, D.', 'Thompson, L.'],
    year: 2023,
    type: 'article',
    journal: 'Health Economics and Policy',
    description: 'Economic evaluation of standardized hypertension treatment protocols within primary care networks.',
    doi: '10.1234/hep.2023.089',
    url: 'https://example.com/cea-hypertension',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=13&size=128',
    tags: ['health economics', 'hypertension', 'cost-effectiveness'],
    downloadCount: 2765,
    citationCount: 189
  },
  {
    id: '14',
    title: 'Water, Sanitation, and Hygiene (WASH) Programs and Child Health Outcomes',
    authors: ['Kim, Y.', 'Zhang, W.', 'O\'Brien, S.'],
    year: 2022,
    type: 'article',
    journal: 'Global Environmental Health',
    description: 'Meta-analysis of WASH interventions and their impact on diarrheal disease and growth in children under five.',
    doi: '10.1234/geh.2022.156',
    url: 'https://example.com/wash-child-health',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=14&size=128',
    tags: ['WASH', 'child health', 'diarrheal disease', 'environmental health'],
    downloadCount: 3124,
    citationCount: 234
  },
  {
    id: '15',
    title: 'Digital Health Interventions for Frontline Community Health Workers',
    authors: ['Patel, A.', 'Garcia, R.', 'White, M.'],
    year: 2024,
    type: 'article',
    journal: 'Healthcare Technology Review',
    description: 'Evaluation of mobile decision support, digital reporting, and supervision tools for community health workers.',
    doi: '10.1234/htr.2024.023',
    url: 'https://example.com/digital-chw',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=15&size=128',
    tags: ['digital health', 'community health workers', 'mHealth'],
    downloadCount: 1987,
    citationCount: 156
  },
  {
    id: '16',
    title: 'Pharmacology of Antimalarial Drugs: Efficacy and Resistance',
    authors: ['Brown, C.', 'Johnson, E.', 'Davis, F.'],
    year: 2023,
    type: 'article',
    journal: 'Tropical Medicine and Pharmacology',
    description: 'Review of first-line antimalarial drug classes, mechanisms, pharmacokinetics, and emerging resistance patterns.',
    doi: '10.1234/tmp.2023.078',
    url: 'https://example.com/antimalarial-pharmacology',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=16&size=128',
    tags: ['pharmacology', 'malaria', 'drug resistance'],
    downloadCount: 3421,
    citationCount: 298
  },
  {
    id: '17',
    title: 'Occupational Health and Safety in Manufacturing Industries',
    authors: ['Miller, G.', 'Anderson, P.', 'Taylor, Q.'],
    year: 2022,
    type: 'book',
    publisher: 'Occupational Health Press',
    description: 'Guidelines for injury prevention, ergonomics, and exposure control in factory environments.',
    url: 'https://example.com/occupational-health',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=17&size=128',
    tags: ['occupational health', 'workplace safety', 'industrial hygiene'],
    downloadCount: 2234,
    citationCount: 167
  },
  {
    id: '18',
    title: 'Nutrition Transition and Obesity in Emerging Economies',
    authors: ['Rodriguez, S.', 'Wang, T.', 'Kim, U.'],
    year: 2024,
    type: 'article',
    journal: 'Public Health Nutrition',
    description: 'Trends in diet, physical activity, and obesity prevalence with policy implications for prevention.',
    doi: '10.1234/phn.2024.045',
    url: 'https://example.com/nutrition-transition',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=18&size=128',
    tags: ['nutrition', 'obesity', 'non-communicable diseases'],
    downloadCount: 1654,
    citationCount: 98
  },
  {
    id: '19',
    title: 'Climate Variability and Vector-Borne Disease Risk: Malaria and Dengue',
    authors: ['Lee, V.', 'Gonzalez, W.', 'Thompson, X.'],
    year: 2023,
    type: 'article',
    journal: 'Environmental Health and Epidemiology',
    description: 'Modeling the effects of temperature and rainfall variability on malaria and dengue transmission dynamics.',
    doi: '10.1234/ehe.2023.112',
    url: 'https://example.com/climate-vector-borne',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=19&size=128',
    tags: ['environmental health', 'malaria', 'dengue', 'climate change'],
    downloadCount: 2876,
    citationCount: 223
  },
  {
    id: '20',
    title: 'Medical Ethics in Clinical Research: Informed Consent and Equity',
    authors: ['White, Z.', 'Chen, A.', 'Martinez, B.'],
    year: 2022,
    type: 'article',
    journal: 'Journal of Medical Ethics',
    description: 'Analysis of ethical frameworks for informed consent, community engagement, and equitable access in clinical trials.',
    doi: '10.1234/jme.2022.189',
    url: 'https://example.com/medical-ethics-clinical',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=20&size=128',
    tags: ['medical ethics', 'clinical research', 'informed consent'],
    downloadCount: 3987,
    citationCount: 345
  },
  {
    id: '21',
    title: 'Primary Healthcare Financing: Strategies for Universal Health Coverage',
    authors: ['Taylor, C.', 'Johnson, D.', 'Brown, E.'],
    year: 2024,
    type: 'book',
    publisher: 'Health Systems Press',
    description: 'Financing mechanisms, insurance schemes, and pooled purchasing to advance universal health coverage in LMICs.',
    url: 'https://example.com/phc-financing',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=21&size=128',
    tags: ['health policy', 'financing', 'universal health coverage'],
    downloadCount: 2567,
    citationCount: 189
  },
  {
    id: '22',
    title: 'Reproductive Health and Family Planning Uptake in Rural Communities',
    authors: ['Anderson, F.', 'Wang, G.', 'Patel, H.'],
    year: 2023,
    type: 'article',
    journal: 'Reproductive Health Studies',
    description: 'Determinants of contraceptive uptake, counseling quality, and supply chain reliability in rural health posts.',
    doi: '10.1234/rhs.2023.234',
    url: 'https://example.com/family-planning-uptake',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=22&size=128',
    tags: ['reproductive health', 'family planning', 'maternal health'],
    downloadCount: 1432,
    citationCount: 87
  },
  {
    id: '23',
    title: 'Emergency and Disaster Preparedness in Health Systems',
    authors: ['Kim, I.', 'Garcia, J.', 'White, K.'],
    year: 2024,
    type: 'thesis',
    description: 'Frameworks for surge capacity, supply chain resilience, and risk communication for health emergencies.',
    url: 'https://example.com/emergency-preparedness',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=23&size=128',
    tags: ['emergency preparedness', 'health systems', 'disaster risk'],
    downloadCount: 1234,
    citationCount: 67
  },
  {
    id: '24',
    title: 'Epidemiology of Road Traffic Injuries and Trauma Care Systems',
    authors: ['Miller, L.', 'Rodriguez, M.', 'Lee, N.'],
    year: 2023,
    type: 'article',
    journal: 'Injury Prevention and Control',
    description: 'Burden of road traffic injuries, pre-hospital care gaps, and trauma system development in low-resource settings.',
    doi: '10.1234/ipc.2023.156',
    url: 'https://example.com/road-traffic-injuries',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=24&size=128',
    tags: ['injury prevention', 'trauma care', 'epidemiology'],
    downloadCount: 2987,
    citationCount: 234
  },
  {
    id: '25',
    title: 'Epidemiological Methods in Public Health: A Practical Handbook',
    authors: ['Thompson, O.', 'Chen, P.', 'Taylor, Q.'],
    year: 2022,
    type: 'article',
    journal: 'Public Health Methods Review',
    description: 'A practical overview of cohort, case-control, and randomized study designs with examples from global health.',
    doi: '10.1234/phmr.2022.278',
    url: 'https://example.com/epidemiology-handbook',
    thumbnailUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=25&size=128',
    tags: ['epidemiology', 'public health', 'methods'],
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