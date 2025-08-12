import React from 'react'
import { Settings } from 'lucide-react'

interface AdvancedSearchTriggerProps {
  onOpen: () => void
}

const AdvancedSearchTrigger: React.FC<AdvancedSearchTriggerProps> = ({ onOpen }) => {
  return (
    <div className="mt-2 flex justify-end">
      <button
        onClick={onOpen}
        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        aria-label="Open advanced search options"
      >
        <Settings className="w-4 h-4" />
        Advanced Search
      </button>
    </div>
  )
}

export default AdvancedSearchTrigger


