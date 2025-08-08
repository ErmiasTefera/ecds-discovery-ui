# System Patterns: Discovery UI

## Architecture Overview

The Discovery UI follows a modern React/Next.js architecture with clear separation of concerns, centralized state management, and professional component patterns.

## State Management Patterns

### Jotai Atoms Architecture
```typescript
// Centralized state atoms
export const searchQueryAtom = atom<string>('')
export const advancedSearchCriteriaAtom = atom<SearchCriteria[]>([])
export const advancedSearchFiltersAtom = atom<AdvancedSearchFilters>({...})

// Authentication atoms
export const authStateAtom = atom<AuthState>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
})

export const userAtom = atom(
  (get) => get(authStateAtom).user,
  (get, set, user: User | null) => {
    const currentState = get(authStateAtom)
    set(authStateAtom, {
      ...currentState,
      user,
      isAuthenticated: !!user
    })
  }
)

// Derived atoms for computed state
export const isAdvancedSearchActiveAtom = atom((get) => {
  const criteria = get(advancedSearchCriteriaAtom)
  const filters = get(advancedSearchFiltersAtom)
  const query = get(searchQueryAtom)
  
  // Check if there are non-keyword criteria
  const hasNonKeywordCriteria = criteria.some(criteria => 
    criteria.field !== 'keyword' || criteria.value !== query
  )
  
  // Check if there are filters applied
  const hasFilters = filters.format !== 'all' || filters.yearFrom || filters.yearTo
  
  return hasNonKeywordCriteria || hasFilters
})

// Helper functions for state operations
export const ensureMinimumCriteria = (criteria: SearchCriteria[]): SearchCriteria[] => {
  // Ensure minimum 3 rows and sort by content
  // Non-empty values first, then empty ones
}
```

### Component State Integration
```typescript
// Using atoms in components
const [query, setQuery] = useAtom(searchQueryAtom)
const [isAdvancedActive] = useAtom(isAdvancedSearchActiveAtom)

// Authentication state integration
const [user] = useAtom(userAtom)
const [isAuthenticated] = useAtom(isAuthenticatedAtom)
const [, login] = useAtom(loginAtom)

// Reactive updates across components
// Changes in one component automatically update others
```

## Component Patterns

### Authentication Component Pattern
```typescript
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [, initializeAuth] = useAtom(initializeAuthAtom)

  useEffect(() => {
    // Initialize auth state from localStorage on app load
    initializeAuth()
  }, [initializeAuth])

  return <>{children}</>
}

const UserAvatar: React.FC = () => {
  const [user] = useAtom(userAtom)
  const [, logout] = useAtom(logoutAtom)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
  }

  if (!user) return null

  return (
    <div className="relative">
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {/* Avatar and user info */}
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {/* Menu items */}
        </div>
      )}
    </div>
  )
}
```

### Search Component Pattern
```typescript
const Search: React.FC<SearchProps> = ({ initialQuery }) => {
  // Jotai state integration
  const [query, setQuery] = useAtom(searchQueryAtom)
  const [isLoading, setIsLoading] = useAtom(searchLoadingAtom)
  
  // Local UI state
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)
  
  // URL synchronization
  useEffect(() => {
    const urlQuery = searchParams?.get('q') || ''
    if (initialQuery !== undefined) {
      setQuery(initialQuery)
    } else if (urlQuery) {
      setQuery(urlQuery)
    }
  }, [searchParams, initialQuery, setQuery])
  
  // Search handlers
  const handleSearch = useCallback(async (searchQuery: string) => {
    // Reset advanced search filters
    // Navigate to search page
  }, [router, setIsLoading, setAdvancedCriteria, setAdvancedFilters])
}
```

