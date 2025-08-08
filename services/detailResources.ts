import type { DetailResource } from '@/models'
import { httpService, type DetailParams, type ApiResponse } from './httpService'

// Extended mock data for detail view
export const mockDetailResources: DetailResource[] = [
  {
    id: '1',
    title: 'Machine Learning Applications in Healthcare: A Comprehensive Review',
    authors: ['Smith, J.', 'Johnson, M.', 'Chen, L.'],
    year: 2023,
    type: 'article',
    journal: 'Journal of Medical AI',
    description: 'This comprehensive review examines the latest developments in machine learning applications within healthcare, covering diagnostic imaging, predictive analytics, and personalized treatment approaches.',
    abstract: 'Machine learning (ML) has emerged as a transformative technology in healthcare, offering unprecedented opportunities to improve patient outcomes, reduce costs, and enhance clinical decision-making. This comprehensive review examines the current state of ML applications in healthcare, covering key areas including diagnostic imaging, predictive analytics, and personalized treatment approaches. We analyze over 200 recent studies and present a systematic overview of successful implementations, current challenges, and future directions. Our findings indicate that ML-driven solutions have demonstrated significant improvements in diagnostic accuracy, with some applications achieving performance levels comparable to or exceeding human experts. However, challenges remain in areas such as data privacy, algorithm interpretability, and regulatory compliance. We conclude with recommendations for researchers, clinicians, and policymakers to accelerate the responsible adoption of ML in healthcare settings.',
    doi: '10.1234/jmai.2023.001',
    url: 'https://example.com/paper1',
    tags: ['machine learning', 'healthcare', 'AI', 'medical imaging', 'predictive analytics'],
    downloadCount: 1247,
    citationCount: 89,
    keywords: ['artificial intelligence', 'deep learning', 'clinical decision support', 'diagnostic imaging', 'personalized medicine'],
    pages: '125-158',
    volume: '15',
    issue: '3',
    language: 'English',
    publicationDate: '2023-03-15',
    affiliations: ['Stanford University School of Medicine', 'MIT Computer Science and Artificial Intelligence Laboratory', 'Johns Hopkins University'],
    references: [
      'LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444.',
      'Topol, E. J. (2019). High-performance medicine: the convergence of human and artificial intelligence. Nature Medicine, 25(1), 44-56.',
      'Rajkomar, A., Dean, J., & Kohane, I. (2019). Machine learning in medicine. New England Journal of Medicine, 380(14), 1347-1358.'
    ],
    relatedResources: [
      { id: '2', title: 'Deep Learning for Computer Vision: Theory and Practice', type: 'book', relationship: 'Related methodology' },
      { id: '6', title: 'Neural Networks for Natural Language Processing: Recent Advances', type: 'article', relationship: 'Complementary techniques' }
    ]
  },
  {
    id: '2',
    title: 'Deep Learning for Computer Vision: Theory and Practice',
    authors: ['Chen, L.', 'Williams, R.'],
    year: 2022,
    type: 'book',
    publisher: 'Academic Press',
    description: 'A comprehensive guide to deep learning techniques in computer vision, covering convolutional neural networks, object detection, and image segmentation with practical implementations.',
    abstract: 'Computer vision has undergone a revolutionary transformation with the advent of deep learning technologies. This comprehensive textbook provides both theoretical foundations and practical implementation guidance for modern computer vision systems. Starting with fundamental concepts of neural networks and progressing through advanced architectures like convolutional neural networks (CNNs), the book covers essential topics including image classification, object detection, semantic segmentation, and generative models. Each chapter includes hands-on exercises and real-world case studies, making it ideal for both students and practitioners. The book also addresses current challenges such as data efficiency, model interpretability, and deployment considerations for production systems.',
    url: 'https://example.com/book1',
    tags: ['deep learning', 'computer vision', 'neural networks', 'CNN', 'image processing'],
    downloadCount: 2341,
    citationCount: 156,
    keywords: ['convolutional neural networks', 'object detection', 'image segmentation', 'generative adversarial networks', 'transfer learning'],
    pages: '1-524',
    isbn: '978-0-12-345678-9',
    language: 'English',
    publicationDate: '2022-09-01',
    affiliations: ['University of California, Berkeley', 'Google Research'],
    relatedResources: [
      { id: '1', title: 'Machine Learning Applications in Healthcare: A Comprehensive Review', type: 'article', relationship: 'Application domain' },
      { id: '6', title: 'Neural Networks for Natural Language Processing: Recent Advances', type: 'article', relationship: 'Related architecture' }
    ]
  },
  {
    id: '3',
    title: 'Climate Change Impact on Global Food Security: A Multi-Regional Analysis',
    authors: ['Anderson, K.', 'Rodriguez, M.', 'Thompson, L.'],
    year: 2023,
    type: 'article',
    journal: 'Environmental Science Today',
    description: 'An extensive analysis of how climate change affects food security across different global regions, with implications for policy and agricultural adaptation strategies.',
    abstract: 'Climate change represents one of the most pressing challenges facing global food security in the 21st century. This comprehensive multi-regional analysis examines the complex interactions between changing climate patterns and agricultural productivity across six major food-producing regions worldwide. Using advanced climate modeling and agricultural simulation tools, we assessed the potential impacts of temperature increases, precipitation changes, and extreme weather events on crop yields, livestock production, and food distribution systems. Our findings reveal significant regional variations in vulnerability, with sub-Saharan Africa and South Asia facing the greatest risks to food security. The study incorporates data from over 500 agricultural monitoring stations and interviews with 2,000 farmers across the study regions. We identify critical adaptation strategies including drought-resistant crop varieties, improved irrigation systems, and climate-smart agricultural practices. Policy recommendations include enhanced international cooperation on food security, increased investment in agricultural research and development, and strengthened early warning systems for climate-related food crises.',
    doi: '10.1234/est.2023.045',
    url: 'https://example.com/paper3',
    tags: ['climate change', 'food security', 'agriculture', 'policy', 'adaptation', 'sustainability'],
    downloadCount: 892,
    citationCount: 67,
    keywords: ['climate adaptation', 'crop yields', 'drought resistance', 'food systems', 'agricultural sustainability', 'regional analysis'],
    pages: '78-102',
    volume: '28',
    issue: '4',
    language: 'English',
    publicationDate: '2023-07-20',
    affiliations: ['University of Oxford Environmental Change Institute', 'International Food Policy Research Institute', 'World Bank Agriculture Division'],
    references: [
      'IPCC. (2022). Climate Change 2022: Impacts, Adaptation and Vulnerability. Cambridge University Press.',
      'Wheeler, T., & von Braun, J. (2013). Climate change impacts on global food security. Science, 341(6145), 508-513.',
      'Rosenzweig, C., et al. (2014). Assessing agricultural risks of climate change in the 21st century. PNAS, 111(9), 3268-3273.'
    ],
    relatedResources: [
      { id: '4', title: 'Quantum Computing Algorithms for Optimization Problems', type: 'thesis', relationship: 'Computational methods' },
      { id: '5', title: 'Artificial Intelligence Ethics in Modern Society', type: 'book', relationship: 'Societal impact analysis' }
    ]
  },
  {
    id: '4',
    title: 'Quantum Computing Algorithms for Optimization Problems',
    authors: ['Zhang, Y.', 'Brown, A.', 'Davis, P.'],
    year: 2024,
    type: 'thesis',
    description: 'This doctoral thesis explores novel quantum computing algorithms designed to solve complex optimization problems, with applications in logistics and financial modeling.',
    abstract: 'Quantum computing represents a paradigm shift in computational capability, offering exponential speedups for certain classes of problems. This doctoral dissertation investigates the development and implementation of novel quantum algorithms specifically designed for complex optimization problems that are intractable for classical computers. The research focuses on three primary areas: the Quantum Approximate Optimization Algorithm (QAOA) for combinatorial optimization, quantum annealing approaches for portfolio optimization in financial markets, and hybrid classical-quantum algorithms for logistics and supply chain management. Through theoretical analysis and experimental validation using current quantum hardware, this work demonstrates significant performance improvements over classical methods for problems with more than 1,000 variables. The thesis includes implementations on IBM Quantum and Google Quantum AI platforms, with detailed analysis of noise effects and error mitigation strategies. Practical applications developed during this research include a quantum-enhanced route optimization system for delivery services and a quantum portfolio optimization tool for hedge funds. The work contributes to both the theoretical understanding of quantum optimization and its practical implementation in real-world scenarios.',
    url: 'https://example.com/thesis1',
    tags: ['quantum computing', 'optimization', 'algorithms', 'QAOA', 'quantum annealing', 'logistics'],
    downloadCount: 543,
    citationCount: 23,
    keywords: ['quantum algorithms', 'combinatorial optimization', 'quantum annealing', 'hybrid algorithms', 'quantum supremacy', 'NISQ devices'],
    pages: '1-187',
    language: 'English',
    publicationDate: '2024-01-15',
    affiliations: ['MIT Department of Physics', 'IBM Quantum Research', 'Stanford University Computer Science Department'],
    references: [
      'Farhi, E., Goldstone, J., & Gutmann, S. (2014). A quantum approximate optimization algorithm. arXiv preprint arXiv:1411.4028.',
      'Preskill, J. (2018). Quantum computing in the NISQ era and beyond. Quantum, 2, 79.',
      'Cerezo, M., et al. (2021). Variational quantum algorithms. Nature Reviews Physics, 3(9), 625-644.'
    ],
    relatedResources: [
      { id: '1', title: 'Machine Learning Applications in Healthcare: A Comprehensive Review', type: 'article', relationship: 'Computational optimization' },
      { id: '3', title: 'Climate Change Impact on Global Food Security: A Multi-Regional Analysis', type: 'article', relationship: 'Optimization applications' }
    ]
  },
  {
    id: '5',
    title: 'Artificial Intelligence Ethics in Modern Society',
    authors: ['Wilson, S.', 'Taylor, J.', 'Kumar, A.'],
    year: 2023,
    type: 'book',
    publisher: 'Ethics Publications',
    description: 'Exploring the ethical implications of artificial intelligence deployment in society, covering bias, privacy, accountability, and the future of human-AI interaction.',
    abstract: 'As artificial intelligence becomes increasingly integrated into every aspect of modern life, questions of ethics and responsibility have never been more critical. This comprehensive examination explores the multifaceted ethical challenges posed by AI systems, from algorithmic bias in hiring decisions to privacy concerns in surveillance systems. The book is structured around five core themes: fairness and bias mitigation, privacy and data protection, transparency and explainability, accountability and governance, and the future of human-AI collaboration. Drawing on case studies from healthcare, criminal justice, financial services, and social media, the authors present a balanced analysis of both the promises and perils of AI technology. The book includes interviews with leading AI researchers, ethicists, policymakers, and industry practitioners, providing diverse perspectives on how society should navigate the AI revolution. Practical frameworks for ethical AI development are presented, including guidelines for bias testing, privacy-preserving machine learning techniques, and governance structures for AI oversight. The final chapters explore emerging challenges such as artificial general intelligence, deepfakes, and the potential for AI to exacerbate existing social inequalities.',
    url: 'https://example.com/book2',
    tags: ['AI ethics', 'society', 'bias', 'privacy', 'accountability', 'governance', 'fairness'],
    downloadCount: 1789,
    citationCount: 134,
    keywords: ['algorithmic bias', 'AI governance', 'machine learning ethics', 'privacy-preserving AI', 'explainable AI', 'responsible AI'],
    pages: '1-298',
    isbn: '978-0-89-876543-2',
    language: 'English',
    publicationDate: '2023-04-10',
    affiliations: ['Harvard Law School', 'Stanford HAI Institute', 'Oxford Internet Institute'],
    references: [
      'O\'Neil, C. (2016). Weapons of Math Destruction. Crown Publishing Group.',
      'Barocas, S., Hardt, M., & Narayanan, A. (2019). Fairness and Machine Learning. MIT Press.',
      'Russell, S. (2019). Human Compatible: Artificial Intelligence and the Problem of Control. Viking Press.'
    ],
    relatedResources: [
      { id: '1', title: 'Machine Learning Applications in Healthcare: A Comprehensive Review', type: 'article', relationship: 'Ethical AI applications' },
      { id: '6', title: 'Neural Networks for Natural Language Processing: Recent Advances', type: 'article', relationship: 'AI technology ethics' }
    ]
  },
  {
    id: '6',
    title: 'Neural Networks for Natural Language Processing: Recent Advances',
    authors: ['Martinez, C.', 'Lee, H.', 'Patel, R.', 'Kim, S.'],
    year: 2022,
    type: 'article',
    journal: 'Computational Linguistics Review',
    description: 'A survey of recent advances in neural network architectures for natural language processing, including transformers, BERT, and GPT models.',
    abstract: 'Natural Language Processing (NLP) has experienced a revolutionary transformation with the introduction of transformer-based neural network architectures. This comprehensive survey examines the evolution of NLP from traditional statistical methods to modern deep learning approaches, with particular focus on breakthrough developments from 2017 to 2022. The paper provides detailed analysis of transformer architecture innovations, including attention mechanisms, positional encoding strategies, and scaling laws. We examine major language models including BERT, GPT-3, T5, and their variants, analyzing their architectural differences, training methodologies, and performance characteristics across diverse NLP tasks. The survey covers recent advances in few-shot learning, prompt engineering, and instruction tuning, highlighting how these techniques have democratized access to powerful language understanding capabilities. We also address critical challenges in the field, including computational efficiency, bias mitigation, and model interpretability. The paper includes extensive experimental comparisons across 15 standard NLP benchmarks, demonstrating the progressive improvements in model performance. Recent developments in multilingual models, code generation, and multimodal language understanding are also covered. The survey concludes with discussion of future research directions, including more efficient architectures, better few-shot learning methods, and the path toward artificial general intelligence.',
    doi: '10.1234/clr.2022.078',
    url: 'https://example.com/paper6',
    tags: ['NLP', 'neural networks', 'transformers', 'BERT', 'GPT', 'attention mechanisms', 'language models'],
    downloadCount: 2156,
    citationCount: 198,
    keywords: ['transformer architecture', 'attention mechanisms', 'language modeling', 'pre-training', 'fine-tuning', 'few-shot learning'],
    pages: '45-89',
    volume: '34',
    issue: '2',
    language: 'English',
    publicationDate: '2022-06-30',
    affiliations: ['Google Research', 'University of Washington', 'Carnegie Mellon University', 'Seoul National University'],
    references: [
      'Vaswani, A., et al. (2017). Attention is all you need. Advances in neural information processing systems.',
      'Devlin, J., et al. (2018). BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding. arXiv preprint.',
      'Brown, T., et al. (2020). Language models are few-shot learners. Advances in neural information processing systems.'
    ],
    relatedResources: [
      { id: '1', title: 'Machine Learning Applications in Healthcare: A Comprehensive Review', type: 'article', relationship: 'ML methodology' },
      { id: '2', title: 'Deep Learning for Computer Vision: Theory and Practice', type: 'book', relationship: 'Neural network architectures' },
      { id: '5', title: 'Artificial Intelligence Ethics in Modern Society', type: 'book', relationship: 'AI ethics and bias' }
    ]
  }
]

export const getDetailResource = async (id: string): Promise<DetailResource | undefined> => {
  try {
    const params: DetailParams = { id }
    
    // Find mock data based on id
    const resource = mockDetailResources.find(resource => resource.id === id)
    
    if (!resource) {
      return undefined
    }

    const response: ApiResponse<DetailResource> = await httpService.getResourceDetail(params, resource)
    return response.data
  } catch (error) {
    console.error('Error getting detail resource:', error)
    // Return undefined on error
    return undefined
  }
}