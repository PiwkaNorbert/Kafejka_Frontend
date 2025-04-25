import ComputerState from './ComputerState'
import { memo } from 'react'
import { Computer } from '@/types/computer'
import { useChangeStateByIDMutation } from '@/hooks/mutations/useChangeStateByIDMutation'
import { useShutdownTime } from '@/hooks/useShutdownTime'

const ComputerRestart = memo(
  ({ computer, filia }: { computer: Computer; filia: string }) => {
    const computerID = computer.id
    const computerKatalog = computer.katalog

    const { onStateChange, changeStateByIDMutation } =
      useChangeStateByIDMutation(filia)
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
  }
)

export default ComputerRestart
