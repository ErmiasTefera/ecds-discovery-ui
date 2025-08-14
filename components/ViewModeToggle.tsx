import React from 'react'
import { useAtom } from 'jotai'
import { Grid, List } from 'lucide-react'
import { viewModeAtom } from '@/atoms/searchAtoms'

const ViewModeToggle: React.FC = () => {
  const [viewMode, setViewMode] = useAtom(viewModeAtom)

  return (
    <div className="flex items-center gap-2">
      <div className="flex border border-border rounded-md">
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-l-md transition-colors ${
            viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
          }`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded-r-md transition-colors ${
            viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
          }`}
        >
          <Grid className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default ViewModeToggle


