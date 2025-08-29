import { useChangeStateByIDMutation } from '@/hooks/mutations/useChangeStateByIDMutation'
import { useShutdownTime } from '@/hooks/useShutdownTime'
import type { Computer } from '@/types/computer'
import { memo } from 'react'
import ComputerState from './ComputerState'

const ComputerRestart = memo(
  ({ computer, filia }: { computer: Computer; filia: string }) => {
    const { id, ol: isBlocked, katalog } = computer

    const { onStateChange, changeStateByIDMutation } =
      useChangeStateByIDMutation(filia)
    const { shutdownTime } = useShutdownTime(id)

    if (katalog) return null

    const handleRestart = () => {
      const numberValue: number = Number(shutdownTime)
      return onStateChange({ id, t: numberValue, flag: 2 })
    }

    return (
      <ComputerState
        computerID={id}
        computerFlag={2}
        computerIsBlocked={isBlocked}
        handleClick={handleRestart}
        isPending={changeStateByIDMutation.isPending}
      />
    )
  }
)

export default ComputerRestart
