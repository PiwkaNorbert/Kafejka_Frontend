import { IP_EBOOKI, IP_KAFEJKA, IP_TASKER, IP_WS } from './constants'
import { customFetch } from './lib/custom-fetch'
import type { CategoryResponse } from './types/categories'
import type { GetCodesResponse } from './types/codes'
import type { ComputerArray } from './types/computer'
import type { ColumnResponse } from './types/dystrybucja/columns'
import type { MakulatoraResponse } from './types/dystrybucja/raports'
import type { GroupResponse } from './types/groups'
import type { TaskListResponse } from './types/unauthed-task-list'
import type { GetWifiCodesResponse } from './types/wifi-codes'

export const fetchTicketGroupData = async (
  signal?: AbortSignal
): Promise<GroupResponse> => {
  const url = `${IP_TASKER}/get-groups/`
  return customFetch<GroupResponse>(
    url,
    'Błąd pobierania grup: Proszę się skontaktować z administratorem.',
    signal
  )
}

export async function fetchReportData(filia: string, signal?: AbortSignal) {
  const url = `${IP_TASKER}/reports/${filia}/`
  return customFetch<MakulatoraResponse>(
    url,
    'Błąd pobierania makulatury: Proszę się skontaktować z administratorem.',
    signal
  )
}

export const fetchReportColumnData = async (
  filia: string,
  raportID: string | null,
  signal?: AbortSignal
) => {
  const url = `${IP_TASKER}/report-details/${filia}/${raportID}/`
  return customFetch<ColumnResponse>(
    url,
    'Błąd pobierania makulatury: Proszę się skontaktować z administratorem.',
    signal
  )
}

export const fetchTicketCategoryData = async (
  filia: string,
  signal?: AbortSignal
) => {
  const url = `${IP_TASKER}/categories/${filia}/`
  return customFetch<CategoryResponse>(
    url,
    'Błąd pobierania kategorii: Proszę się skontaktować z administratorem.',
    signal
  )
}

export const fetchUnauthorizedTasks = async (
  filia: string,
  signal?: AbortSignal
) => {
  const url = `${IP_TASKER}/unauthorized-tasks/${filia}/`
  return customFetch<TaskListResponse>(
    url,
    'Błąd pobierania zadań: Proszę się skontaktować z administratorem.',
    signal
  )
}


export const fetchEbookCodes = async (signal?: AbortSignal) => {
  const url = `${IP_EBOOKI}/codes`
  return customFetch<GetCodesResponse>(
    url,
    'Błąd pobierania ebooków: Proszę się skontaktować z administratorem.',
    signal
  )
}


export const fetchWifiCodes = async (filia: string, signal?: AbortSignal) => {
  const url = `${IP_KAFEJKA}/get-codes/${filia}`
  return customFetch<GetWifiCodesResponse>(
    url,
    'Błąd pobierania kodów: Proszę się skontaktować z administratorem.',
    signal
  )
}


export const fetchComputerData = async (filia: string, signal?: AbortSignal): Promise<ComputerArray> => {
  const url = `${IP_WS}/komps/${filia}`
  return customFetch<ComputerArray>(
    url,
    'Straciłeś połączenie z serwerem. Proszę się skontaktować z administratorem.',
    signal
  )

}