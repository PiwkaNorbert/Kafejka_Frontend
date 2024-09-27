
export type GetCodesResponse = Codes[]

export interface Codes {
  ID: number;
  FiliaIndex: number;
  FiliaName: string;
  Link: string;
  CodesNumber: number;
  EmpikNumber: number;
  Address: string;
}
