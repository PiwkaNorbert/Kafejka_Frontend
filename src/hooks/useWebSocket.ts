import { useEffect } from 'react';
import { IP_MATEUSZ } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';
import { computerQueryKeys } from './useComputerData';

export function useWebSocket(filia: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!filia) return;

    console.log('Attempting to connect to WebSocket...');
    const ws = new WebSocket(`ws://${IP_MATEUSZ.replace('http://', '')}:8080/ws/panel/${filia}`);

    ws.onopen = () => {
      console.log('✅ Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Update query data with partial updates
        queryClient.setQueryData(
          computerQueryKeys.byFilia(filia),
          (oldData: any) => {
            if (!oldData) return data;
            // If the data is an array, map through and update
            if (Array.isArray(oldData) && Array.isArray(data)) {
              return oldData.map(oldComputer => {
                const updatedComputer = data.find(
                  newComputer => newComputer.id === oldComputer.id
                );
                return updatedComputer 
                  ? { ...oldComputer, ...updatedComputer }
                  : oldComputer;
              });
            }
            // If not an array, just merge the data
            return { ...oldData, ...data };
          }
        );
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };

    ws.onclose = () => {
      console.warn('⚠️ WebSocket disconnected. Reconnecting in 3 seconds...');
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: computerQueryKeys.byFilia(filia) });
      }, 3000);
    };

    return () => {
      console.log('Cleaning up WebSocket connection');
      ws.close();
    };
  }, [filia, queryClient]);
} 