### Advanced Search Modal Pattern
```typescript
const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  isOpen, onClose, onSearch, mainSearchQuery
}) => {
  // Jotai state integration
  const [searchCriteria, setSearchCriteria] = useAtom(advancedSearchCriteriaAtom)
  const [filters, setFilters] = useAtom(advancedSearchFiltersAtom)
  
  // Initialization tracking to prevent infinite loops
  const hasInitialized = React.useRef(false)
  
  // Smart initialization with main search query
  useEffect(() => {
    if (isOpen && !hasInitialized.current) {
      let criteria = searchCriteria.length > 0 ? searchCriteria : []
      
      // Use main search query as keyword if no criteria
      if (criteria.length === 0 && mainSearchQuery.trim()) {
        criteria = [
          { field: 'keyword', value: mainSearchQuery.trim(), operator: 'AND' },
          { field: 'title', value: '', operator: 'AND' },
          { field: 'author', value: '', operator: 'AND' }
        ]
      }
      
      // Ensure minimum 3 rows and sort by content
      const processedCriteria = ensureMinimumCriteria(criteria)
      setSearchCriteria(processedCriteria)
      setFilters(initialFilters)
      
      hasInitialized.current = true
    }
    
    // Reset initialization flag when modal closes
    if (!isOpen) {
      hasInitialized.current = false
    }
  }, [isOpen, mainSearchQuery, searchCriteria, setSearchCriteria, setFilters, initialFilters])
}
```

### Search Results Pattern
```typescript
const SearchPage = () => {
  // Jotai state integration
  const [query, setQuery] = useAtom(searchQueryAtom)
  const [advancedCriteria, setAdvancedCriteria] = useAtom(advancedSearchCriteriaAtom)
  const [advancedFilters, setAdvancedFilters] = useAtom(advancedSearchFiltersAtom)
  const [isAdvancedSearchActive] = useAtom(isAdvancedSearchActiveAtom)
  
  // Local search state
  const [hasSearched, setHasSearched] = useState(false)
  
  // URL parameter parsing and state sync
  useEffect(() => {
    const urlQuery = searchParams?.get('q') || ''
    setQuery(urlQuery)
    
    const criteriaParam = searchParams?.get('criteria')
    const filtersParam = searchParams?.get('filters')
    
    // Set hasSearched to true if there are search parameters
    if (urlQuery || criteriaParam || filtersParam) {
      setHasSearched(true)
    }
    
    // Parse and set advanced search parameters
  }, [searchParams, setQuery, setAdvancedCriteria, setAdvancedFilters])
  
  // Controlled result display
  const shouldShowResults = hasSearched && (query || isAdvancedSearchActive)
}
```

## Data Flow Patterns

### Authentication Flow Architecture
```
App Load → AuthProvider → Initialize Auth → Check localStorage → Restore User State
     ↓
User Login → Auth Atoms → Update State → Store in localStorage → Update UI
     ↓
User Logout → Clear State → Remove from localStorage → Update UI
```

### Search Flow Architecture
```
User Input → Jotai State Update → URL Sync → Search Trigger → Results Display
     ↓
Advanced Search ← Modal State ← Criteria Management ← Filter Application
```

### State Synchronization Pattern
```typescript
// URL ↔ Jotai State synchronization
useEffect(() => {
  // Parse URL parameters
  const urlQuery = searchParams?.get('q') || ''
  const criteriaParam = searchParams?.get('criteria')
  const filtersParam = searchParams?.get('filters')
  
  // Update Jotai atoms
  setQuery(urlQuery)
  if (criteriaParam) {
    setAdvancedCriteria(JSON.parse(decodeURIComponent(criteriaParam)))
  }
  if (filtersParam) {
    setAdvancedFilters(JSON.parse(decodeURIComponent(filtersParam)))
  }
}, [searchParams, setQuery, setAdvancedCriteria, setAdvancedFilters])
```

## UI Component Patterns

### shadcn/ui Integration Pattern
```typescript
// Select component usage
<Select value={criteria.field} onValueChange={(value) => updateCriteria(index, 'field', value)}>
  <SelectTrigger className="w-24">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {fieldOptions.map((option) => (
      <SelectItem key={option.value} value={option.value}>
        {option.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

### Search Term Highlighting Pattern
```typescript
// Helper function for highlighting
const highlightText = (text: string, searchQuery: string) => {
  if (!searchQuery || !text) return text
  
  const searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(term => term.length > 0)
  if (searchTerms.length === 0) return text
  
  let highlightedText = text
  
  searchTerms.forEach(term => {
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>')
  })
  
  return highlightedText
}

