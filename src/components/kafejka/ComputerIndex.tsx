import TimerUntilShutdown from '../TimerUntilShutdown'
import { ComputerIndexProps } from '../../types/computer'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"
import { cn } from '../../lib/utils'
import { Wifi, WifiOff } from 'lucide-react'

const ComputerIndex = ({
  computer,
  index,
}: ComputerIndexProps) => {
  const computerID = computer.pk
  const { timestamp_time: timestampTime, online, katalog } = computer.fields

  const isOffline = online < 30

  const offlineColor = isOffline ?  'text-secondary  hover:text-secondary': 'text-destructive  hover:text-destructive' 

  const computerName = katalog ? 'Katalog' : `Komputer ${index + 1}`
  const currentTime = Math.trunc(new Date().getTime() / 1000)
  const isShuttingDown = timestampTime && timestampTime > currentTime



  return (
    <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 items-center justify-between">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={cn("text-xl text-nowrap text-left  hover:cursor-default", offlineColor, katalog === 0 ? "bg-card" : "bg-border")}> {computerName}</TooltipTrigger>
          <TooltipContent>
            ID: {computerID}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isShuttingDown ? (
        <TimerUntilShutdown
          computerID={computerID}
          timestampTime={timestampTime}
        />  
      ) : <div />}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={cn("h-10 px-2.5 border rounded-md border-input hover:bg-accent hover:text-accent-foreground", offlineColor,  katalog === 0 ? "bg-card" : "bg-border")}>

             {isOffline ? <Wifi size={20} /> : <WifiOff size={20} /> }
             </TooltipTrigger>
          <TooltipContent>
            {isOffline ? 'On-line' : 'Off-line' }
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default ComputerIndex
