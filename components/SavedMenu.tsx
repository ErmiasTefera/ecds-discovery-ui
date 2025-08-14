"use client"

import React from 'react'
import Link from 'next/link'
import { Bookmark } from 'lucide-react'
import { useAtom } from 'jotai'
import { savedResourcesAtom } from '@/atoms/collectionAtoms'

const SavedMenu: React.FC = () => {
  const [saved] = useAtom(savedResourcesAtom)
  return (
    <Link href="/saved" className="relative inline-flex items-center px-3 py-2 rounded-md border border-border hover:bg-secondary transition-colors text-sm">
      <Bookmark className="w-4 h-4 mr-2" />
      Saved
      {saved.length > 0 && (
        <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-xs">
          {saved.length}
        </span>
      )}
    </Link>
  )
}

export default SavedMenu


