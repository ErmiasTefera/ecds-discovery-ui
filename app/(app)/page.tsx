import React from 'react'
import Link from 'next/link'
import { Search, BookOpen, Database, Globe, Users, ArrowRight, CheckCircle } from 'lucide-react'
import SearchComponent from '@/components/Search'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Hero Title */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Discover Scholarly
                <span className="text-primary block">Resources</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Access library catalogs, institutional repositories, subscription databases, 
                and open-access archives in one intelligent search interface.
              </p>
            </div>

            {/* Search Component */}
            <div className="mb-12">
              <SearchComponent />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">10M+</div>
                <div className="text-sm text-muted-foreground">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Databases</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Universities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Access</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Start Advanced Search
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center px-8 py-4 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Unified Academic Discovery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search across multiple scholarly databases and repositories with our intelligent platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Smart Search</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Advanced search with type-ahead suggestions, spell correction, and intelligent filtering
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Live type-ahead results
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Spell correction
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Keyboard navigation
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Multiple Sources</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Access content from library catalogs, repositories, and subscription databases
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Library catalogs
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Institutional repositories
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Open access archives
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Rich Metadata</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Comprehensive resource information with citations and linked materials
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Full citations
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Author information
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Related resources
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Global Access</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Worldwide scholarly content with multi-language support and localization
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Multi-language interface
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  International databases
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Regional repositories
                </li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Collaboration</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Share searches, export results, and collaborate with research teams
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Export results
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Share search URLs
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Citation formats
                </li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Easy Navigation</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Intuitive interface with advanced filtering and result management
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Faceted filtering
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Sort options
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  Pagination controls
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Start Discovering?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join researchers and academics worldwide in finding the scholarly resources you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Begin Your Search
              <Search className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center px-8 py-4 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
