import { useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import React, { MutableRefObject, useRef } from 'react'
import { Input } from '../components/ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { IP_POWROZNICZA } from '../constants'
import { cn } from '../lib/utils'
import { InfoIcon } from 'lucide-react'
import useReportData, { useReportColumnData } from '../hooks/useReportData'
import { Column } from '../types/makulatura/columns'

export default function Makulatura() {
  const { curFilia } = useParams()
  

  return (
    <React.Fragment>
      <div className="flex flex-col grow-1 gap-4 h-full items-center justify-center p-4 max-w-screen-md mx-auto">
        <main className=" w-full">
          <RaportsList curFilia={curFilia ?? ''} />
        </main>
      </div>
    </React.Fragment>
  )
}

export const RaportsList = ({ curFilia }: { curFilia: string }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') || null
  // const navigate = useNavigate();

  const {
    data: data,
    status,
    error,
  } = useReportData(curFilia)

  const handleUpdate = (tab: number) => {
    const tabString = tab.toString()

    if (typeof tabString === 'string') {
      setSearchParams({ tab: tabString })
    }
  }

  return (
    <div className="flex flex-col gap-4 ">
      <div className=" flex divide-x-2 border-b-2 overflow-x-auto shadow rounded-lg">
        {status === "pending" && <div>Loading...</div>}
        {status === "error" && <div>{error?.message} </div>}
        {status === "success" && data.length === 0 && (
        
           <div className="bg-card ">
            <div className="bg-primary/15 text-primary grid grid-cols-[20px_1fr] gap-2 items-center p-4 rounded-lg">
              <InfoIcon size={20} className='self-start mt-0.5'  /> Brak arkuszów na danej Filii, proszę się skontaktować z działem informatyzacji, aby dodać.
            </div>
           </div>
        )}

        {status === "success" && data.length > 0 &&
          data?.map((raport, idx) => {
            return (
              <Button
                key={idx}
                className={cn("inline-flex gap-1 items-center rounded-none border-b border-transparent text-accent-foreground/75",
                  tab === raport.report_id.toString() ? 'border-b-primary border-b' : 'border-transparent'
                )}
                variant={tab === raport.report_id.toString() ? 'secondary' : 'ghost'}
                onClick={() => {
                  handleUpdate(raport.report_id)
                }}
              >
                {raport.title}
                <span className="text-sm text-primary/75">
                  ({raport.count})
                </span>
              </Button>
            )
          })}
      </div>
      <RaportColumns tab={tab} curFilia={curFilia} />
    </div>
  )
}

const RaportColumns = ({
  curFilia,
  tab,
}: {
  curFilia: string
  tab: string | null
}) => {

  const {
    data: data,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useReportColumnData(curFilia, tab)


  return (
    <div className="flex flex-col gap-4 pt-6 max-w-screen-md mr-auto divide-y p-6">
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error?.message} </div>}
      {isSuccess &&
        data?.map(detail => {
          return (
            <div key={detail.detail_id} className="w-full pt-1">
              <RaportForm tab={tab} detail={detail} />
            </div>
          )
        })}
    </div>
  )
}

const RaportForm = ({tab, detail}: {tab: string | null, detail: Column}) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const { mutate: updateDetailValue, status } = useMutateDetails(tab, formRef)


  return (
    <form
    ref={formRef}
    className="flex flex-col w-full gap-4"
    onSubmit={event => {
      event.preventDefault()
      const id = new FormData(event.currentTarget)?.get('id')
      const response = new FormData(event.currentTarget)?.get(
        'response'
      )

      if (typeof id === 'string' && typeof response === 'string') {
        updateDetailValue({ id, response })
      }
    }}
  >
    <p className="text-sm text-accent-foreground/75">

    {detail.title}
    </p>
    <div className="flex space-x-2">
      <Input
        
        name="id"
        className="hidden"
        defaultValue={detail.detail_id}
      />
      <Input placeholder={detail.response ?? ''} name="response" />

      <Button type="submit" disabled={status === 'pending'}  className='min-w-[71.89px]'>
        {status === 'pending' ? '...' : 'Zmień'}
      </Button>
    </div>
  </form>
  )
}

type Payload = { id: string; response: string }

function useMutateDetails(tab: string | null, formRef: MutableRefObject<HTMLFormElement | null>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: Payload) => updateDetailPOST(payload),
    onSuccess: () => {
      toast.success('Raport został stworzony')
      console.log(formRef.current)
      if (formRef.current) {
        formRef.current.reset()
      }
    },
    onError: error => {
      console.error(error)
    },
    onSettled: () => {
      if (typeof tab === 'string') {
        queryClient.invalidateQueries({ queryKey: ['report-details', tab] })
      }
    },
  })
}

const updateDetailPOST = async (payload: Payload) => {
  
  try {
    const res = await fetch(
      `${IP_POWROZNICZA}:8080/update-report-details/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    )

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}, ${res.statusText}`)
    }
    return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error("Nastąpił problem z połączeniem z serwerem. Spróbuj ponownie.")
  }
}
