import { changeCodeAction } from "../../fetch"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
// import { Minus, Plus } from 'lucide-react'


export const useChangeCodes = () => {
  const { curFilia } = useParams()
  const filia = curFilia ?? '99'

  const queryClient = useQueryClient()

  const changeCodesMutation = useMutation({
    mutationFn: ({ action, type }: { action: 'add-codes' | 'sub-codes', type: "empik" | "legimi" }) => {
      const codeType = type === 'empik' ? 1 : 0;
      const url = `http://192.168.200.40:8081/`
      const codesUrl = `${url}${action}/${filia}/${codeType}`;

      return changeCodeAction(codesUrl)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['codes']
      });
    },
    onError: (error) => {
      console.log(error)
      toast.error(error?.message);
    },
  }
  );

  const onChange = useCallback(
    ({ action, type }: { action: 'add-codes' | 'sub-codes', type: "empik" | "legimi" }) => {
      if (changeCodesMutation.isPending) return

      changeCodesMutation.mutate({ action, type }, {
        onSuccess: () => {
          toast.success(
            `${action === 'add-codes' ? 'Dodałeś' : 'Usunełeś'} kod ${type === 'empik' ? 'EmpikGo' : 'Legimi'
            }`,
            {
              toastId: `${type}_${action}`,
              icon: () => action === 'add-codes' ? "➕" : '➖'
            }
          );
        }
      })
    },
    [changeCodesMutation]
  )


  return { onChange, changeCodesMutation }
}
