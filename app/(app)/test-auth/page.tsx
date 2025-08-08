'use client'

import React from 'react'
import { useAtom } from 'jotai'
import { userAtom, isAuthenticatedAtom, authLoadingAtom } from '@/atoms/authAtoms'

const TestAuthPage: React.FC = () => {
  const [user] = useAtom(userAtom)
  const [isAuthenticated] = useAtom(isAuthenticatedAtom)
  const [isLoading] = useAtom(authLoadingAtom)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Authentication Test Page</h1>
        
        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg">
            <h2 className="text-lg font-semibold text-foreground mb-2">Authentication Status</h2>
            <p className="text-muted-foreground">
              <strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
            </p>
            <p className="text-muted-foreground">
              <strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}
            </p>
          </div>

          {user && (
            <div className="p-4 border border-border rounded-lg">
              <h2 className="text-lg font-semibold text-foreground mb-2">User Information</h2>
              <p className="text-muted-foreground">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="text-muted-foreground">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-muted-foreground">
                <strong>Role:</strong> {user.role}
              </p>
              <p className="text-muted-foreground">
                <strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="p-4 border border-border rounded-lg">
            <h2 className="text-lg font-semibold text-foreground mb-2">Test Links</h2>
            <div className="space-y-2">
              <a 
                href="/auth/sign-in" 
                className="block text-primary hover:text-primary/80 transition-colors"
              >
                Go to Sign In Page
              </a>
              <a 
                href="/auth/sign-up" 
                className="block text-primary hover:text-primary/80 transition-colors"
              >
                Go to Sign Up Page
              </a>
              <a 
                href="/" 
                className="block text-primary hover:text-primary/80 transition-colors"
              >
                Go to Home Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestAuthPage
