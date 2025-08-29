import type { Computer, ComputerIndexProps } from '@/types/computer'
import TimerUntilShutdown from '../TimerUntilShutdown'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { computerQueryKeys } from '@/hooks/useComputerData'
import { cn, formatDate } from '@/lib/utils'
import { updateComputerLabelAction } from '@/mutations'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { Check, Wifi, WifiOff, X } from 'lucide-react'
import { memo, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
// Define types for mutation variables and context
type MutationVariables = { kompid: number; label: string }

type MutationContext = { previousComputers: Computer[] | undefined }

const ComputerIndex = memo(({ computer, index }: ComputerIndexProps) => {
  const computerID = computer.id
  const {
    timestamp_time: timestampTime,
    katalog,
    label,
    last_fetch: lastFetch,
    is_connected: isConnected,
  } = computer

  const [newLabel, setNewLabel] = useState(() => label || '')
  const [isEditing, setIsEditing] = useState<boolean>(false)
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
    mutationFn: ({ kompid, label }) => updateComputerLabelAction(kompid, label),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: computerQueryKeys.byFilia(curFilia),
      })

      const previousComputers = queryClient.getQueryData<Computer[]>(
        computerQueryKeys.byFilia(curFilia)
      )

      queryClient.setQueryData<Computer[] | undefined>(
        computerQueryKeys.byFilia(curFilia),
        (old) => {
          return old?.map((c) => {
            return c.id === variables.kompid
              ? { ...c, label: variables.label }
              : c
          })
        }
      )

      return { previousComputers }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: computerQueryKeys.byFilia(curFilia),
      })
      if (data.Status === 'Success') {
        setIsEditing(false)

        toast.success(
          `Komputer o ID ${computerID} ma teraz nazwę "${newLabel}".`,
          { toastId: computerID }
        )
      }
    },
    onError: (error, variables, context) => {
      toast.error(
        `Wystąpił błąd podczas aktualizacji nazwy komputera o ID ${variables.kompid}. Proszę spróbować ponownie.`,
        { toastId: computerID }
      )
      console.error('Error updating computer label:', error)

      if (context?.previousComputers) {
        queryClient.setQueryData<Computer[]>(
          computerQueryKeys.byFilia(curFilia),
          context.previousComputers
        )
      }
    },
  })

  const offlineColor = isConnected
    ? 'text-secondary  hover:text-secondary'
    : 'text-destructive  hover:text-destructive'
  const computerName = katalog
    ? label || 'Katalog'
    : label || `Komputer ${index + 1}`
  const currentTime = Math.trunc(new Date().getTime() / 1000)
  const isShuttingDown = timestampTime && timestampTime > currentTime

  const handleLabelChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const label = form.get('label') as string

    mutation.mutate({ kompid: computerID, label: label.trim() })
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
              'text-nowrap text-left text-xl hover:cursor-pointer',
              offlineColor,
              katalog === 0 ? 'bg-card' : 'bg-border'
            )}
          >
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <form
                  className="flex items-center space-x-2"
                  onSubmit={handleLabelChange}
                >
                  <Input
                    defaultValue={label || ''}
                    name="label"
                    onChange={(e) => setNewLabel(e.target.value)}
                    className="h-9 text-base"
                  />
                  <Button type="submit" size="sm" disabled={mutation.isPending}>
                    <Check size={16} />
                  </Button>
                </form>
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
                className="w-fit justify-start bg-transparent px-0 text-left transition-none hover:bg-transparent"
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
              'group h-10 rounded-md border border-input px-2.5 hover:bg-accent hover:text-accent-foreground',
              offlineColor,
              katalog === 0
                ? 'hover:bg-primary/15'
                : 'bg-border hover:bg-primary/15'
            )}
          >
            {isConnected ? (
              <Wifi size={20} className="group-hover:animate-pulse" />
            ) : (
              <WifiOff size={20} className="group-hover:animate-pulse" />
            )}
          </TooltipTrigger>
          <TooltipContent>
            {isConnected ? 'On-line' : 'Off-line'}{' '}
            <span className="text-xs">({formatDate(lastFetch)})</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
})

export default ComputerIndex
