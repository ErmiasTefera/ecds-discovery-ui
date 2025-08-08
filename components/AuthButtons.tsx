'use client'

import React from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { LogIn, UserPlus } from 'lucide-react'
import { isAuthenticatedAtom } from '@/atoms/authAtoms'

const AuthButtons: React.FC = () => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom)

  if (isAuthenticated) return null

  return (
    <div className="flex items-center space-x-2">
      {/* Sign In Button */}
      <Link
        href="/auth/sign-in"
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Sign in</span>
      </Link>

      {/* Sign Up Button */}
      <Link
        href="/auth/sign-up"
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors"
      >
        <UserPlus className="w-4 h-4" />
        <span className="hidden sm:inline">Sign up</span>
      </Link>
    </div>
  )
}

export default AuthButtons
