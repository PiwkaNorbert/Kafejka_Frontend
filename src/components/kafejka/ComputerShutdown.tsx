import { useChangeStateByIDMutation } from '@/hooks/mutations/useChangeStateByIDMutation'
import { useShutdownTime } from '@/hooks/useShutdownTime'
import type { ComputerOnlineStatusProps } from '@/types/computer'
import { memo } from 'react'
import ComputerState from './ComputerState'

const ComputerShutdown = memo(
  ({ computer, filia }: ComputerOnlineStatusProps) => {
    const { id, ol: isBlocked } = computer

    const { onStateChange, changeStateByIDMutation } =
      useChangeStateByIDMutation(filia)

    const { shutdownTime } = useShutdownTime(id)

    const handleShutdown = () => {
      onStateChange({ id, t: Number(shutdownTime), flag: 6 })
    }

    return (
      <ComputerState
        computerID={id}
        computerFlag={6}
        computerIsBlocked={isBlocked}
        handleClick={handleShutdown}
        isPending={changeStateByIDMutation.isPending}
      />
    )
  }
)
export default ComputerShutdown
