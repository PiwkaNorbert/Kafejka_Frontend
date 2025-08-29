import { PORTS } from '@/constants'
import { fetchApi } from '@/lib/custom-fetch'
import type { Computer, StateData } from './types/computer'

export const updateComputerLabelAction = (computerID: number, label: string) =>
  fetchApi<{ Status: string }>(
    { path: `/pc-label/${computerID}`, port: PORTS.WS },
    { method: 'POST', body: JSON.stringify({ label }) }
  )

export const deleteComputerByIdAction = (filia: string, compId: number) =>
  fetchApi<string>({ path: `/delete-pc/${filia}/${compId}`, port: PORTS.WS })

export const shutdownAllComputersAction = (filia: string) =>
  fetchApi<{ Status: string }>({
    path: `/shutdown-all/${filia}`,
    port: PORTS.WS,
  })

export const addComputerAction = (filia: string) =>
  fetchApi<{ Status: string }>({ path: `/add-pc/${filia}`, port: PORTS.WS })

export const changeCodeAction = (
  action: 'add-codes' | 'sub-codes',
  filia: string,
  codeType: number
) =>
  fetchApi<{ Status: string }>({
    path: `/${action}/${filia}/${codeType}`,
    port: PORTS.EBOOKI,
  })

export const updateDetailAction = (payload: { id: string; response: string }) =>
  fetchApi<{ Status: string }>(
    { path: `/update-report-details/`, port: PORTS.TASKER },
    { method: 'POST', body: JSON.stringify(payload) }
  )

export const createRequestAction = (payload: {
  index: string
  title: string
  description: string
  group: string
}) =>
  fetchApi<{ Status: string }>(
    { path: '/create-request/', port: PORTS.TASKER },
    { method: 'POST', body: JSON.stringify(payload) }
  )

export const changeStateByIDAction = (payload: StateData) =>
  fetchApi<Computer[]>({ path: '/set-state', port: PORTS.WS }, {
    method: 'POST',
    body: JSON.stringify(payload),
  })


export const addWifiCode = (filia: string, value: number) =>
  fetchApi({
    path: `/hotspot-code/${filia}/${value * 3 - 1745}/`,
    port: PORTS.KAFEJKA,
  })