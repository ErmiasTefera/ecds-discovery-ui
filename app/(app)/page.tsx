import React from 'react'
import { BookOpen, Database, GraduationCap, Clock, LucideIcon } from 'lucide-react'
import SearchComponent from '@/components/Search'

interface QuickStat {
  id: string
  value: string
  label: string
  icon: LucideIcon
}

const quickStats: QuickStat[] = [
  {
    id: 'resources',
    value: '10M+',
    label: 'Resources',
    icon: BookOpen
  },
  {
    id: 'databases',
    value: '500+',
    label: 'Databases',
    icon: Database
  },
  {
    id: 'universities',
    value: '100+',
    label: 'Universities',
    icon: GraduationCap
  },
  {
    id: 'access',
    value: '24/7',
    label: 'Access',
    icon: Clock
  }
]

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
              {quickStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div 
                    key={stat.id}
                    className="card shadow-xl p-6 text-center hover:shadow-xl transition-shadow border-1"
                  >
                    <div className="flex justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
