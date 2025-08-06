import type { FilterGroup } from '@/models'

export const mockFilters: FilterGroup[] = [
  {
    id: 'type',
    title: 'Resource Type',
    type: 'checkbox',
    options: [
      { id: 'article', label: 'Journal Articles', count: 1247 },
      { id: 'book', label: 'Books', count: 342 },
      { id: 'thesis', label: 'Theses', count: 89 },
      { id: 'conference', label: 'Conference Papers', count: 567 },
      { id: 'report', label: 'Technical Reports', count: 234 }
    ]
  },
  {
    id: 'year',
    title: 'Publication Year',
    type: 'checkbox',
    options: [
      { id: '2024', label: '2024', count: 156 },
      { id: '2023', label: '2023', count: 423 },
      { id: '2022', label: '2022', count: 567 },
      { id: '2021', label: '2021', count: 489 },
      { id: '2020', label: '2020', count: 312 },
      { id: 'older', label: 'Before 2020', count: 1532 }
    ]
  },
  {
    id: 'subject',
    title: 'Subject Area',
    type: 'checkbox',
    options: [
      { id: 'computer-science', label: 'Computer Science', count: 892 },
      { id: 'engineering', label: 'Engineering', count: 543 },
      { id: 'medicine', label: 'Medicine & Health', count: 434 },
      { id: 'physics', label: 'Physics', count: 321 },
      { id: 'biology', label: 'Biology', count: 298 },
      { id: 'chemistry', label: 'Chemistry', count: 267 },
      { id: 'mathematics', label: 'Mathematics', count: 198 },
      { id: 'social-sciences', label: 'Social Sciences', count: 156 }
    ]
  },
  {
    id: 'access',
    title: 'Access Type',
    type: 'checkbox',
    options: [
      { id: 'open-access', label: 'Open Access', count: 1234 },
      { id: 'subscription', label: 'Subscription Required', count: 1567 },
      { id: 'free', label: 'Free to Read', count: 890 }
    ]
  },
  {
    id: 'language',
    title: 'Language',
    type: 'checkbox',
    options: [
      { id: 'english', label: 'English', count: 2341 },
      { id: 'spanish', label: 'Spanish', count: 234 },
      { id: 'french', label: 'French', count: 189 },
      { id: 'german', label: 'German', count: 156 },
      { id: 'chinese', label: 'Chinese', count: 134 },
      { id: 'other', label: 'Other Languages', count: 423 }
    ]
  }
]

export const getFilters = (): FilterGroup[] => {
  return mockFilters
}