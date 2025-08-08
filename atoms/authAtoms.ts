import { atom } from 'jotai'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin'
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Authentication state atom
export const authStateAtom = atom<AuthState>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
})

// Individual auth atoms for easier access
export const userAtom = atom(
  (get) => get(authStateAtom).user,
  (get, set, user: User | null) => {
    const currentState = get(authStateAtom)
    set(authStateAtom, {
      ...currentState,
      user,
      isAuthenticated: !!user
    })
  }
)

export const isAuthenticatedAtom = atom(
  (get) => get(authStateAtom).isAuthenticated
)

export const authLoadingAtom = atom(
  (get) => get(authStateAtom).isLoading,
  (get, set, isLoading: boolean) => {
    const currentState = get(authStateAtom)
    set(authStateAtom, {
      ...currentState,
      isLoading
    })
  }
)

export const authErrorAtom = atom(
  (get) => get(authStateAtom).error,
  (get, set, error: string | null) => {
    const currentState = get(authStateAtom)
    set(authStateAtom, {
      ...currentState,
      error
    })
  }
)

// Helper functions for auth operations
export const loginAtom = atom(
  null,
  async (get, set, credentials: { email: string; password: string }) => {
    set(authLoadingAtom, true)
    set(authErrorAtom, null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data - in real app, this would come from API
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
        role: 'user',
        createdAt: new Date().toISOString()
      }
      
      set(userAtom, mockUser)
      
      // Store in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('discovery-ui-user', JSON.stringify(mockUser))
      }
    } catch (error) {
      set(authErrorAtom, error instanceof Error ? error.message : 'Login failed')
    } finally {
      set(authLoadingAtom, false)
    }
  }
)

export const signupAtom = atom(
  null,
  async (get, set, userData: { name: string; email: string; password: string }) => {
    set(authLoadingAtom, true)
    set(authErrorAtom, null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data - in real app, this would come from API
      const mockUser: User = {
        id: '1',
        name: userData.name,
        email: userData.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
        role: 'user',
        createdAt: new Date().toISOString()
      }
      
      set(userAtom, mockUser)
      
      // Store in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('discovery-ui-user', JSON.stringify(mockUser))
      }
    } catch (error) {
      set(authErrorAtom, error instanceof Error ? error.message : 'Signup failed')
    } finally {
      set(authLoadingAtom, false)
    }
  }
)

export const logoutAtom = atom(
  null,
  (get, set) => {
    set(userAtom, null)
    
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('discovery-ui-user')
    }
  }
)

// Initialize auth state from localStorage
export const initializeAuthAtom = atom(
  null,
  (get, set) => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('discovery-ui-user')
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser) as User
          set(userAtom, user)
        } catch (error) {
          console.error('Failed to parse stored user:', error)
          localStorage.removeItem('discovery-ui-user')
        }
      }
    }
  }
)
