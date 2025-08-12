'use client'

import React from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { isAuthenticatedAtom } from '@/atoms/authAtoms'

const AuthButtons: React.FC = () => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom)

  if (isAuthenticated) return null

  return (
    <div className="flex items-center gap-5">
      {/* Sign In Button */}
      <Link
        href="/auth/sign-in"
        className="btn btn-neutral rounded-full"
      >
        <span>Log in</span>
      </Link>
    </div>
  )
}

export default AuthButtons
