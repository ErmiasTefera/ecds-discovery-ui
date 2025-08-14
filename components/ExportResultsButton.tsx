"use client"

import React from 'react'
import { useAtom } from 'jotai'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { paginatedResultsAtom, sortedResultsAtom } from '@/atoms/searchAtoms'
import type { SearchResult } from '@/models'

interface ExportResultsButtonProps {
  defaultScope?: 'page' | 'all'
}

const ExportResultsButton: React.FC<ExportResultsButtonProps> = ({ defaultScope = 'page' }) => {
  const [scope, setScope] = React.useState<'page' | 'all'>(defaultScope)
  const [pageResults] = useAtom(paginatedResultsAtom)
  const [allResults] = useAtom(sortedResultsAtom)

  const getData = (): SearchResult[] => (scope === 'page' ? pageResults : allResults)

  const toCSV = (items: SearchResult[]): string => {
    const headers = ['id','title','authors','year','type','journal','publisher','doi','url','citationCount','downloadCount','viewCount']
    const rows = items.map(r => [
      r.id,
      r.title,
      (r.authors || []).join('; '),
      String(r.year),
      r.type,
      r.journal || '',
      r.publisher || '',
      r.doi || '',
      r.url || '',
      String(r.citationCount ?? ''),
      String(r.downloadCount ?? ''),
      String(r.viewCount ?? '')
    ])
    const csv = [headers.join(','), ...rows.map(row => row.map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))].join('\n')
    return csv
  }

  const toJSON = (items: SearchResult[]): string => JSON.stringify(items, null, 2)

  const download = (content: string, filename: string, mime = 'text/plain') => {
    const blob = new Blob([content], { type: mime + ';charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleExportCSV = () => {
    const items = getData()
    download(toCSV(items), `search-results-${scope}.csv`, 'text/csv')
  }

  const handleExportJSON = () => {
    const items = getData()
    download(toJSON(items), `search-results-${scope}.json`, 'application/json')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export Results</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Scope</p>
            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-2 rounded-md text-sm border transition-colors ${scope==='page'?'bg-primary text-primary-foreground border-primary':'border-border hover:bg-secondary'}`}
                onClick={() => setScope('page')}
              >
                Current page ({pageResults.length})
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm border transition-colors ${scope==='all'?'bg-primary text-primary-foreground border-primary':'border-border hover:bg-secondary'}`}
                onClick={() => setScope('all')}
              >
                All results ({allResults.length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleExportCSV}>Export CSV</Button>
            <Button variant="outline" onClick={handleExportJSON}>Export JSON</Button>
          </div>

          <div className="flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ExportResultsButton


