'use client'

import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import { initializeAuthAtom, isAuthenticatedAtom } from '@/atoms/authAtoms'
import { loadCollectionsAtom } from '@/atoms/collectionAtoms'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [, initializeAuth] = useAtom(initializeAuthAtom)
  const [isAuthenticated] = useAtom(isAuthenticatedAtom)
  const [, loadCollections] = useAtom(loadCollectionsAtom)

  useEffect(() => {
    // Initialize auth state from localStorage on app load
    initializeAuth()
  }, [initializeAuth])

  useEffect(() => {
    // Load collections when user is authenticated
    if (isAuthenticated) {
      loadCollections()
    }
  }, [isAuthenticated, loadCollections])

  return <>{children}</>
}

export default AuthProvider
