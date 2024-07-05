import ComputerState from './ComputerState'
import { memo } from 'react'
import { Computer } from '@/types/computer'
import { useChangeStateByIDMutation } from '../../hooks/mutations/useChangeStateByIDMutation'

const ComputerRestart = ({
  computer,
  url,
}: {
  computer: Computer,
  url: string
}) => {
  const computerID = computer.pk
  const computerKatalog = computer.fields.katalog

  const { onStateChange, changeStateByIDMutation } = useChangeStateByIDMutation(url)

  if (computerKatalog) return null

  return (
    <ComputerState
      computerID={computerID}
      computerFlag={2}
      handleClick={onStateChange}
      isPending={changeStateByIDMutation.isPending}
    />
  )
}
const ComputerRestartMemo = memo(ComputerRestart)

export default ComputerRestartMemo
