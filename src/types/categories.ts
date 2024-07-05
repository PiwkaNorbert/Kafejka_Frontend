export type CategoryResponse = Category[]

export interface Category {
  id: number
  title: string
  children: Children[]
  tips: string

}

export interface Children {
  id: number
  title: string
  children: Children[]
  tips: string
}
