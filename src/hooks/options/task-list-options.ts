import { IP_POWROZNICZA } from '@/constants'
import { fetchApi } from '@/lib/custom-fetch'
import { TaskListResponse } from '@/types/unauthed-task-list'
import { queryOptions } from '@tanstack/react-query'

const KEYS = {
  BASE: 'unautherized-tasks',
} as const

type QueryKeys = [typeof KEYS.BASE] | [typeof KEYS.BASE, string | undefined]

export const taskListQueryKeys = {
  all: [KEYS.BASE],
  byFilia: (filia: string) => [KEYS.BASE, filia] as const,
} satisfies Record<string, QueryKeys | ((...args: any[]) => QueryKeys)>


export const taskListOptions = (filia: string) => queryOptions({
  queryKey: taskListQueryKeys.byFilia(filia),
  queryFn: ({ signal }) => fetchApi<TaskListResponse>({ url: IP_POWROZNICZA, port: '8080', path: `/unauthorized-tasks/${filia}` }, { signal: signal as AbortSignal }),
  enabled: typeof filia === 'string',
})
