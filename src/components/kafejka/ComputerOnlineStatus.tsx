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

  const { onStateChange, changeStateByIDMutation} = useChangeStateByIDMutation(url)

  if (computerKatalog) return null


  return (
          <ComputerState
            computerID={computerID}
            computerFlag={computerFlag}
            handleClick={onStateChange}
            isPending={changeStateByIDMutation.isPending}
          />
  )
}
const ComputerOnlineStatusMemo =  memo(ComputerOnlineStatus)

export default ComputerOnlineStatusMemo



