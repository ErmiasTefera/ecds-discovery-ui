import Footer from '@/layout/footer'
import TopNavigation from '@/layout/topnav'
import React, { Suspense } from 'react'

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
            <Suspense fallback={<div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>}>
                {children}
            </Suspense>
        </main>
        <Footer />
    </div>
  )
} 