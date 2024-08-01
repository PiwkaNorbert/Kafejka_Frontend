import { useQuery } from '@tanstack/react-query'
import { fetchReportColumnData, fetchReportData } from '../fetch'
import { ColumnResponse } from '../types/dystrybucja/columns'
import { MakulatoraResponse } from '../types/dystrybucja/raports'




const useReportData = (filia: string) => {
    return useQuery<MakulatoraResponse>({
        queryKey: ['reports'],
        queryFn: ({ signal }) => fetchReportData(filia, signal),
      })
}

export const useReportColumnData = (filia: string, raportID: string | null) => {
  return useQuery<ColumnResponse>({
      queryKey: ['report-details', raportID],
      queryFn: ({ signal }) => fetchReportColumnData(filia, raportID, signal),
      enabled: typeof raportID === 'string' && raportID !== '',
    })
}

export default useReportData

