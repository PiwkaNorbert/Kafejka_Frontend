import { ComputerOnlineStatusProps } from '../../types/computer'
import { useChangeStateByIDMutation } from '../../hooks/mutations/useChangeStateByIDMutation'
import ComputerState from './ComputerState'

function ComputerShutdown({ computer,
  url }: ComputerOnlineStatusProps) {

  const computerID = computer.pk

  const { onStateChange, changeStateByIDMutation } = useChangeStateByIDMutation(url)

  return (
    <ComputerState
      computerID={computerID}
      computerFlag={5}
      handleClick={onStateChange}
      isPending={changeStateByIDMutation.isPending}
    />

  )
}

export default ComputerShutdown


