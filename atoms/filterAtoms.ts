import { atom } from 'jotai'
import type { FilterGroup } from '@/models'

// Core filter state
export const filtersAtom = atom<FilterGroup[]>([])
export const filtersLoadingAtom = atom<boolean>(true)
export const filtersErrorAtom = atom<boolean>(false)

// UI state
export const selectedFiltersAtom = atom<Record<string, string[]>>({})
export const draftSelectedFiltersAtom = atom<Record<string, string[]>>({})
export const editModeAtom = atom<'sidebar' | 'dialog'>('sidebar')
export const expandedGroupsAtom = atom<Record<string, boolean>>({
  type: true,
  year: true,
  subject: false,
  access: false,
  language: false,
})
export const showMoreAtom = atom<Record<string, boolean>>({})

// Derived
export const totalSelectedCountAtom = atom((get) =>
  Object.values(get(selectedFiltersAtom)).reduce((total, arr) => total + arr.length, 0)
)

export const totalDraftSelectedCountAtom = atom((get) =>
  Object.values(get(draftSelectedFiltersAtom)).reduce((total, arr) => total + arr.length, 0)
)

// Commit/cancel draft
export const commitDraftFiltersAtom = atom(null, (get, set) => {
  set(selectedFiltersAtom, get(draftSelectedFiltersAtom))
})

export const resetDraftFiltersAtom = atom(null, (get, set) => {
  set(draftSelectedFiltersAtom, get(selectedFiltersAtom))
})

// Actions
export const changeFilterSelectionAtom = atom(
  null,
  (get, set, params: { groupId: string; optionId: string; checked: boolean }) => {
    const isDialog = get(editModeAtom) === 'dialog'
    const baseAtom = isDialog ? draftSelectedFiltersAtom : selectedFiltersAtom
    const prev = get(baseAtom)
    const groupFilters = prev[params.groupId] || []
    const next = params.checked
      ? { ...prev, [params.groupId]: [...groupFilters, params.optionId] }
      : { ...prev, [params.groupId]: groupFilters.filter((id) => id !== params.optionId) }
    set(baseAtom, next)
    // If modifying committed state (sidebar), keep draft in sync so dialog reflects current
    if (!isDialog) {
      set(draftSelectedFiltersAtom, next)
    }
  }
)

export const removeFilterAtom = atom(
  null,
  (get, set, params: { groupId: string; optionId: string }) => {
    const isDialog = get(editModeAtom) === 'dialog'
    const baseAtom = isDialog ? draftSelectedFiltersAtom : selectedFiltersAtom
    const prev = get(baseAtom)
    const groupFilters = prev[params.groupId] || []
    const next = { ...prev, [params.groupId]: groupFilters.filter((id) => id !== params.optionId) }
    set(baseAtom, next)
    if (!isDialog) {
      set(draftSelectedFiltersAtom, next)
    }
  }
)

export const clearAllFiltersAtom = atom(null, (get, set) => {
  const isDialog = get(editModeAtom) === 'dialog'
  if (isDialog) {
    set(draftSelectedFiltersAtom, {})
  } else {
    set(selectedFiltersAtom, {})
    set(draftSelectedFiltersAtom, {})
  }
})

export const clearCommittedFiltersAtom = atom(null, (_get, set) => {
  set(selectedFiltersAtom, {})
  set(draftSelectedFiltersAtom, {})
})

export const toggleGroupAtom = atom(
  null,
  (get, set, groupId: string) => {
    const prev = get(expandedGroupsAtom)
    set(expandedGroupsAtom, { ...prev, [groupId]: !prev[groupId] })
  }
)

export const toggleShowMoreAtom = atom(
  null,
  (get, set, groupId: string) => {
    const prev = get(showMoreAtom)
    set(showMoreAtom, { ...prev, [groupId]: !prev[groupId] })
  }
)

export const removeCommittedFilterAtom = atom(
  null,
  (get, set, params: { groupId: string; optionId: string }) => {
    const committed = get(selectedFiltersAtom)
    const draft = get(draftSelectedFiltersAtom)
    const committedGroup = committed[params.groupId] || []
    const draftGroup = draft[params.groupId] || []

    set(selectedFiltersAtom, {
      ...committed,
      [params.groupId]: committedGroup.filter((id) => id !== params.optionId),
    })
    set(draftSelectedFiltersAtom, {
      ...draft,
      [params.groupId]: draftGroup.filter((id) => id !== params.optionId),
    })
  }
)


