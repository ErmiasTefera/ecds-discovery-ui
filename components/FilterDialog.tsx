import React from 'react'
import { Filter as FilterIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Filter from '@/components/Filter'
import { useAtom } from 'jotai'
import { clearAllFiltersAtom, commitDraftFiltersAtom, resetDraftFiltersAtom, editModeAtom, draftSelectedFiltersAtom } from '@/atoms/filterAtoms'
import { useRouter, useSearchParams } from 'next/navigation'

const FilterDialog: React.FC = () => {
  const [, clearAll] = useAtom(clearAllFiltersAtom)
  const [, commitDraft] = useAtom(commitDraftFiltersAtom)
  const [, resetDraft] = useAtom(resetDraftFiltersAtom)
  const [, setEditMode] = useAtom(editModeAtom)
  const [draftSelected] = useAtom(draftSelectedFiltersAtom)
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open filters">
          <FilterIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0" onOpenAutoFocus={() => { setEditMode('dialog'); resetDraft() }}>
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <Filter showActiveControls={false} />
        </div>
        <DialogFooter className="p-4 border-t">
          <DialogClose asChild>
            <Button
              variant="ghost"
              onClick={() => {
                clearAll()
                const params = new URLSearchParams(searchParams?.toString() || '')
                params.delete('facets')
                router.push(`/search?${params.toString()}`)
              }}
            >
              Clear
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                commitDraft()
                const params = new URLSearchParams(searchParams?.toString() || '')
                params.set('facets', encodeURIComponent(JSON.stringify(draftSelected)))
                router.push(`/search?${params.toString()}`)
              }}
            >
              Apply
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FilterDialog


