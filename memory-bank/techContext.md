# Technical Context: Discovery UI

## Technology Stack

### Core Framework
- **Next.js 15.4.5**: Latest version with App Router
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 5**: Full type safety across the application
- **Node.js**: Runtime environment (version defined by Next.js)

### Styling & UI
- **Tailwind CSS 4**: Utility-first CSS framework
- **class-variance-authority 0.7.1**: Type-safe component variants
- **clsx 2.1.1**: Conditional className utility
- **tailwind-merge 3.3.1**: Merge Tailwind classes intelligently
- **tw-animate-css 1.3.6**: CSS animations with Tailwind

### Icons & Assets
- **Lucide React 0.536.0**: Consistent icon system
- **Next.js Image**: Optimized image handling

### Development Tools
- **ESLint 9**: Code linting with Next.js config
- **PostCSS**: CSS processing
- **Turbopack**: Fast development builds (Next.js bundler)

## Development Environment

### Package Management
- **npm**: Primary package manager
- **package-lock.json**: Dependency lock file for reproducible builds

### Scripts
- `npm run dev`: Development server with Turbopack
- `npm run build`: Production build
- `npm run start`: Production server
- `npm run lint`: Code linting

### TypeScript Configuration
- Strict mode enabled
- Next.js TypeScript plugin
- Path mapping configured (@/ for root-relative imports)

## Build & Deployment

### Next.js Configuration
- App Router enabled
- TypeScript support configured
- Image optimization enabled
- Production optimizations active

### PostCSS Configuration
- Tailwind CSS processing
- CSS optimization for production

### ESLint Configuration
- Next.js recommended rules
- TypeScript integration
- Custom rules for project patterns

## File Structure Conventions

### Import Patterns
- `@/` prefix for root-relative imports
- Absolute paths preferred for clarity
- Component imports from `/components`
- Layout imports from `/layout`
- Utility imports from `/lib` and `/utils`

### Component Patterns
- Functional components with TypeScript
- Props interfaces defined per component
- Default exports for page components
- Named exports for utility components

### Styling Patterns
- Tailwind utility classes
- Component-scoped CSS modules when needed
- CSS variables for theming
- Responsive design mobile-first

## API Integration Strategy

### Data Fetching
- Server Components for initial data
- Client Components for interactive features
- React Server Components for optimal performance
- Streaming for progressive loading

### State Management
- URL state for search parameters
- React state for UI interactions
- Server state for data fetching
- No external state management library (using React built-ins)

## Performance Considerations

### Bundle Optimization
- Automatic code splitting by route
- Dynamic imports for heavy components
- Tree shaking for unused code
- Image optimization with Next.js Image

### Runtime Performance
- Server-side rendering for initial load
- Client-side navigation for subsequent routes
- Debounced search to reduce API calls
- Skeleton loading for perceived performance

## Security Configuration

### Type Safety
- Strict TypeScript configuration
- Runtime type validation where needed
- Props validation through TypeScript interfaces

### Content Security
- Next.js built-in XSS protection
- Safe HTML rendering
- URL parameter sanitization
- Input validation on client and server

## Development Workflow

### Local Development
1. `npm install` - Install dependencies
2. `npm run dev` - Start development server
3. http://localhost:3000 - Access application
4. Hot reload enabled for rapid development

### Code Quality
- ESLint for code consistency
- TypeScript for type safety
- Automatic formatting recommendations
- Git hooks for quality gates (if configured)

### Testing Strategy
- Component testing (framework TBD)
- Integration testing for user flows
- E2E testing for critical paths
- Performance testing for search functionality

## Browser Support
- Modern browsers (ES2020+)
- Progressive enhancement approach
- Responsive design for all screen sizes
- Accessibility compliance (WCAG 2.1)

## Dependencies Management
- Regular updates for security patches
- Semantic versioning adherence
- Lock file maintenance
- Vulnerability scanning (recommended)