// Usage in components
<span dangerouslySetInnerHTML={{ 
  __html: highlightText(result.title, currentSearchQuery || '') 
}} />
```

## Error Handling Patterns

### Authentication Error Handling Pattern
```typescript
// Form validation with error handling
const validateForm = () => {
  const errors: Record<string, string> = {}
  
  if (!formData.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  setFormErrors(errors)
  return Object.keys(errors).length === 0
}

// Auth state error handling
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (!validateForm()) return
  
  try {
    await login(formData)
  } catch (error) {
    setAuthError(error instanceof Error ? error.message : 'Login failed')
  }
}
```

### Graceful Degradation Pattern
```typescript
// URL parameter parsing with error handling
if (criteriaParam) {
  try {
    setAdvancedCriteria(JSON.parse(decodeURIComponent(criteriaParam)))
  } catch (e) {
    console.error('Failed to parse criteria from URL:', e)
  }
}
```

### State Conflict Prevention Pattern
```typescript
// Initialization tracking to prevent infinite loops
const hasInitialized = React.useRef(false)

useEffect(() => {
  if (isOpen && !hasInitialized.current) {
    // Only run initialization once per modal open
    // ... initialization logic ...
    hasInitialized.current = true
  }
  
  // Reset flag when modal closes
  if (!isOpen) {
    hasInitialized.current = false
  }
}, [dependencies])
```

## Performance Patterns

### Memoization Pattern
```typescript
// Memoized search results
const filteredResults = useMemo(() => {
  let results = searchResources(query)
  
  // Apply advanced search filters
  if (advancedFilters.format !== 'all') {
    results = results.filter(result => result.type === advancedFilters.format)
  }
  
  return results
}, [query, advancedFilters])
```

### Controlled Re-rendering Pattern
```typescript
// Only show results when search is actually triggered
const shouldShowResults = hasSearched && (query || isAdvancedSearchActive)

// Conditional rendering
{shouldShowResults && (
  <SearchResults />
)}
```

## Accessibility Patterns

### Keyboard Navigation Pattern
```typescript
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < filteredResults.length - 1 ? prev + 1 : prev
      )
      break
    
    case 'ArrowUp':
      e.preventDefault()
      setSelectedIndex(prev => prev > -1 ? prev - 1 : -1)
      break
    
    case 'Enter':
      e.preventDefault()
      if (selectedIndex >= 0) {
        handleSuggestionClick(filteredResults[selectedIndex])
      } else {
        handleSearch(query)
      }
      break
    
    case 'Escape':
      e.preventDefault()
      setSelectedIndex(-1)
      setIsFocused(false)
      break
  }
}
```

### ARIA Labels Pattern
```typescript
<button
  onClick={() => setIsAdvancedSearchOpen(true)}
  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
  aria-label="Open advanced search options"
>
  <Settings className="w-4 h-4" />
  Advanced Search
</button>
```

## Code Organization Patterns

### Barrel Export Pattern
```typescript
// atoms/searchAtoms.ts
export { 
  searchQueryAtom, 
  advancedSearchCriteriaAtom, 
  advancedSearchFiltersAtom,
  isAdvancedSearchActiveAtom,
  type SearchCriteria,
  type AdvancedSearchFilters
}

// Usage in components
import { 
  searchQueryAtom, 
  advancedSearchCriteriaAtom,
  type SearchCriteria 
} from '@/atoms/searchAtoms'
```

### Service Layer Pattern
```typescript
// services/index.ts
export { 
  searchResources, 
  sortSearchResults, 
  type SortOption, 
  type SortDirection 
} from './searchResults'

// Usage in components
import { searchResources, sortSearchResults, type SortOption } from '@/services'
```

## Testing Patterns

### Component Testing Pattern
```typescript
// Test structure for components with Jotai
import { Provider } from 'jotai'

const TestWrapper = ({ children }) => (
  <Provider>
    {children}
  </Provider>
)

// Test component with atoms
render(
  <TestWrapper>
    <SearchComponent />
  </TestWrapper>
)
```

## Deployment Patterns

### Environment Configuration Pattern
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    domains: ['localhost'],
  },
}
```

These patterns ensure consistent, maintainable, and scalable code across the Discovery UI application while providing excellent user experience and developer productivity.