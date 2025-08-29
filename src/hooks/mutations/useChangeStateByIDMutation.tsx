import { changeStateByIDAction } from '@/mutations'
import type { Computer, RequestBodyType, StateData } from '@/types/computer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  CircleX,
  LibraryBig,
  Lock,
  LockOpen,
  Power,
  RotateCw,
} from 'lucide-react'
import { toast } from 'react-toastify'
import { computerQueryKeys } from '../useComputerData'

export function useChangeStateByIDMutation(filia: string) {
  const queryClient = useQueryClient()

  const changeStateByIDMutation = useMutation({
    mutationFn: async (data: StateData): Promise<Computer[]> => {
      const requestBody: RequestBodyType = { id: data.id }
      if (data.flag !== undefined) {
        requestBody['f'] = data.flag
      }
      if (data.filia !== undefined) {
        requestBody['filia'] = data.filia
      }
      if (data.katalog !== undefined) {
        requestBody['katalog'] = data.katalog
      }
      if (data.t !== undefined) {
        requestBody['t'] = data.t
      }
      if (data.ol !== undefined) {
        requestBody['ol'] = data.ol
      }

      return changeStateByIDAction(requestBody)
    },

    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: computerQueryKeys.byFilia(filia),
      })

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<Computer[]>(
        computerQueryKeys.byFilia(filia)
      )

      // Optimistically update to the new value
      queryClient.setQueryData<Computer[]>(
        computerQueryKeys.byFilia(filia),
        (old) => {
          if (!old) return old
          return old.map((comp) => {
            if (comp.id === newData.id) {
              return {
                ...comp,
                ...(newData.flag !== undefined && { f: newData.flag }),
                ...(newData.filia !== undefined && {
                  filia: Number(newData.filia),
                }),
                ...(newData.katalog !== undefined && {
                  katalog: newData.katalog,
                }),
                ...(newData.t !== undefined && { t: newData.t }),
                ...(newData.ol !== undefined && { ol: newData.ol }),
              }
            }
            return comp
          })
        }
      )

      // Return a context object with the snapshotted value
      return { previousData }
    },

    onSuccess: (response, variables) => {
      // Update the cache with the actual response
      queryClient.setQueryData<Computer[]>(
        computerQueryKeys.byFilia(filia),
        (old) => {
          if (!old) return old
          return old.map((comp) => {
            if (comp.id === variables.id) {
              return {
                ...comp,
                ...response[0],
              }
            }
            return comp
          })
        }
      )
    },

    onError: (error, _, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousData) {
        queryClient.setQueryData(
          computerQueryKeys.byFilia(filia),
          context.previousData
        )
      }
      console.log(error)
      toast.error(`Error:  ${error?.message}`, {
        icon: () => <CircleX />,
        toastId: 'state',
      })
    },
  })

  const onStateChange = ({ id, flag, filia, katalog, t, ol }: StateData) => {
    // mutate based by the input value
    changeStateByIDMutation.mutate(
      { id, flag, filia, katalog, t, ol } as StateData,
      {
        onSuccess: () => {
          if (ol !== undefined) {
            toast.success(
              `Komputer o ID ${id} został ${ol === 0 ? 'zablokowany' : 'odblokowany'}`,
              {
                toastId: ol === 0 ? `Locked-PC-${id}` : `Unlocked-PC-${id}`,
                icon: () => (ol === 0 ? <Lock /> : <LockOpen />),
              }
            )
          } else if (flag === 2) {
            toast.success(`Komputer o ID ${id} został restartowany`, {
              toastId: `Restart-PC-${id}`,
              icon: () => <RotateCw />,
            })
          } else if (flag === 6) {
            toast.success(`Komputer o ID ${id} został wyłączony`, {
              icon: <Power />,
              toastId: `Shudown-PC-${id}`,
            })
          } else if (filia !== undefined) {
            toast.success(
              `Komputer o ID ${id} został przypisany do filii nr ${filia}`,
              {
                toastId: `Assigned-PC-${id}-to-Filia-${filia}`,
                icon: <LibraryBig />,
              }
            )
          } else if (katalog !== undefined) {
            toast.success(
              `Komputer o ID ${id} został przypisany do katalogu ${katalog}`,
              {
                toastId: `Assigned-PC-${id}-to-Katalog-${katalog}`,
                icon: <LibraryBig />,
              }
            )
          } else if (t !== undefined) {
            toast.success(`Za ${t} minut nastąpi wyłączenie komputera.`, {
              toastId: `timeout-${id}-${t}`,
            })
          }
        },
      }
    )
  }

  return { onStateChange, changeStateByIDMutation }
}

// cache wylacz za
// queryClient.setQueryData(
//   ['komps', curFilia],
//   (oldData: ComputerArray) => {
//     return oldData.map(comp => {
//       if (comp.pk === response[0].pk) {
//         return {
//           ...comp,
//           fields: { ...response[0].fields },
//         }
//       } else {
//         return {
//           ...comp,
//           fields: { ...comp.fields },
//         }
//       }
//     })
//   }
// )
