import React from 'react'

interface QuickSearchTipsProps {
  terms?: string[]
  onSelect: (term: string) => void
}

const DEFAULT_TERMS = [
  'machine learning',
  'climate change',
  'quantum computing',
  'artificial intelligence',
]

const QuickSearchTips: React.FC<QuickSearchTipsProps> = ({ terms = DEFAULT_TERMS, onSelect }) => {
  return (
    <div className="mt-4 flex flex-wrap gap-2 justify-center">
      <span className="text-sm text-muted-foreground">Try:</span>
      {terms.map((term) => (
        <button
          key={term}
          onClick={() => onSelect(term)}
          className="px-3 py-1 bg-secondary/50 hover:bg-secondary text-sm text-foreground rounded-full transition-colors"
        >
          {term}
        </button>
      ))}
    </div>
  )
}

export default QuickSearchTips


