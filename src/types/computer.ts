
export type ComputerArray = Computer[]


export interface Computer {
  id: number
  f: 0 | 1 | 2 | 3 | 5 | 6 
  ol: number
  t: number
  online: number
  label: string
  last_fetch: string
  filia: number
  timestamp_time: number | null
  katalog: number
  shutdown_timeout: string
}

export interface ComputerIndexProps {
  computer: Computer
  index: number
  showComps: boolean
}
export interface ComputerShutdownProps {
  computerID: number
  online: number
}
export interface TimerUntilShutdownProps {
  computerID: number
  timestampTime: number | null
}
export interface ComputerOnlineStatusProps {
  computer: Computer
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