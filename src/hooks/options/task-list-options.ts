import { fetchUnauthorizedTasks } from '@/fetch'
import { queryOptions } from '@tanstack/react-query'

const KEYS = {
  BASE: 'unautherized-tasks',
} as const

type QueryKeys = [typeof KEYS.BASE] | [typeof KEYS.BASE, string | undefined]

export const taskListQueryKeys = {
  all: [KEYS.BASE],
  byFilia: (filia: string) => [KEYS.BASE, filia] as const,
} satisfies Record<string, QueryKeys | ((...args: any[]) => QueryKeys)>

export const taskListOptions = (filia: string) =>
  queryOptions({
    queryKey: taskListQueryKeys.byFilia(filia),
    queryFn: ({ signal }) => fetchUnauthorizedTasks(filia, signal),
    enabled: typeof filia === 'string',
  })
