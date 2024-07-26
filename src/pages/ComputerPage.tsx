import { useParams } from 'react-router-dom'
import { memo } from 'react'
import { cn } from '../lib/utils'
import ErrorCallback from '../components/Errors/ErrorCallback'
import { useComputerData } from '../hooks/useComputerData'
import { RefreshCcw } from 'lucide-react';

import ComputerAdd from '../components/kafejka/ComputerAdd'
import ComputerIndex from '../components/kafejka/ComputerIndex'
import ComputerDelete from '../components/kafejka/ComputerDelete'
import ComputerShutdown from '../components/kafejka/ComputerShutdown'
import ComputerAssignFilia from '../components/kafejka/ComputerAssignFilia'
import ComputerShutdownAll from '../components/kafejka/ComputerShutdownAll'
import ComputerOnlineStatusMemo from '../components/kafejka/ComputerOnlineStatus'
import ComputerShutdownTimeoutPanel from '../components/kafejka/ComputerShutdownTimeoutPanel'
import { Button } from '../components/ui/button'
import ComputerKatalog from '../components/kafejka/ComputerKatalog'
// import ComputerRestartMemo from '../components/kafejka/ComputerRestart'

interface ComputerPageProps {
  showComps: boolean
  url: string
}

const ComputerPage = ({
  showComps,
  url,
}: ComputerPageProps): React.ReactElement => {
  const { curFilia } = useParams()

  const filia = curFilia ?? "99" as string
  const { data, status, isLoading, error, refetch, isRefetching } =
    useComputerData(url, filia)


  return (
    <>

      <div className="gap-4 grid grid-cols-[auto_auto] justify-end">
        <Button className="space-x-2 " disabled={isRefetching} onClick={() => {
          refetch()
        }}>
          <RefreshCcw size={16} />
          {!isRefetching ? (
            <span>
              Odśwież
            </span>

          ) : (
            <span>
              Odświeżanie...
            </span>
          )}

        </Button>

        {showComps ? (
          <ComputerShutdownAll url={url} />

        ) : (

          <ComputerAdd url={url} />
        )}

      </div>
      <main className={cn("grid gap-4 p-4 justify-center mx-auto", !showComps ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap" : "")}>

        {isLoading && (
          <div className="self-center">
            <h2 className="text-center text-primary">Nawiązywanie połączenia...</h2>
          </div>
        )}
        {status === "error" &&
          (<ErrorCallback errorMsg={error?.message} />)
        }

        {status === "success" && data?.sort((a, b) => {
          // put the katablogs at the end
          if (a.fields.katalog === 1) return 1
          if (b.fields.katalog === 1) return -1
          return 0
        }).map((computer, index) => {

          const computerID = computer.pk
          const { katalog } = computer.fields


          if (!showComps) {
            return (
              <section className={cn("bg-card p-5 grid gap-4 shadow-md rounded-lg text-muted-foreground text-sm ",
                katalog === 1 && "bg-border"
              )} key={index} >

                <ComputerAssignFilia computer={computer} url={url} />
                <ComputerKatalog computer={computer} url={url} />
                <ComputerDelete computerID={computerID} url={url} />

              </section>
            )
          }

          return (
            <section key={index} className={cn("bg-card p-5 grid gap-4 shadow-md rounded-lg text-muted-foreground text-sm ",
              katalog === 1 && "bg-border"
            )}  >
              <ComputerIndex
                computer={computer}
                index={index}
                url={url}
                showComps={showComps}
              />
              {showComps && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ComputerShutdown computer={computer}
                    url={url} />
                  <ComputerOnlineStatusMemo
                    computer={computer}
                    url={url}
                  />
                  {/* <ComputerRestartMemo computer={computer}
                    url={url}
                  /> */}
                  <ComputerShutdownTimeoutPanel
                    computer={computer}
                    index={index}
                    url={url}
                  />
                </div>
              )}

            </section>
          )
        })}
      </main>

    </>
  )
}
const ComputerPageMemo = memo(ComputerPage)

export default ComputerPageMemo


