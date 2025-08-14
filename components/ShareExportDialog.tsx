"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Copy, QrCode, Share } from 'lucide-react'
import type { DetailResource } from '@/models'

interface ShareExportDialogProps {
  resource: DetailResource
}

const ShareExportDialog: React.FC<ShareExportDialogProps> = ({ resource }) => {
  const [activeTab, setActiveTab] = React.useState<'share' | 'export'>('share')
  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null)

  const link = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopy = async (text: string) => {
    try { await navigator.clipboard.writeText(text) } catch {}
  }

  // Lazy-generate a QR code using a lightweight data URI API (no extra deps)
  const generateQr = async () => {
    // Use Google Chart API as a quick QR generator
    const encoded = encodeURIComponent(link)
    const url = `https://chart.googleapis.com/chart?cht=qr&chs=240x240&chl=${encoded}`
    setQrDataUrl(url)
  }

  const toBibTeX = (): string => {
    const authors = (resource.authors || []).map(a => a.replace(/,/g, '')).join(' and ')
    const key = `${(resource.authors?.[0] || 'author').split(' ')[0]}${resource.year}`
    if (resource.type === 'article') {
      return `@article{${key},\n  title={${resource.title}},\n  author={${authors}},\n  journal={${resource.journal || ''}},\n  year={${resource.year}},\n  volume={${resource.volume || ''}},\n  number={${resource.issue || ''}},\n  pages={${resource.pages || ''}},\n  doi={${resource.doi || ''}}\n}`
    }
    if (resource.type === 'book') {
      return `@book{${key},\n  title={${resource.title}},\n  author={${authors}},\n  publisher={${resource.publisher || ''}},\n  year={${resource.year}},\n  isbn={${resource.isbn || ''}}\n}`
    }
    return `@misc{${key},\n  title={${resource.title}},\n  author={${authors}},\n  year={${resource.year}}\n}`
  }

  const toRIS = (): string => {
    const typeMap: Record<DetailResource['type'], string> = { article: 'JOUR', book: 'BOOK', thesis: 'THES' }
    const lines: string[] = []
    lines.push(`TY  - ${typeMap[resource.type]}`)
    resource.authors?.forEach(a => lines.push(`AU  - ${a}`))
    lines.push(`TI  - ${resource.title}`)
    if (resource.journal) lines.push(`JO  - ${resource.journal}`)
    if (resource.publisher) lines.push(`PB  - ${resource.publisher}`)
    if (resource.volume) lines.push(`VL  - ${resource.volume}`)
    if (resource.issue) lines.push(`IS  - ${resource.issue}`)
    if (resource.pages) lines.push(`SP  - ${resource.pages}`)
    lines.push(`PY  - ${resource.year}`)
    if (resource.doi) lines.push(`DO  - ${resource.doi}`)
    lines.push('ER  - ')
    return lines.join('\n')
  }

  const toCSV = (): string => {
    const headers = ['id','title','authors','year','type','journal','publisher','doi','url']
    const row = [
      resource.id,
      resource.title,
      (resource.authors || []).join('; '),
      String(resource.year),
      resource.type,
      resource.journal || '',
      resource.publisher || '',
      resource.doi || '',
      resource.url || ''
    ]
    return `${headers.join(',')}\n${row.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')}`
  }

  const toJSON = (): string => JSON.stringify(resource, null, 2)

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
        <Share className="w-4 h-4 mr-2" />
          Share & Export</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share & Export</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mb-3">
          {(['share','export'] as const).map(key => (
            <button key={key} onClick={() => setActiveTab(key)} className={`px-3 py-2 rounded-md text-sm border transition-colors ${activeTab===key?'bg-primary text-primary-foreground border-primary':'border-border hover:bg-secondary'}`}>{key==='share'?'Share':'Export'}</button>
          ))}
        </div>

        {activeTab === 'share' ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Direct link</p>
              <div className="relative">
                <input readOnly value={link} className="w-full rounded-md border border-border bg-background px-3 py-2 pr-12 text-sm" />
                <button onClick={() => handleCopy(link)} className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md border border-border p-2 hover:bg-secondary transition-colors" aria-label="Copy link"><Copy className="w-4 h-4"/></button>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">QR Code</p>
              <div className="flex items-center gap-3">
                <div className="w-40 h-40 border border-border rounded-md flex items-center justify-center bg-white">
                  {qrDataUrl ? (<img src={qrDataUrl} alt="QR" className="w-full h-full object-contain"/>) : (
                    <QrCode className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => download(toCSV(), `${resource.id}.csv`, 'text/csv')}>Export CSV</Button>
            <Button variant="outline" onClick={() => download(toJSON(), `${resource.id}.json`, 'application/json')}>Export JSON</Button>
            <Button variant="outline" onClick={() => download(toRIS(), `${resource.id}.ris`, 'application/x-research-info-systems')}>Export RIS</Button>
            <Button variant="outline" onClick={() => download(toBibTeX(), `${resource.id}.bib`, 'application/x-bibtex')}>Export BibTeX</Button>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShareExportDialog


