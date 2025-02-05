import ComputerState from './ComputerState'
import { memo } from 'react'
import { Computer } from '@/types/computer'
import { useChangeStateByIDMutation } from '../../hooks/mutations/useChangeStateByIDMutation'
import { useShutdownTime } from '../../hooks/useShutdownTime'

const ComputerRestart = memo(({
  computer,
  url,
}: {
  computer: Computer,
  url: string
}) => {
  const computerID = computer.pk
  const computerKatalog = computer.fields.katalog

  const { onStateChange, changeStateByIDMutation } = useChangeStateByIDMutation(url)
  const { shutdownTime } = useShutdownTime(computerID)

  if (computerKatalog) return null

    const handleRestart = () => {
    const numberValue: number = Number(shutdownTime)
    return onStateChange({ id: computerID, t: numberValue, flag: 2 })
  }

  return (
    <ComputerState
      computerID={computerID}
      computerFlag={2}
      handleClick={handleRestart}
      isPending={changeStateByIDMutation.isPending}
    />
  )
})

export default ComputerRestart
