import type { ComputerOnlineStatusProps, Flags } from '../../types/computer'
import ComputerState from './ComputerState'
import { memo } from 'react'
import { useChangeStateByIDMutation } from '../../hooks/mutations/useChangeStateByIDMutation'

const ComputerOnlineStatus = memo(
  ({ computer, filia }: ComputerOnlineStatusProps) => {
    const { id, katalog, ol: isBlocked } = computer

    const { onStateChange, changeStateByIDMutation } =
      useChangeStateByIDMutation(filia)

    if (katalog) return null

    return (
      <ComputerState
        className="col-span-2"
        computerID={id}
        computerFlag={isBlocked ? 1 : (0 as Flags['f'])}
        computerIsBlocked={isBlocked}
        handleClick={onStateChange}
        isPending={changeStateByIDMutation.isPending}
      />
    )
  }
)

export default ComputerOnlineStatus
