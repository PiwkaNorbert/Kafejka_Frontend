import { useParams } from 'react-router-dom'
import { memo, useMemo, lazy, Suspense } from 'react'
import { cn } from '../lib/utils'
import ErrorCallback from '../components/Errors/ErrorCallback'
import { useComputerData } from '../hooks/useComputerData'

import ComputerAdd from '../components/kafejka/ComputerAdd'

import { Button } from '../components/ui/button'
import ComputerShutdownAll from '../components/kafejka/ComputerShutdownAll'
import { ShutdownTimeProvider } from '../providers/shutdown-time-provider'
import { RefreshCw } from 'lucide-react'

const ComputerDetailsSection = lazy(() => import('../components/kafejka/computer-section.tsx').then(module => ({ default: module.ComputerDetailsSection })))
const ComputerManagementSection = lazy(() => import('../components/kafejka/computer-section.tsx').then(module => ({ default: module.ComputerManagementSection })))

interface ComputerPageProps {
  showComps: boolean
  url: string
}

const ComputerPage = memo(
  ({ showComps, url }: ComputerPageProps): React.ReactElement => {
    const { curFilia } = useParams()

    const filia = curFilia ?? ('99' as string)
    const { data, status, isLoading, error, refetch, isFetching } = useComputerData(
      url,
      filia
    )

    const sortedComputers = useMemo(() => {
      return data?.sort((a, b) => {
        if (a.fields.katalog === 1) return 1
        if (b.fields.katalog === 1) return -1
        return 0
      })
    }, [data])

    return (
      <ShutdownTimeProvider>
        <div className="grid grid-cols-[auto_auto] justify-end gap-4">
          <Button
            className="group space-x-2"
            disabled={isFetching}
            onClick={() => {
              refetch()
            }}
          >
            <RefreshCw size={16} className={cn('group-hover:animate-spin')} />
            <span>Odśwież</span>
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
          <Suspense fallback={<></>}>
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
                  />
                )
              })}
          </Suspense>
        </main>
      </ShutdownTimeProvider>
    )
  }
)

export default ComputerPage
