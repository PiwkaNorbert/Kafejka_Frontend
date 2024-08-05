import { useQuery } from '@tanstack/react-query'
import { CategoryResponse } from '../types/categories'
import { fetchTicketCategoryData } from '../fetch'

const useTicketCategoryData = () => {
  return useQuery<CategoryResponse>({
    queryKey: ['categories'],
    queryFn: ({ signal }) => fetchTicketCategoryData(signal),
  })
}

export default useTicketCategoryData