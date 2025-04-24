import { ComputerOnlineStatusProps } from '../../types/computer'
import ComputerState from './ComputerState'
import { memo } from 'react'
import { useChangeStateByIDMutation } from '../../hooks/mutations/useChangeStateByIDMutation'

const ComputerOnlineStatus = memo(({ computer, url }: ComputerOnlineStatusProps) => {
  const computerID = computer.id
  const computerFlag = computer.f
  const computerKatalog = computer.katalog

  // in this component the flag i want to be either 0 or 1
  const currentFlag = computerFlag === 0 ? 0 : 1

  const { onStateChange, changeStateByIDMutation } =
    useChangeStateByIDMutation(url)

  if (computerKatalog) return null

  return (
    <ComputerState
      className="col-span-2"
      computerID={computerID}
      computerFlag={currentFlag as 0 | 1}
      handleClick={onStateChange}
      isPending={changeStateByIDMutation.isPending}
    />
  )
})

export default ComputerOnlineStatus
