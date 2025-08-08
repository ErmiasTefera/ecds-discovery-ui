// HTTP Service for API calls with mock data simulation
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  timestamp: string
  requestId: string
}

export interface ApiError {
  error: string
  message: string
  status: number
  timestamp: string
  requestId: string
}

export interface SearchParams {
  query?: string
  page?: number
  limit?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  filters?: Record<string, string[]>
}

export interface DetailParams {
  id: string
}

export interface SuggestionParams {
  query: string
  limit?: number
}

class HttpService {
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.discovery-ui.com'
  private apiKey = process.env.NEXT_PUBLIC_API_KEY

  // Simulate network delay
  private async simulateDelay(minMs: number = 200, maxMs: number = 800): Promise<void> {
    const delay = Math.random() * (maxMs - minMs) + minMs
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  // Simulate occasional network errors
  private shouldSimulateError(): boolean {
    return Math.random() < 0.05 // 5% chance of error
  }

  // Generate realistic request ID
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Generic HTTP request method
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    mockData: T
  ): Promise<ApiResponse<T>> {
    const requestId = this.generateRequestId()
    
    // Simulate network delay
    await this.simulateDelay()
    
    // Simulate occasional errors
    if (this.shouldSimulateError()) {
      const error: ApiError = {
        error: 'NETWORK_ERROR',
        message: 'Network request failed. Please try again.',
        status: 500,
        timestamp: new Date().toISOString(),
        requestId
      }
      throw error
    }

    // Simulate successful API response
    const response: ApiResponse<T> = {
      data: mockData,
      success: true,
      message: 'Request completed successfully',
      timestamp: new Date().toISOString(),
      requestId
    }

    return response
  }

  // Search resources endpoint
  async searchResources(params: SearchParams, mockData: any): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams()
    
    if (params.query) queryParams.append('q', params.query)
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())
    if (params.sortBy) queryParams.append('sortBy', params.sortBy)
    if (params.sortDirection) queryParams.append('sortDirection', params.sortDirection)
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, values]) => {
        values.forEach(value => queryParams.append(`filter[${key}]`, value))
      })
    }

    const endpoint = `/api/search?${queryParams.toString()}`
    
    return this.makeRequest(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
      }
    }, mockData)
  }

  // Get search suggestions endpoint
  async getSearchSuggestions(params: SuggestionParams, mockData: any): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams()
    queryParams.append('q', params.query)
    if (params.limit) queryParams.append('limit', params.limit.toString())

    const endpoint = `/api/suggestions?${queryParams.toString()}`
    
    return this.makeRequest(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
      }
    }, mockData)
  }

  // Get resource detail endpoint
  async getResourceDetail(params: DetailParams, mockData: any): Promise<ApiResponse<any>> {
    const endpoint = `/api/resources/${params.id}`
    
    return this.makeRequest(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
      }
    }, mockData)
  }

  // Get filters endpoint
  async getFilters(mockData: any): Promise<ApiResponse<any>> {
    const endpoint = '/api/filters'
    
    return this.makeRequest(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
      }
    }, mockData)
  }

  // Health check endpoint
  async healthCheck(): Promise<ApiResponse<{ status: string; version: string }>> {
    const endpoint = '/api/health'
    
    return this.makeRequest(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }, { status: 'healthy', version: '1.0.0' })
  }

  // Get AI summary endpoint
  async getAISummary(resourceId: string): Promise<ApiResponse<{ summary: string }>> {
    const endpoint = `/api/resources/${resourceId}/summary`
    
    // Mock AI summary data
    const mockSummary = {
      summary: "This research paper presents a comprehensive analysis of machine learning applications in natural language processing. The authors demonstrate significant improvements in text classification accuracy through the implementation of transformer-based architectures. Key findings include enhanced performance on benchmark datasets and novel approaches to handling multilingual content. The study contributes valuable insights to the field of computational linguistics and provides practical recommendations for future research directions."
    }
    
    return this.makeRequest(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
      }
    }, mockSummary)
  }
}

// Export singleton instance
export const httpService = new HttpService()
