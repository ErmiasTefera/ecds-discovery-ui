import Footer from '@/layout/footer'
import TopNavigation from '@/layout/topnav'
import React from 'react'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <TopNavigation />
        </div>
        <div>{children}</div>
        <Footer />
    </div>
  )
} 