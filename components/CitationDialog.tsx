"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Copy, Quote } from 'lucide-react'

interface CitationDialogProps {
  triggerLabel?: string
  apa: string
  mla: string
  chicago: string
}

const CitationDialog: React.FC<CitationDialogProps> = ({ triggerLabel = 'Cite', apa, mla, chicago }) => {
  const [active, setActive] = React.useState<'APA' | 'MLA' | 'Chicago'>('APA')

  const text = active === 'APA' ? apa : active === 'MLA' ? mla : chicago

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (e) {
      // noop
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-md transition-colors border border-border hover:bg-secondary`}
          >
            <Quote className="w-4 h-4 mr-2" />
            {triggerLabel}
          </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Generate Citation</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <div className="flex rounded-md overflow-hidden border border-border">
            {(['APA', 'MLA', 'Chicago'] as const).map((label) => (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={`flex-1 px-6 py-3 text-center text-sm font-medium transition-colors ${
                  active === label ? 'bg-background text-foreground' : 'bg-secondary text-foreground/80 hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-3 relative">
            <textarea
              className="w-full min-h-[110px] rounded-md border border-border bg-background p-4 text-foreground text-base leading-relaxed pr-12"
              readOnly
              value={text}
            />
            <button
              onClick={handleCopy}
              className="absolute right-3 top-3 inline-flex items-center justify-center rounded-md border border-border p-2 hover:bg-secondary transition-colors"
              aria-label="Copy citation"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CitationDialog


