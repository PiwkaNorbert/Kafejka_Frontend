
export type GetCodesResponse = Codes[]

export interface Codes {
  model: string
  pk: number
  fields: Fields
}

export interface Fields {
  index: number
  filiaName: string
  link: string
  codesNumber: number
  empikNumber: number
  address: string
}
