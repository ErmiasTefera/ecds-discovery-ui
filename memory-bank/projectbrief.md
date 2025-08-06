# Project Brief: Discovery UI

## Overview
Discovery UI is a modern web application designed to provide unified access to scholarly resources from multiple sources including library catalogs, institutional repositories, subscription databases, and open-access archives. The application serves as a centralized discovery platform for academic and research materials.

## Core Objectives
- **Unified Search Experience**: Single interface to search across multiple scholarly resource types
- **Advanced Discovery Features**: Type-ahead search, spell correction, and comprehensive filtering
- **User-Friendly Interface**: Modern, responsive design with intuitive navigation and dark/light theme support
- **Detailed Resource Views**: Rich metadata display with contextual information and tabbed interfaces

## Key Features
1. **Smart Search**: Live type-ahead with debouncing, spelling corrections, keyboard navigation, and contextual suggestions
2. **Advanced Filtering**: Multi-faceted filtering with faceted search, expandable groups, and clear filters
3. **Resource Details**: Comprehensive metadata display with tabbed sections, citations, references, and related resources
4. **Responsive Design**: Mobile-first approach with modern UI patterns and accessibility features
5. **Theme Support**: Dark/light mode toggle with system preference detection and persistence
6. **Search Persistence**: URL-based search state management for deep linking and browser navigation

## Technology Stack
- **Framework**: Next.js 15.4.5 with App Router
- **Frontend**: React 19.1.0, TypeScript 5
- **Styling**: Tailwind CSS 4, class-variance-authority for component variants
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: Lucide React
- **State Management**: React Context (Theme), URL parameters (Search state)
- **Development**: ESLint, Turbopack for fast development

## Architecture
- **Models**: Centralized TypeScript interfaces in `/models` directory
- **Services**: Mock data and business logic in `/services` directory  
- **Components**: Reusable UI components with proper separation of concerns
- **Contexts**: Theme management with React Context and local storage persistence
- **Hooks**: Custom hooks for theme functionality and reusable logic

## Project Structure
- **App Router**: Organized with (app) group for main application routes
- **Component Architecture**: Modular components with clear separation of concerns
- **Layout System**: Reusable layout components (topnav, footer) with theme integration
- **Type Safety**: Full TypeScript implementation with centralized model definitions
- **Code Organization**: Clean separation between models, services, components, and contexts

## Success Criteria
- Fast, responsive search experience with sub-500ms results
- Comprehensive resource discovery capabilities with advanced filtering
- Intuitive user interface matching modern web standards with accessibility compliance
- Scalable architecture for future enhancements and real API integration
- Professional theme system with seamless dark/light mode switching