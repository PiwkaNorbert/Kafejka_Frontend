export type GetWifiCodesResponse = Code[]

export interface Code {
  model: string
  pk: number
  fields: Fields
}

export interface Fields {
  nr: string
  data: string
  cz: string
  f: number
  w: number
}
