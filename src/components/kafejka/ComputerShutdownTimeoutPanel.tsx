import { useCallback } from 'react'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import {
  ComputerArray,
  ComputerShutdownTimeoutPanelProps,
} from '../../types/computer'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const ComputerShutdownTimeoutPanel = ({
  computer,
  url,
}: ComputerShutdownTimeoutPanelProps) => {
  const { curFilia } = useParams()
  const queryClient = useQueryClient()
  // Set status Shutdown Time
  

  const { mutate: shutdownPCInMutation, isPending } = useMutation({
    mutationFn: async (closeByAmount: number) => {
      const urlShutdownTimeout = `${url}shutdown-timeout/${computer.pk}/${closeByAmount}/`
      const res = await fetch(urlShutdownTimeout)
      if (!res.ok) {
        throw new Error(`Bład w ComputerShutdownTimeoutPanel: ${res.statusText}`)
      }
      return await res.json()
    },
    onSuccess: response => {
      queryClient.setQueryData(
        ['komps', curFilia],
        (oldData: ComputerArray) => {
          return oldData.map(comp => {
            if (comp.pk === response[0].pk) {
              return {
                ...comp,
                fields: { ...response[0].fields },
              }
            } else {
              return {
                ...comp,
                fields: { ...comp.fields },
              }
            }
          })
        }
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['komps', curFilia] })
    },
    onError: error => {
      toast.error(error?.message)
    },
  })

  const handleSubmit = useCallback(
    (value: number) => {

      // mutate based by the input value
      if (isPending || isNaN(value)) return
      shutdownPCInMutation(value, {
        onSuccess: () => {
          toast.success(`Za ${value} minut nastąpi wyłączenie komputera.`, {
            toastId: `timeout-${computer.pk}`,
          })
        },
      })
    },
    [isPending, shutdownPCInMutation, computer.pk]
  )
  if (computer.fields.katalog) return null

  return (
        <form className='w-full' >
          <Select name="timeout" disabled={isPending} onValueChange={(e)=> {

            const numberValue: number = Number(e)
            return handleSubmit(numberValue)

          }} >
            <SelectTrigger  disabled={isPending || computer.fields.f === 5}>
              <SelectValue  placeholder=" Wyłącz za" />
            </SelectTrigger>
            <SelectContent>
              {options.map(({ value }, index) => (
                <SelectItem key={index} className="w-full " value={value} disabled={value === '0'}>

                {value} min {"    "}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </form>
  )
}

// options for a select with increments of 5 up to 60
const options = [
  { value: '0' },
  { value: '5' },
  { value: '10' },
  { value: '15' },
  { value: '20' },
  { value: '25' },
  { value: '30' },
  { value: '35' },
  { value: '40' },
  { value: '45' },
  { value: '50' },
  { value: '55' },
  { value: '60' },
]

export default ComputerShutdownTimeoutPanel
