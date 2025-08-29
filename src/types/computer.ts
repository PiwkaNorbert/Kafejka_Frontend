export type ComputerArray = Computer[]

export interface Flags {
  f: 2 | 3 | 5 | 6
}

interface OnlineStatus {
  ol: 1 | 0
}

export interface Computer extends Flags, OnlineStatus {
  id: number
  t: number
  online: number
  label: string
  last_fetch: string
  filia: number
  timestamp_time: number | null
  katalog: number
  is_connected: number
}

export interface ComputerIndexProps {
  computer: Computer
  index: number
  showComps: boolean
}
export interface ComputerShutdownProps {
  computerID: number
  filia: string
  online: number
}

export interface TimerUntilShutdownProps {
  computerID: number
  timestampTime: number | null
}
export interface ComputerOnlineStatusProps {
  computer: Computer
  filia: string
}

export interface StateData {
  id: number
  flag?: Flags['f']
  filia?: string
  katalog?: 0 | 1
  t?: number
  ol?: 0 | 1
}

export type RequestBodyType = {
  id: number
  f?: Flags['f']
  filia?: string
  katalog?: 0 | 1
  t?: number
  ol?: 0 | 1
}
