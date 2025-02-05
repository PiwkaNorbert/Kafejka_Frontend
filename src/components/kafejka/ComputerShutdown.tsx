import { ComputerOnlineStatusProps } from '../../types/computer'
import { useChangeStateByIDMutation } from '../../hooks/mutations/useChangeStateByIDMutation'
import ComputerState from './ComputerState'
import { useShutdownTime } from '../../hooks/useShutdownTime'
import { memo } from 'react'

const ComputerShutdown = memo(
  ({ computer, url }: ComputerOnlineStatusProps) => {
    const computerID = computer.pk

    const { onStateChange, changeStateByIDMutation } =
      useChangeStateByIDMutation(url)

    const { shutdownTime } = useShutdownTime(computerID)

    const handleShutdown = () => {
      onStateChange({ id: computerID, t: Number(shutdownTime), flag: 6 })
    }

    return (
      <ComputerState
        computerID={computerID}
        computerFlag={6}
        handleClick={handleShutdown}
        isPending={changeStateByIDMutation.isPending}
      />
    )
  }
)
export default ComputerShutdown
