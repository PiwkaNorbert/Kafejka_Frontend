import { useQuery } from '@tanstack/react-query'
import type { CategoryResponse } from '../types/categories'
import { fetchTicketCategoryData } from '../fetch'

const useTicketCategoryData = (filia: string) => {
  return useQuery<CategoryResponse>({
    queryKey: ['categories', filia],
    queryFn: ({ signal }) => fetchTicketCategoryData(filia, signal),
  })
}

export default useTicketCategoryData
