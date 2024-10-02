import TimerUntilShutdown from '../TimerUntilShutdown'
import { Computer, ComputerIndexProps } from '../../types/computer'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip'
import { cn } from '../../lib/utils'
import { Check, Wifi, WifiOff, X } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState, memo  } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useClickAway } from '@uidotdev/usehooks'
// Define types for mutation variables and context
type MutationVariables = {
  url: string
  kompid: number
  label: string
}

type MutationContext = {
  previousComputers: Computer[] | undefined
}

const updatePCLabel = async ({
  url,
  kompid,
  label,
}: MutationVariables): Promise<{ Status: string }> => {
  const response = await fetch(`${url}pc-label/${kompid}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ label }),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const ComputerIndex = memo(({ computer, index, url, isEditing, setIsEditing }: ComputerIndexProps) => {
  const computerID = computer.pk
  const {
    timestamp_time: timestampTime,
    online,
    katalog,
    label,
  } = computer.fields
  const [newLabel, setNewLabel] = useState(label || '')
  const { curFilia } = useParams()
  const ref = useClickAway<HTMLDivElement>(() => {
    setIsEditing(false)
  })

  const queryClient = useQueryClient()
  const mutation = useMutation<
    { Status: string },
    Error,
    MutationVariables,
    MutationContext
  >({
    mutationFn: updatePCLabel,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['komps', curFilia] })

      const previousComputers = queryClient.getQueryData<Computer[]>([
        'komps',
        curFilia,
      ])
      console.log(previousComputers)

      queryClient.setQueryData<Computer[] | undefined>(
        ['komps', curFilia],
        (old) => {
          console.log(old)

          return old?.map((c) => {
            console.log(c)

            return c.pk === variables.kompid
              ? { ...c, fields: { ...c.fields, label: variables.label } }
              : c
          })
        }
      )

      return { previousComputers }
    },
    onSuccess: (data) => {
      if (data.Status === 'Success') {
        toast.success(
          `Komputer o ID ${computerID} ma teraz nazwę "${newLabel}".`,
          {
            toastId: computerID,
          }
        )
      }
    },
    onError: (error, variables, context) => {
      toast.error(
        `Wystąpił błąd podczas aktualizacji nazwy komputera o ID ${variables.kompid}. Proszę spróbować ponownie.`,
        {
          toastId: computerID,
        }
      )
      console.error('Error updating computer label:', error)

      if (context?.previousComputers) {
        queryClient.setQueryData<Computer[]>(
          ['komps', curFilia],
          context.previousComputers
        )
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['komps', curFilia] })
      setIsEditing(false)
    },
  })

  const isOffline = online < 30
  const offlineColor = isOffline
    ? 'text-secondary  hover:text-secondary'
    : 'text-destructive  hover:text-destructive'
  const computerName = katalog ? 'Katalog' : label || `Komputer ${index + 1}`
  const currentTime = Math.trunc(new Date().getTime() / 1000)
  const isShuttingDown = timestampTime && timestampTime > currentTime

  const handleLabelChange = () => {
      mutation.mutate({ url, kompid: computerID, label: newLabel.trim() })
  }

  return (
    <div
      ref={ref}
      className="grid grid-cols-[1fr_auto_auto] items-center justify-between gap-x-4"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            asChild
            className={cn(
              'text-nowrap text-left text-xl  hover:cursor-pointer',
              offlineColor,
              katalog === 0 ? 'bg-card' : 'bg-border'
            )}
          >
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={newLabel}
                  defaultValue={label|| ""}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="h-9 text-base"
                  autoFocus
                />
                <Button
                  size="sm"
                  onClick={handleLabelChange}
                  disabled={mutation.isPending}
                >
                  <Check size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <Button
                className="w-fit justify-start px-0 text-left hover:bg-transparent"
                variant="ghost"
                onClick={() => setIsEditing(true)}
              >
                {computerName}
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent>ID: {computerID}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isShuttingDown ? (
        <TimerUntilShutdown
          computerID={computerID}
          timestampTime={timestampTime}
        />
      ) : (
        <div />
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={cn(
              'h-10 rounded-md border border-input px-2.5 hover:bg-accent hover:text-accent-foreground',
              offlineColor,
              katalog === 0 ? 'bg-card' : 'bg-border'
            )}
          >
            {isOffline ? <Wifi size={20} /> : <WifiOff size={20} />}
          </TooltipTrigger>
          <TooltipContent>{isOffline ? 'On-line' : 'Off-line'}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
})

export default ComputerIndex
