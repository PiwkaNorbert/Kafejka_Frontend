import { IP_WS } from '@/constants'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { computerQueryKeys } from './useComputerData'
import type { ComputerArray } from '@/types/computer'

export function useWebSocket(filia: string) {
  const queryClient = useQueryClient()
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 1
  const wsRef = useRef<WebSocket | null>(null)
  const initialDataReceived = useRef(false)

  const connect = () => {
    if (!filia) return

    try {
      console.log('Attempting to connect to WebSocket...')
      const ws = new WebSocket(
        `ws://${IP_WS.replace('http://', '')}/ws/panel/${filia}`
      )
      wsRef.current = ws

      ws.onopen = () => {
        console.log('✅ Connected to WebSocket server')
        reconnectAttempts.current = 0 // Reset attempts on successful connection
      }

      ws.onmessage = (event) => {

        try {
          const data = JSON.parse(event.data) as ComputerArray

          // Set initial loading state to false on first message
          if (!initialDataReceived.current) {
            initialDataReceived.current = true
          }

          // Update query data with the WebSocket data
          queryClient.setQueryData(
            computerQueryKeys.byFilia(filia),
            (oldData: ComputerArray) => {

              if (!oldData) return data

              return data.map((newComputer) => ({
                ...newComputer,
                online: Math.floor(newComputer.online / 30) * 30, // Round to nearest 30 seconds
              }))
            }
          )
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      ws.onclose = () => {
        let delay: number

        if (reconnectAttempts.current < maxReconnectAttempts) {
          // Use exponential backoff for initial attempts
          delay = Math.min(
            1000 * Math.pow(2, reconnectAttempts.current),
            10000
          )
          console.warn(
            `⚠️ WebSocket disconnected. Reconnecting in ${delay / 1000} seconds... (Attempt ${reconnectAttempts.current + 1}/${maxReconnectAttempts})`
          )
        } else {
          // After max attempts, keep trying every 5 seconds
          delay = 10000
          console.warn(
            `⚠️ Max reconnection attempts reached. Continuing to retry every 10 seconds... (Attempt ${reconnectAttempts.current + 1})`
          )

          const queryCache = queryClient.getQueryCache()
          const query = queryCache.find({ queryKey: computerQueryKeys.byFilia(filia) })
          const errMsg = 'Straciłeś połączenie z serwerem. Proszę się skontaktować z administratorem.'
          if (query) {
            query.setState({
              status: 'error',
              error: new Error(errMsg),
              data: null,
              fetchFailureReason: new Error(errMsg),
            })

          }
        }

        reconnectAttempts.current++
        setTimeout(() => {
          if (wsRef.current?.readyState === WebSocket.CLOSED) {
            connect()
          }
        }, delay)

        // Keep the cache if we've received data previously
        // if (!initialDataReceived.current) {
        //   queryClient.setQueryData(computerQueryKeys.byFilia(filia), [])
        // }
      }
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error)
      const errMsg = 'Straciłeś połączenie z serwerem. Proszę się skontaktować z administratorem.'
      const queryCache = queryClient.getQueryCache()
      const query = queryCache.find({ queryKey: computerQueryKeys.byFilia(filia) })
      if (query) {

      query.setState({
        status: 'error',
        error: new Error(errMsg),
        data: null,
        fetchFailureReason: new Error(errMsg),
      })
      }
    }
  }

  useEffect(() => {
    connect()

    return () => {
      console.log('Cleaning up WebSocket connection')
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
      reconnectAttempts.current = 0
      initialDataReceived.current = false
    }
  }, [filia])
}
