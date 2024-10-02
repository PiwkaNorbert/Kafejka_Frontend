import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { CircleX, LibraryBig, Lock, LockOpen, Power, RotateCcw } from 'lucide-react';
import { RequestBodyType, StateData } from '@/types/computer';


export function useChangeStateByIDMutation(url: string) {

  const queryClient = useQueryClient();
  const { curFilia } = useParams();


  const changeStateByIDMutation = useMutation({
    mutationFn: async (data: StateData) => {

      const requestBody: RequestBodyType = { id: data.id };
      if (data.flag !== undefined) {
        requestBody['f'] = data.flag;
      }
      if (data.filia !== undefined) {
        requestBody['filia'] = data.filia;
      }
      if (data.katalog !== undefined) {
        requestBody['katalog'] = data.katalog;
      }
      if (data.t !== undefined) {
        requestBody['t'] = data.t;
      }

try {

      const res = await fetch(`${url}set-state/`, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) {
        throw new Error(`Nastpił problem: ${res.statusText}`);
      }
      return await res.json();

    } catch (error: Error | unknown) {
      const message = (error as Error).message;
      throw new Error(message)
  
    }
    },

    onSuccess: () => {

      return queryClient.invalidateQueries({ queryKey: ['komps', curFilia] });
    },

    onError: (error) => {
      console.log(error);
      // queryClient.setQueryData(['komps', curFilia], context.previousKomps)
      toast.error(`Error:  ${error?.message}`, {
        icon: () => <CircleX />,
        toastId: 'state',
      });
    },
  });


  const onStateChange = useCallback(({ id, flag, filia, katalog, t }: StateData) => {

    // mutate based by the input value
    changeStateByIDMutation.mutate({ id, flag, filia, katalog, t }, {
      onSuccess: () => {
        if (flag === 0 || flag === 1) {
          toast.success(`Komputer o ID ${id} został ${flag === 0 ? 'zablokowany' : "odblokowany"}`, {
            toastId: flag === 0 ? `Locked-PC-${id}` : `Unlocked-PC-${id}`,
            icon: () => flag === 0 ? <Lock /> : <LockOpen />
          });

        } else if (flag === 2) {
          toast.success(`Komputer o ID ${id} został restartowany`, {
            toastId: `Restart-PC-${id}`,
            icon: () => <RotateCcw />
          });
          
        } else if (flag === 6) {
          toast.success(`Komputer o ID ${id} został wyłączony`, {
            icon: <Power />,
            toastId: `Shudown-PC-${id}`,
          })

        }  else if (filia !== undefined) { // Assuming filia is passed to this function
          toast.success(`Komputer o ID ${id} został przypisany do filii nr ${filia}`, {
            toastId: `Assigned-PC-${id}-to-Filia-${filia}`,
            // Assuming you have an icon for assignment, or you can choose not to have an icon
            icon: <LibraryBig /> // Replace YourAssignmentIcon with your actual icon component
          });
        }  else if (katalog !== undefined) { // Assuming katalog is passed to this function
          toast.success(`Komputer o ID ${id} został przypisany do katalogu ${katalog}`, {
            toastId: `Assigned-PC-${id}-to-Katalog-${katalog}`,
            // Assuming you have an icon for assignment, or you can choose not to have an icon
            icon: <LibraryBig /> // Replace YourAssignmentIcon with your actual icon component
          });
        } else if (t !== undefined) { // Assuming t is passed to this function
            toast.success(`Za ${t} minut nastąpi wyłączenie komputera.`, {
              toastId: `timeout-${id}-${t}`,
            })
        }
    },
    });
  },
    [changeStateByIDMutation]
  );

  return { onStateChange, changeStateByIDMutation };

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