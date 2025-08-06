# System Patterns: Discovery UI

## Architecture Overview
Discovery UI follows Next.js App Router patterns with a comprehensive component-based architecture emphasizing modularity, reusability, type safety, and professional code organization. The application implements advanced patterns for theme management, state persistence, and scholarly resource discovery.

## Project Structure Architecture

### Organized Directory Structure
```
discovery-ui/
├── app/
│   ├── (app)/                    # Route group for main application
│   │   ├── page.tsx             # Landing page (/)
│   │   ├── search/page.tsx      # Search results (/search)
│   │   ├── detail/[resourceId]/ # Resource detail (/detail/[id])
│   │   └── layout.tsx           # App-specific layout with navigation
│   ├── layout.tsx               # Root layout with theme provider
│   └── globals.css              # Global styles with CSS variables
├── components/                   # Reusable UI components
├── layout/                      # Layout-specific components
├── models/                      # TypeScript interfaces and types
├── services/                    # Business logic and mock data
├── contexts/                    # React Context providers
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
└── utils/                       # Helper functions
```

### Code Organization Patterns
- **Models**: Centralized TypeScript interfaces with barrel exports
- **Services**: Business logic separation with data services and utilities
- **Components**: Focused, reusable UI components with single responsibilities
- **Contexts**: Global state management for themes and cross-cutting concerns
- **Hooks**: Custom React hooks for reusable logic

## Component Architecture

### Component Hierarchy
```
App Layout
├── TopNavigation (sticky)
│   ├── Branding (logo + title)
│   ├── Navigation Links
│   ├── Language Switcher
│   ├── Theme Toggle
│   └── Mobile Menu
├── Main Content (flexible)
│   ├── Landing Page
│   │   ├── Hero Section
│   │   ├── Search Component
│   │   ├── Feature Showcase
│   │   └── Call-to-Action
│   ├── Search Page
│   │   ├── Search Component
│   │   ├── Filter Sidebar
│   │   ├── Results Display
│   │   └── Pagination
│   └── Detail Page
│       ├── Breadcrumbs
│       ├── Resource Header
│       ├── Tabbed Interface
│       └── Action Buttons
└── Footer (sticky)
    ├── Branding
    ├── Quick Links
    ├── Resources
    └── Contact Info
```

### Component Design Patterns
- **Functional Components**: All components use React function syntax with TypeScript
- **Props Interfaces**: Comprehensive typing for all component props
- **Composition Over Inheritance**: Components built from smaller, focused parts
- **Single Responsibility**: Each component has one clear purpose
- **Barrel Exports**: Clean import statements with index.ts files

## State Management Architecture

### Multi-Level State Strategy
1. **Global State (React Context)**
   - Theme preferences (light/dark mode)
   - User settings and preferences
   - Cross-component shared state

2. **URL State (Next.js Router)**
   - Search queries and parameters
   - Filter selections
   - Page navigation state
   - Deep linking support

3. **Component State (React useState)**
   - UI interactions (dropdowns, focus states)
   - Form inputs and validation
   - Loading states and error handling

4. **Derived State (React useMemo)**
   - Computed search results
   - Filtered and sorted data
   - Performance optimization

### State Persistence Patterns
- **Theme State**: Local storage with system preference detection
- **Search State**: URL parameters for deep linking and browser navigation
- **UI State**: Session-based persistence for better UX
- **Form State**: Optimistic updates with error recovery

## Data Flow Architecture

### Search Flow Pattern
```
User Input → Debounced Search → URL Update → Service Call → Results Display
     ↓
URL State ← Filter Updates ← User Selections ← Filter UI
     ↓
Deep Link ← Browser Navigation ← Back/Forward ← History API
```

### Navigation Flow Pattern
```
Landing Page
    ↓ (search query)
Search Results Page
    ↓ (resource selection)
Detail Page
    ↓ (back navigation with context)
Search Results Page (preserved state)
```

### Theme Flow Pattern
```
System Detection → Theme Context → CSS Variables → Component Styling
       ↓
Local Storage ← User Selection ← Theme Toggle ← UI Interaction
```

## Component Communication Patterns

