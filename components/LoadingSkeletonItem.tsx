import React from 'react'

const LoadingSkeletonItem: React.FC = () => {
  return (
    <div className="bg-background border border-border rounded-lg p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-shrink-0 mt-1">
            <div className="w-5 h-5 bg-muted rounded"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-20 h-6 bg-muted rounded-full"></div>
              <div className="w-12 h-4 bg-muted rounded"></div>
            </div>
            <div className="w-4/5 h-6 bg-muted rounded mb-2"></div>
            <div className="w-3/5 h-6 bg-muted rounded mb-2"></div>
            <div className="w-2/3 h-4 bg-muted rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-muted rounded mb-3"></div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="w-full h-4 bg-muted rounded"></div>
        <div className="w-5/6 h-4 bg-muted rounded"></div>
        <div className="w-4/5 h-4 bg-muted rounded"></div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="w-16 h-6 bg-muted rounded-md"></div>
        <div className="w-20 h-6 bg-muted rounded-md"></div>
        <div className="w-14 h-6 bg-muted rounded-md"></div>
        <div className="w-18 h-6 bg-muted rounded-md"></div>
      </div>

      {/* Metrics and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-muted rounded"></div>
            <div className="w-16 h-3 bg-muted rounded"></div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-muted rounded"></div>
            <div className="w-20 h-3 bg-muted rounded"></div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-12 h-6 bg-muted rounded-md"></div>
          <div className="w-12 h-6 bg-muted rounded-md"></div>
          <div className="w-16 h-6 bg-muted rounded-md"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeletonItem
