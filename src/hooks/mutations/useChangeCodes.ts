import { changeCodeAction } from '@/mutations'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { ebookQueryKeys } from '../options/ebook-options'
// import { Minus, Plus } from 'lucide-react'

export const useChangeCodes = () => {
  const { curFilia } = useParams()
  const filia = curFilia ?? '99'

  const queryClient = useQueryClient()

  const changeCodesMutation = useMutation({
    mutationFn: ({
      action,
      type,
    }: {
      action: 'add-codes' | 'sub-codes'
      type: 'empik' | 'legimi'
    }) => changeCodeAction(action, filia, type === 'empik' ? 1 : 0),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ebookQueryKeys.all,
      })
    },
    onError: (error) => {
      console.log(error)
      toast.error(error?.message)
    },
  })

  const onChange = useCallback(
    ({
      action,
      type,
    }: {
      action: 'add-codes' | 'sub-codes'
      type: 'empik' | 'legimi'
    }) => {
      if (changeCodesMutation.isPending) return

      changeCodesMutation.mutate(
        { action, type },
        {
          onSuccess: () => {
            toast.success(
              `${action === 'add-codes' ? 'Dodałeś' : 'Usunełeś'} kod ${
                type === 'empik' ? 'EmpikGo' : 'Legimi'
              }`,
              {
                toastId: `${type}_${action}`,
                icon: () => (action === 'add-codes' ? '➕' : '➖'),
              }
            )
          },
        }
      )
    },
    [changeCodesMutation]
  )

  return { onChange, changeCodesMutation }
}
