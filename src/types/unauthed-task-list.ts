export interface TaskListResponse {
  tasks_list: TasksList[]
  states: [number, string][]
}

export interface TasksList {
  id: number
  created: string
  tasks_list: null
  region_name: string
  entity: number
  entity_name: string
  title: string
  description: string
  state: number
  state_string: string
  state_history: StateHistory[]
  participants: string[]
  completion_date: null | string
}

export interface StateHistory {
  date: string
  user: string
  state: string
}
