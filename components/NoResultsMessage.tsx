import React from 'react'

interface NoResultsMessageProps {
  message?: string
}

const NoResultsMessage: React.FC<NoResultsMessageProps> = ({
  message = 'No matching results found. Press Enter to search all databases.',
}) => {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50">
      <div className="p-4">
        <div className="text-sm text-muted-foreground text-left">{message}</div>
      </div>
    </div>
  )
}

export default NoResultsMessage


