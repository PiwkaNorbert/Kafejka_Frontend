import { useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import React, { MutableRefObject, useRef, useState } from 'react'
import { Input } from '../components/ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { IP_POWROZNICZA } from '../constants'
import { cn } from '../lib/utils'
import { InfoIcon } from 'lucide-react'
import useReportData, { useReportColumnData } from '../hooks/useReportData'
import { Column } from '../types/makulatura/columns'
import { Textarea } from '../components/ui/text-area'

export default function Makulatura() {
  const { curFilia } = useParams()


  return (
        <RaportsList curFilia={curFilia ?? ''} />
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
    <>
      <div className=" flex bg-card overflow-x-auto max-w-screen-sm mx-auto shadow rounded-lg">
        {status === "pending" && <div>Loading...</div>}
        {status === "error" && <div>{error?.message} </div>}
        {status === "success" && data.length === 0 && (

          <div className="bg-card ">
            <div className="bg-primary/15 text-primary grid grid-cols-[20px_1fr] gap-2 items-center p-4 rounded-lg">
              <InfoIcon size={20} className='self-start mt-0.5' /> Brak arkuszów na danej Filii, proszę się skontaktować z działem informatyzacji, aby dodać.
            </div>
          </div>
        )}

        {status === "success" && data.length > 0 &&
          data?.map((raport, idx) => {
            return (
              <Button
                key={idx}
                className={cn("inline-flex gap-1 items-center rounded-none  border-transparent text-accent-foreground/75",
                  tab === raport.report_id.toString() ? 'border-b-primary border-b-2' : 'border-transparent'
                )}
                variant='ghost'
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
    </>
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
    <div className="grid gap-4 justify-center mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap py-6 items-start ">
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error?.message} </div>}
      {isSuccess &&
        data?.map(detail => {
          return (
              <RaportForm key={detail.detail_id}  tab={tab} detail={detail} />
          )
        })}
    </div>
  )
}

const RaportForm = ({ tab, detail }: { tab: string | null, detail: Column }) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const { mutate: updateDetailValue, status } = useMutateDetails(tab, formRef)
  const [text, setText] = useState<string>(detail.response ?? '')

  const autoGrow = (element: React.RefObject<HTMLTextAreaElement>) => {
    if (element.current) {
      element.current.style.height = 'inherit'
      const scrollHeight = element.current.scrollHeight;
      element.current.style.height = scrollHeight + "px";
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    if (textAreaRef.current) {
      autoGrow(textAreaRef)
    }
  };


  return (
    <form
      ref={formRef}
      className="bg-card p-5 grid gap-4 shadow-md rounded-lg text-muted-foreground text-sm"
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

      <label htmlFor='response' className="pb-2 text-sm text-muted-foreground flex flex-row items-center justify-between">

        {detail.title}
      </label>
      <Textarea
        name="id"
        className="hidden"
        defaultValue={detail.detail_id}
      />
        
        
        <Textarea placeholder={detail.response ?? ''} name="response" value={text} onChange={handleChange} ref={textAreaRef} />

        <Button variant='accent' type="submit" disabled={status === 'pending'} className='min-w-[71.89px]'>
          {status === 'pending' ? '...' : 'Zmień'}
        </Button>
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
      queryClient.invalidateQueries({ queryKey: ['reports'] })

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
