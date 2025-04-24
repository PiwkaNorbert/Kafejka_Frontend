import ComputerIndex from './ComputerIndex'
import ComputerAssignFilia from './ComputerAssignFilia'
import ComputerOnlineStatus from './ComputerOnlineStatus'
import ComputerShutdownTimeoutPanel from './ComputerShutdownTimeoutPanel'
import ComputerRestart from './ComputerRestart'
import ComputerKatalog from './ComputerKatalog'
import ComputerLogout from './ComputerLogout'
import { Computer } from '@/types/computer'
import { memo } from 'react'
import { cn } from '../../lib/utils'
import ComputerDelete from './ComputerDelete'
import ComputerShutdown from './ComputerShutdown'

interface ComputerManagementSectionProps {
  computer: Computer
  url: string
  computerID: number
}
interface ComputerDetailsSectionProps {
  computer: Computer
  index: number
  url: string
  showComps: boolean
}
// New memoized components
export const ComputerManagementSection = memo(
  ({ computer, url, computerID }: ComputerManagementSectionProps) => (
    <section
      className={cn(
        'grid gap-4 rounded-lg bg-card p-5 text-sm text-muted-foreground shadow-md ',
        computer.katalog === 1 && 'bg-border'
      )}
    >
      <ComputerAssignFilia computer={computer} url={url} />
      <ComputerKatalog computer={computer} url={url} />
      <ComputerDelete computerID={computerID} url={url} />
    </section>
  )
)

export const ComputerDetailsSection = memo(
  ({ computer, index, url, showComps }: ComputerDetailsSectionProps) => {
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
          url={url}
          showComps={showComps}
        />
        {showComps && (
          <>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4 ">
              <ComputerOnlineStatus computer={computer} url={url} />
              <ComputerLogout computer={computer} url={url} />
            </div>
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4">
              <ComputerShutdown computer={computer} url={url} />
              <ComputerRestart computer={computer} url={url} />
              <ComputerShutdownTimeoutPanel computer={computer} index={index} />
            </div>
          </>
        )}
      </section>
    )
  }
)
