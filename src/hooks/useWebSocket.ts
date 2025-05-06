import { useEffect, useRef } from 'react';
import { IP_MATEUSZ } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';
import { computerQueryKeys } from './useComputerData';

export function useWebSocket(filia: string) {
  const queryClient = useQueryClient();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const wsRef = useRef<WebSocket | null>(null);
  const initialDataReceived = useRef(false);

  const connect = () => {
    if (!filia) return;

    try {
      console.log('Attempting to connect to WebSocket...');
      const ws = new WebSocket(`ws://${IP_MATEUSZ.replace('http://', '')}:8080/ws/panel/${filia}`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('✅ Connected to WebSocket server');
        reconnectAttempts.current = 0; // Reset attempts on successful connection
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Set initial loading state to false on first message
          if (!initialDataReceived.current) {
            initialDataReceived.current = true;
          }

          // Update query data with the WebSocket data
          queryClient.setQueryData(
            computerQueryKeys.byFilia(filia),
            (oldData: any) => {
              if (!Array.isArray(data)) {
                console.warn('Received non-array data from WebSocket:', data);
                return oldData ?? [];
              }
              
              if (!oldData) return data;

              return data.map(newComputer => ({
                ...newComputer,
                online: Math.floor(newComputer.online / 30) * 30, // Round to nearest 30 seconds
              }));
            }
          );
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        // Set empty array as initial data on error if we haven't received any data yet
        if (!initialDataReceived.current) {
          queryClient.setQueryData(computerQueryKeys.byFilia(filia), []);
        }
      };

      ws.onclose = () => {
        if (reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 10000);
          console.warn(`⚠️ WebSocket disconnected. Reconnecting in ${delay/1000} seconds... (Attempt ${reconnectAttempts.current + 1}/${maxReconnectAttempts})`);
          reconnectAttempts.current++;
          setTimeout(() => {
            if (wsRef.current?.readyState === WebSocket.CLOSED) {
              connect();
            }
          }, delay);
        } else {
          console.error('❌ Max reconnection attempts reached. Please refresh the page.');
          // Set empty array as data if we haven't received any data yet
          if (!initialDataReceived.current) {
            queryClient.setQueryData(computerQueryKeys.byFilia(filia), []);
          }
        }
      };
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
      // Set empty array as data if we haven't received any data yet
      if (!initialDataReceived.current) {
        queryClient.setQueryData(computerQueryKeys.byFilia(filia), []);
      }
    }
  };

  useEffect(() => {
    connect();

    return () => {
      console.log('Cleaning up WebSocket connection');
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      reconnectAttempts.current = 0;
      initialDataReceived.current = false;
    };
  }, [filia]);
} 