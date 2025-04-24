export interface Category {
  id: number
  group: number
  title: string
  children: Category[]
  tips: string
}

export interface Printer {
  id: number
  name: string
}

export interface CategoryResponse {
  categories: Category[]
  printers: Printer[]
}
