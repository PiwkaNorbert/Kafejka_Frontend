import { useQuery } from '@tanstack/react-query'
import { TaskListResponse } from '../types/unauthed-task-list'
import { getTaskList } from '../fetch'



const useTaskListData = (filia: string) => {
  return useQuery<TaskListResponse>({
    queryKey: ['unautherized-tasks'],
    queryFn: ({ signal }) => getTaskList(filia, signal),
    enabled: filia !== undefined,
  })
}

export default useTaskListData
