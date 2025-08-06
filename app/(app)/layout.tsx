import Footer from '@/layout/footer'
import TopNavigation from '@/layout/topnav'
import React from 'react'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-50">
            <TopNavigation />
        </div>
        <main className="flex-1">
            {children}
        </main>
        <Footer />
    </div>
  )
} 