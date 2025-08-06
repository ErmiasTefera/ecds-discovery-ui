import type { DetailResource } from '@/models'

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
  }
]

export const getDetailResource = (id: string): DetailResource | undefined => {
  return mockDetailResources.find(resource => resource.id === id)
}