### Props Down, Events Up
- **Data Flow**: Props passed down component hierarchy
- **Event Handling**: Callbacks and event handlers bubble up
- **State Lifting**: Shared state managed at appropriate level
- **Context Usage**: Global state for cross-cutting concerns

### Search Context Preservation
- **URL Parameters**: Search queries maintained in URL
- **Navigation State**: Back navigation preserves search context
- **Deep Linking**: Shareable URLs with complete state
- **Browser Integration**: History API for native navigation

## UI/UX Patterns

### Design System Implementation
- **CSS Variables**: Theme-aware color system
- **Tailwind Utilities**: Consistent spacing and typography
- **Component Variants**: Type-safe styling with class-variance-authority
- **Responsive Design**: Mobile-first breakpoint strategy
- **Accessibility**: WCAG 2.1 compliance with ARIA labels

### Interaction Patterns
- **Progressive Enhancement**: Core functionality without JavaScript
- **Keyboard Navigation**: Full keyboard accessibility
- **Loading States**: Skeleton components during async operations
- **Error Boundaries**: Graceful error handling and recovery
- **Smooth Transitions**: Animated state changes and theme switching

### Search Experience Patterns
- **Type-ahead Suggestions**: Live search with keyboard navigation
- **Faceted Filtering**: Multi-criteria filtering with visual feedback
- **Result Highlighting**: Search term emphasis in results
- **Contextual Actions**: Relevant actions based on resource type
- **Breadcrumb Navigation**: Clear navigation context

## Performance Patterns

### Optimization Strategies
- **Code Splitting**: Route-based splitting with Next.js App Router
- **Lazy Loading**: Dynamic imports for heavy components
- **Memoization**: React.memo and useMemo for expensive computations
- **Bundle Optimization**: Tree shaking and dead code elimination

### Loading Performance
- **Skeleton Loading**: Maintains layout during data fetching
- **Progressive Loading**: Results appear as they're received
- **Debounced Search**: Prevents excessive API calls
- **Caching Strategy**: Strategic caching of search results

### Theme Performance
- **CSS Variables**: Efficient theme switching without re-renders
- **Hydration Safety**: Prevents layout shift during theme initialization
- **System Detection**: Respects user's OS preferences
- **Transition Optimization**: Smooth animations without performance impact

## Error Handling Patterns

### Graceful Degradation
- **Context Fallbacks**: Default values when context unavailable
- **Service Errors**: Fallback UI when services fail
- **Network Errors**: Offline state and retry mechanisms
- **Type Safety**: TypeScript prevents runtime type errors

### User Feedback Patterns
- **Loading States**: Clear indicators during async operations
- **Error Messages**: Helpful, actionable error descriptions
- **Empty States**: Guidance when no content is available
- **Success Feedback**: Confirmation of user actions

## Security Patterns

### Input Validation
- **Client-side Validation**: Immediate user feedback
- **Type Safety**: TypeScript interface validation
- **URL Parameter Sanitization**: Safe handling of URL state
- **XSS Prevention**: Safe HTML rendering practices

### Content Security
- **Next.js Protection**: Built-in security features
- **CSS Variable Safety**: Secure theme implementation
- **Context Isolation**: Proper context boundaries
- **Error Information**: Secure error handling without data leaks

## Accessibility Patterns

### Universal Design
- **Semantic HTML**: Proper heading structure and landmarks
- **ARIA Implementation**: Screen reader support for complex interactions
- **Keyboard Navigation**: Tab order and keyboard shortcuts
- **Focus Management**: Proper focus handling in dynamic content

### Theme Accessibility
- **Color Contrast**: WCAG AA compliance in both themes
- **Motion Preferences**: Respects reduced motion settings
- **Screen Reader**: Theme changes announced appropriately
- **Keyboard Access**: Full theme functionality via keyboard

## Testing Patterns

### Component Testing Strategy
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interaction testing
- **Accessibility Tests**: Automated accessibility validation
- **Visual Tests**: Theme and responsive design validation

### Search Flow Testing
- **E2E Tests**: Complete user journey testing
- **API Mocking**: Predictable test data
- **State Testing**: URL state persistence validation
- **Performance Tests**: Search response time validation

This comprehensive pattern system ensures maintainable, scalable, and professional code organization while providing excellent user experience and developer productivity.