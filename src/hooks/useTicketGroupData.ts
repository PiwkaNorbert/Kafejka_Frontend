import { useQuery } from '@tanstack/react-query'
import  type { GroupResponse } from '../types/groups'
import { fetchTicketGroupData } from '../fetch'

const useTicketGroupData = () => {
  return useQuery<GroupResponse>({
    queryKey: ['groups'],
    queryFn: ({ signal }) => fetchTicketGroupData(signal),
    throwOnError: true,
  })
}

export default useTicketGroupData
