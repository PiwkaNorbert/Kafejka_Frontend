import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from 'lucide-react'
import { useCallback } from "react"
import { toast } from "react-toastify"
import { IP_MATEUSZ } from '@/constants';
import { fetchApi } from '@/lib/custom-fetch';
import { computerQueryKeys } from '../useComputerData';


export const useAddComputer = (filia: string) => {

  const queryClient = useQueryClient()

  const addPCMutation = useMutation({
    mutationKey: computerQueryKeys.add(filia),
    mutationFn: () => fetchApi({ url: IP_MATEUSZ, port: '8080', path: `/add-pc/${filia}` }),

    onSuccess: (res) => {
      toast.success('Komputer został dodany', { icon: Plus })
      console.log(res)
      // queryClient.setQueryData({ queryKey: ['komps', curFilia] }, old => {

      // });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: computerQueryKeys.byFilia(filia) })
    },
    onError: (error: Error) => {
      console.error(error)
      toast.error('Komputer niezostał dodany')
    },
  })

  const onAdd = useCallback(
    () => {
      if (addPCMutation.isPending) return

      addPCMutation.mutate()
    },
    [addPCMutation]
  )


  return { onAdd, addPCMutation }
}
