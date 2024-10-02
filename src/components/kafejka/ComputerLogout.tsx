import { ComputerOnlineStatusProps } from '../../types/computer'
import ComputerState from './ComputerState'
import { memo } from 'react'
import { useChangeStateByIDMutation } from '../../hooks/mutations/useChangeStateByIDMutation'

const ComputerLogout = ({ computer, url }: ComputerOnlineStatusProps) => {
  const computerID = computer.pk
  const computerKatalog = computer.fields.katalog


  const { onStateChange, changeStateByIDMutation } =
    useChangeStateByIDMutation(url)

  if (computerKatalog) return null

  const handleShutdown = () => {
    onStateChange({ id: computerID, flag: 3 })
  }

  return (
    <ComputerState
    className='w-full'
      computerID={computerID}
      computerFlag={3}
      handleClick={handleShutdown}
      isPending={changeStateByIDMutation.isPending}
    />
  )
}

export default memo(ComputerLogout)
