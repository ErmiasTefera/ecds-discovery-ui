import React from 'react'
import { useAtom } from 'jotai'
import { currentPageAtom, totalPagesAtom, searchLoadingAtom } from '@/atoms/searchAtoms'

const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)
  const [totalPages] = useAtom(totalPagesAtom)
  const [isLoading] = useAtom(searchLoadingAtom)

  if (isLoading || totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 border border-border rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-2 border rounded-md transition-colors ${
            currentPage === page
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border hover:bg-secondary'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border border-border rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination


