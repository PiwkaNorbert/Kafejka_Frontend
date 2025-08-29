import { memo } from 'react'
import { useChangeStateByIDMutation } from '../../hooks/mutations/useChangeStateByIDMutation'
import type { ComputerOnlineStatusProps } from '../../types/computer'
import ComputerState from './ComputerState'

const ComputerLogout = ({ computer, filia }: ComputerOnlineStatusProps) => {
  const { id, ol: isBlocked, katalog } = computer

  const { onStateChange, changeStateByIDMutation } =
    useChangeStateByIDMutation(filia)

  if (katalog) return null

  const handleShutdown = () => {
    onStateChange({ id, flag: 3 })
  }

  return (
    <ComputerState
      className="w-full"
      computerID={id}
      computerFlag={3}
      computerIsBlocked={isBlocked}
      handleClick={handleShutdown}
      isPending={changeStateByIDMutation.isPending}
    />
  )
}

export default memo(ComputerLogout)
