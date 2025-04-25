import ComputerIndex from './ComputerIndex'
import ComputerAssignFilia from './ComputerAssignFilia'
import ComputerOnlineStatus from './ComputerOnlineStatus'
import ComputerShutdownTimeoutPanel from './ComputerShutdownTimeoutPanel'
import ComputerRestart from './ComputerRestart'
import ComputerKatalog from './ComputerKatalog'
import ComputerLogout from './ComputerLogout'
import { Computer } from '@/types/computer'
import { memo } from 'react'
import { cn } from '@/lib/utils'
import ComputerDelete from './ComputerDelete'
import ComputerShutdown from './ComputerShutdown'

interface ComputerManagementSectionProps {
  computer: Computer
  computerID: number
  filia: string
}
interface ComputerDetailsSectionProps {
  computer: Computer
  index: number
  showComps: boolean
  filia: string
}
// New memoized components
export const ComputerManagementSection = memo(
  ({ computer, computerID, filia }: ComputerManagementSectionProps) => (
    <section
      className={cn(
        'grid gap-4 rounded-lg bg-card p-5 text-sm text-muted-foreground shadow-md ',
        computer.katalog === 1 && 'bg-border'
      )}
    >
      <ComputerAssignFilia computer={computer} filia={filia} />
      <ComputerKatalog computer={computer} filia={filia} />
      <ComputerDelete computerID={computerID} filia={filia} />
    </section>
  )
)

export const ComputerDetailsSection = memo(
  ({ computer, index, showComps, filia }: ComputerDetailsSectionProps) => {
    return (
      <section
        className={cn(
          'grid gap-4 rounded-lg bg-card p-5 text-sm text-muted-foreground shadow-md ',
          computer.katalog === 1 && 'bg-border'
        )}
      >
        <ComputerIndex
          computer={computer}
          index={index}
          showComps={showComps}
        />
        {showComps ? (
          <>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4 ">
              <ComputerOnlineStatus computer={computer} />
              <ComputerLogout computer={computer} />
            </div>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4">
              <ComputerShutdown computer={computer} />
              <ComputerRestart computer={computer} filia={filia} />
              <ComputerShutdownTimeoutPanel computer={computer} index={index} />
            </div>
          </>
        ) : null}
      </section>
    )
  }
)
