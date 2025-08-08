'use client'

import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import { initializeAuthAtom } from '@/atoms/authAtoms'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [, initializeAuth] = useAtom(initializeAuthAtom)

  useEffect(() => {
    // Initialize auth state from localStorage on app load
    initializeAuth()
  }, [initializeAuth])

  return <>{children}</>
}

export default AuthProvider
