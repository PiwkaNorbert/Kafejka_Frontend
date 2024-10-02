import { Dispatch, SetStateAction } from "react"

export type ComputerArray = Computer[]

export interface Computer {
  model: string
  pk: number
  fields: Fields
}

export interface Fields {
  f: 0 | 1 | 2 | 3 | 5 | 6 
  ol: number
  t: number
  online: number
  label: string
  filia: number
  timestamp_time: number | null
  katalog: number
  shutdown_timeout: string
}

export interface ComputerIndexProps {
  computer: Computer
  index: number
  url: string
  showComps: boolean
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
}
export interface ComputerShutdownProps {
  computerID: number
  online: number
  url: string
}
export interface TimerUntilShutdownProps {
  computerID: number
  timestampTime: number | null
}
export interface ComputerOnlineStatusProps {
  computer: Computer
  url: string
}

export interface StateData {
  id: number;
  flag?: 0 | 1 | 2 | 3 | 6;
  filia?: string;
  katalog?: 0 | 1;
  t?: number;

}

export type RequestBodyType = {
  id: number;
  f?: 0 | 1 | 2 | 3 | 6; 
  filia?: string; 
  katalog?: 0 | 1;
  t?: number;

};