# System Patterns: Discovery UI

## Architecture Overview
Discovery UI follows Next.js App Router patterns with a component-based architecture emphasizing modularity, reusability, and type safety.

## Routing Architecture

### App Router Structure
```
app/
├── (app)/                    # Route group for main application
│   ├── page.tsx             # Landing page (/)
│   ├── search/
│   │   └── page.tsx         # Search results (/search)
│   ├── detail/
│   │   └── [resourceId]/
│   │       └── page.tsx     # Resource detail (/detail/[id])
│   └── layout.tsx           # App-specific layout
├── layout.tsx               # Root layout
└── globals.css              # Global styles
```

### Layout System
- **Root Layout**: Basic HTML structure and global providers
- **App Layout**: Application-specific layout with TopNavigation and Footer
- **Sticky Navigation**: Top navigation remains visible during scroll
- **Consistent Structure**: All pages share the same layout foundation

## Component Architecture

### Component Organization
```
components/
├── Search.tsx               # Main search interface
├── Filter.tsx               # Faceted filtering
├── SearchResultItem.tsx     # Individual result cards
├── SearchResultDetail.tsx   # Detailed resource view
├── LoadingSkeletonItem.tsx  # Loading states
└── ui/                      # Reusable UI primitives
```

### Component Patterns
- **Functional Components**: All components use React function syntax
- **TypeScript Interfaces**: Strong typing for props and data structures
- **Composition**: Components composed from smaller, reusable parts
- **Single Responsibility**: Each component has a focused purpose

## State Management Patterns

### Search State
- URL-based state for search queries and filters
- Enables deep linking and browser back/forward navigation
- State persistence across page refreshes

### Component State
- Local state for UI interactions (input focus, dropdown open/close)
- Derived state for computed values (filtered results, search highlights)
- Loading states for async operations

## Data Flow Architecture

### Search Flow
1. User input triggers debounced search
2. Search parameters update URL
3. API call fetches results
4. Results rendered with loading states
5. Filters applied client-side or server-side

### Navigation Flow
- Landing page → Search page → Detail page
- Breadcrumb navigation for context
- Deep linking support for all states

## UI/UX Patterns

### Design System
- **Tailwind CSS**: Utility-first styling approach
- **Component Variants**: class-variance-authority for component theming
- **Responsive Design**: Mobile-first responsive patterns
- **Dark/Light Mode**: Theme-aware components

### Interaction Patterns
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Keyboard Navigation**: Full keyboard accessibility
- **Loading States**: Skeleton components during data fetching
- **Error Boundaries**: Graceful error handling

## Performance Patterns

### Optimization Strategies
- **Debounced Search**: Prevents excessive API calls
- **Code Splitting**: Route-based code splitting with Next.js
- **Image Optimization**: Next.js Image component for assets
- **Bundle Optimization**: Turbopack for fast development builds

### Loading Strategies
- **Skeleton Loading**: Maintains layout during data fetching
- **Progressive Loading**: Results appear as they're received
- **Caching**: Strategic caching of search results and metadata

## Accessibility Patterns
- **Semantic HTML**: Proper heading structure and landmarks
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Tab order and keyboard shortcuts
- **Focus Management**: Proper focus handling in search interfaces

## Error Handling Patterns
- **Input Validation**: Client-side validation with user feedback
- **API Error Handling**: Graceful degradation when services are unavailable
- **Fallback Content**: Alternative content when data is missing
- **User Feedback**: Clear error messages and recovery suggestions

## Security Considerations
- **Input Sanitization**: XSS prevention in search inputs
- **URL Parameter Validation**: Safe handling of URL-based state
- **Content Security Policy**: Protection against malicious content
- **Type Safety**: TypeScript prevents runtime type errors