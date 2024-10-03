import { useParams } from 'react-router-dom'
import { Dispatch, memo, SetStateAction, useCallback, useMemo, useState } from 'react'
import { cn } from '../lib/utils'
import ErrorCallback from '../components/Errors/ErrorCallback'
import { useComputerData } from '../hooks/useComputerData'
import { Info, RefreshCcw } from 'lucide-react'

import ComputerAdd from '../components/kafejka/ComputerAdd'
import ComputerIndex from '../components/kafejka/ComputerIndex'
import ComputerDelete from '../components/kafejka/ComputerDelete'
import ComputerShutdown from '../components/kafejka/ComputerShutdown'
import ComputerAssignFilia from '../components/kafejka/ComputerAssignFilia'
import ComputerShutdownAll from '../components/kafejka/ComputerShutdownAll'
import ComputerOnlineStatus from '../components/kafejka/ComputerOnlineStatus'
import ComputerShutdownTimeoutPanel from '../components/kafejka/ComputerShutdownTimeoutPanel'
import { Button } from '../components/ui/button'
import ComputerKatalog from '../components/kafejka/ComputerKatalog'
import ComputerRestart from '../components/kafejka/ComputerRestart'
import { ShutdownTimeProvider } from '../providers/shutdown-time-provider'
import ComputerLogout from '../components/kafejka/ComputerLogout'
import { Computer } from '@/types/computer'
import { OnboardingTutorial } from '../components/onBoarding'

interface ComputerPageProps {
  showComps: boolean
  url: string
}

const ComputerPage = memo(
  ({ showComps, url }: ComputerPageProps): React.ReactElement => {
    const { curFilia } = useParams()
    const [showTutorial, setShowTutorial] = useState(false)
    const [editingStates, setEditingStates] = useState<Record<number, boolean>>({})

    const filia = curFilia ?? ('99' as string)
    const { data, status, isLoading, error, refetch, isRefetching } =
      useComputerData(url, filia)

      

    const sortedComputers = useMemo(() => {
      return data?.sort((a, b) => {
        if (a.fields.katalog === 1) return 1
        if (b.fields.katalog === 1) return -1
        return 0
      })
    }, [data])

    const setIsEditing = useCallback((computerId: number, isEditing: boolean) => {
      setEditingStates(prev => ({...prev, [computerId]: isEditing}))
    }, [])

    return (
      <ShutdownTimeProvider>
        {showTutorial && (
          <OnboardingTutorial
            onComplete={() => setShowTutorial(false)}
            setIsEditing={setIsEditing}
          />
        )}
        <div className="grid grid-cols-[1fr_auto_auto] justify-start gap-4">
          <div className="mr-auto rounded-md bg-card shadow">
            <Button
              className="space-x-2 self-start "
              variant="secondary"
              onClick={() => {
                setShowTutorial(!showTutorial)
              }}
            >
              <Info size={16} />
              <span>Proces wdrażania 🎊 v5.2.0</span>
            </Button>
          </div>

          <Button
            className="space-x-2 "
            disabled={isRefetching}
            onClick={() => {
              refetch()
            }}
          >
            <RefreshCcw size={16} />
            {!isRefetching ? <span>Odśwież</span> : <span>Odświeżanie...</span>}
          </Button>

          {showComps ? (
            <ComputerShutdownAll url={url} />
          ) : (
            <ComputerAdd url={url} />
          )}
        </div>
        <main
          className={cn(
            'mx-auto grid justify-center gap-4 p-4',
            !showComps
              ? 'grid-cols-1 flex-wrap gap-4 md:grid-cols-2 lg:grid-cols-3'
              : ''
          )}
        >
          {isLoading && (
            <div className="self-center">
              <h2 className="text-center text-primary">
                Nawiązywanie połączenia...
              </h2>
            </div>
          )}
          {status === 'error' && <ErrorCallback errorMsg={error?.message} />}

          {status === 'success' &&
            sortedComputers?.map((computer, index) => {
              const computerID = computer.pk
              if (!showComps) {
                return (
                  <ComputerManagementSection
                    key={index}
                    computer={computer}
                    url={url}
                    computerID={computerID}
                  />
                )
              }

              return (
                <ComputerDetailsSection
                  key={index}
                  computer={computer}
                  index={index}
                  url={url}
                  showComps={showComps}
                  isEditing={editingStates[computerID] || false}
                  setIsEditing={setIsEditing}
                />
              )
            })}
        </main>
      </ShutdownTimeProvider>
    )
  }
)

export default ComputerPage
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
  isEditing: boolean
  setIsEditing: (computerId: number, isEditing: boolean) => void
}
// New memoized components
const ComputerManagementSection = memo(
  ({ computer, url, computerID }: ComputerManagementSectionProps) => (
    <section
      className={cn(
        'grid gap-4 rounded-lg bg-card p-5 text-sm text-muted-foreground shadow-md ',
        computer.fields.katalog === 1 && 'bg-border'
      )}
    >
      <ComputerAssignFilia computer={computer} url={url} />
      <ComputerKatalog computer={computer} url={url} />
      <ComputerDelete computerID={computerID} url={url} />
    </section>
  )
)

const ComputerDetailsSection = memo(
  ({
    computer,
    index,
    url,
    showComps,
    isEditing,
    setIsEditing,
  }: ComputerDetailsSectionProps) => (
    <section
      className={cn(
        'grid gap-4 rounded-lg bg-card p-5 text-sm text-muted-foreground shadow-md ',
        computer.fields.katalog === 1 && 'bg-border'
      )}
    >
      <ComputerIndex
        computer={computer}
        index={index}
        url={url}
        showComps={showComps}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
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
)
