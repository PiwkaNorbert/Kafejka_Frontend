import { addComputerAction } from '@/mutations'
import { useMutation } from '@tanstack/react-query'
import { AlertCircle, Plus } from 'lucide-react'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { computerQueryKeys } from '../useComputerData'

export const useAddComputer = (filia: string) => {

  const addPCMutation = useMutation({
    mutationKey: computerQueryKeys.add(filia),
    mutationFn: () => addComputerAction(filia),
    meta: {
      invalidates: [computerQueryKeys.byFilia(filia),],
    },
  })

  const onAdd = useCallback(() => {
    if (addPCMutation.isPending) return

    addPCMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Komputer został dodany', { icon: Plus })
      },
      onError: () => {
        toast.error('Komputer niezostał dodany', { toastId: 'addComputer', icon: AlertCircle })
      },
    })
  }, [addPCMutation])

  return { onAdd, addPCMutation }
}
