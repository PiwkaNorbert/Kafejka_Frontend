import { addPCAction } from "../../fetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Plus } from 'lucide-react'


export const useAddComputer = (url: string) => {
    const { curFilia } = useParams()
    const filia = curFilia ?? '0'
    
    const queryClient = useQueryClient()
    
    
    const addPCMutation = useMutation({
      mutationFn: () => addPCAction(url, filia),
    
      onSuccess: response => {
        toast.success('Komputer został dodany', { icon: Plus})
        console.log(response)
        // queryClient.setQueryData({ queryKey: ['komps', curFilia] }, old => {
    
        // });
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['komps', filia] })
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
    