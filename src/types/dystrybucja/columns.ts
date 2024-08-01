
export type ColumnResponse = {
  columns: string[]
  rows: Row[]
}

export type Report = {
  response: string
  id: number
}

export interface Row {
  [key: string]: string | Report
  entity: string
}
