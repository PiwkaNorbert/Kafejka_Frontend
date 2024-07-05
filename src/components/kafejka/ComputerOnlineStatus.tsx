import { ComputerOnlineStatusProps } from '../../types/computer'
import ComputerState from './ComputerState'
import { memo } from 'react'
import { useChangeStateByIDMutation } from '../../hooks/mutations/useChangeStateByIDMutation'

const ComputerOnlineStatus = ({
  computer,
  url,
}: ComputerOnlineStatusProps) => {
  const computerID = computer.pk
  const computerFlag = computer.fields.f
  const computerKatalog = computer.fields.katalog

  // in this component the flag i want to be either 0 or 1
  const currentFlag = computerFlag === 0 ? 0 : 1;

  const { onStateChange, changeStateByIDMutation} = useChangeStateByIDMutation(url)

  if (computerKatalog) return null


  return (
          <ComputerState
            computerID={computerID}
            computerFlag={currentFlag as 0 | 1}
            handleClick={onStateChange}
            isPending={changeStateByIDMutation.isPending}
          />
  )
}
const ComputerOnlineStatusMemo =  memo(ComputerOnlineStatus)

export default ComputerOnlineStatusMemo



