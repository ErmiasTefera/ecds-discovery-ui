export interface FilterOption {
  id: string
  label: string
  count: number
}

export interface FilterGroup {
  id: string
  title: string
  options: FilterOption[]
  type: 'checkbox' | 'radio'
}