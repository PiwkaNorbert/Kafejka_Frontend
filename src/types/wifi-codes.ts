export type GetWifiCodesResponse = Code[]

export interface Code {
  id: number
  nr: string
  data: string
  cz: string
  f: number
  w: number
}
