import { useParams, useSearchParams } from 'react-router'
import { Button } from '../components/ui/button'
import React, { MutableRefObject, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { IP_POWROZNICZA } from '../constants'
import { cn } from '../lib/utils'
import { InfoIcon } from 'lucide-react'
import useReportData, { useReportColumnData } from '../hooks/useReportData'
import { Textarea } from '../components/ui/text-area'
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from '../components/ui/table'
import { Row } from '@/types/dystrybucja/columns'

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
    data,
    status,
    isLoading
  } = useReportColumnData(curFilia, tab)


  if (isLoading) return <div>Loading...</div>
  if (status === 'error') return <div>{status}</div>

  return (
    <Table>
      <TableCaption>Arkusze</TableCaption>
      <TableHeader>
        <TableRow>
          {data && data.columns.map((column, idx) => (
            <TableCell key={idx}>
              {column === 'entity' ? 'Miejsce' : column}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.rows.map((report, rowIndex) => (
          <TableRow key={`${report.entity}-${rowIndex}`} className="border">
            {data.columns.map((column, colIndex) => (
              <TableCell key={colIndex}>
                {column === 'entity' ? (
                  report.entity
                ) : (
                  typeof report[column] === 'object' ? (
                    <RaportForm tab={tab} report={report} reportKey={column} />
                  ) : (
                    report[column]
                  )
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
type Report = {
  response: string;
  id: string;
};

function isReport(value: any): value is Report {
  return value && typeof value === 'object' && 'response' in value && 'id' in value;
}

const RaportForm = ({ tab, report, reportKey }: { tab: string | null, report: Row, reportKey: string }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { mutate: updateDetailValue, status } = useMutateDetails(tab, formRef);
  
  // Ensure the reportKey value is of type Report before accessing its properties
  const reportValue = report[reportKey];
  const response = isReport(reportValue) ? reportValue .response : '';
  const id = isReport(reportValue) ? reportValue.id : '';


  const autoGrow = (element: React.RefObject<HTMLTextAreaElement>) => {
    if (element.current) {
      element.current.style.height = 'inherit';
      const scrollHeight = element.current.scrollHeight;
      element.current.style.height = scrollHeight + "px";
    }
  };

  const handleChange = () => {
    if (textAreaRef.current) {
      autoGrow(textAreaRef);
    }
  };


  const handleSubmit = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const id = formData.get('id');
      const response = formData.get('response');


      if (typeof id === 'string' && typeof response === 'string') {
        updateDetailValue({ id, response }, {
          onSettled: () => {
            if (formRef.current) {
              formRef.current.reset();
            }
          }
        });

      }
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      ref={formRef}
      className='flex gap-2 h-10'
      onSubmit={event => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <Textarea className="hidden resize-none size-0" name="id" defaultValue={id} />
      <Textarea className='max-h-[76px] resize-none' placeholder={response} name="response" onChange={handleChange} onKeyDown={handleKeyDown}
        ref={textAreaRef} />
      <Button variant='accent' type="submit" disabled={status === 'pending'} className='min-w-[71.89px]'>
        {status === 'pending' ? '...' : 'Zmień'}
      </Button>
    </form>
  );
};

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
