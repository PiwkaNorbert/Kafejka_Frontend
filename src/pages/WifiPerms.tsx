import { useRef, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import WifiCodesTable from '../components/WifiCodesTable'
import { Button } from '../components/ui/button'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { InfoIcon } from 'lucide-react'
import { useHotspotData } from '../hooks/useHotspotData'
import { Input } from '../components/ui/input'

interface WifiPermsProps {
  url: string
}

const WifiPerms = ({ url }: WifiPermsProps) => {
  const formRef = useRef<null | HTMLFormElement>(null)
  const inputRef = useRef<null | HTMLInputElement>(null)
  const { curFilia } = useParams()
  const filia = curFilia ?? '99'

  const queryClient = useQueryClient()

  const { data, status, error, isLoading } = useHotspotData(url, filia)

  useEffect(()=>{
    if (inputRef.current) {
      inputRef.current.focus()
    }
  },[])

  const cardHotspotCode = async (value: number) => {
    try {
      const urlHotspotCode = `${url}hotspot-code/${filia}/${value * 3 - 1745}/`
      const { data, status } = await axios.get(urlHotspotCode)
      if (status !== 200) {
        throw new Error(`Nastpił problem: ${status}`)
      }
      return data
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to send code: ${error}`)
    }
  }

  const addCodeMutation = useMutation({
    mutationFn: (value: number) => cardHotspotCode(value),
    onSuccess: () => {
      if (formRef.current) {
        formRef.current.reset()
      }
      toast.success('Kod został wysłany!', {  toastId: 'addCode' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['wifiCodes', curFilia],
      })
    },
    onError: () => {
      toast.error("Kod niezostał wysłany", { toastId: 'removeCode' })
    },
  })

  return (
    <div className="w-full grid gap-6 mx-auto max-w-sm">
      <form
        className="grid gap-y-4 bg-background p-5 rounded-lg shadow-md"
        ref={formRef}

        onSubmit={e => {
          e.preventDefault()
          if (addCodeMutation.isPending) return
          const cardNumber = new FormData(e.currentTarget).get("hotspot")

          addCodeMutation.mutate(Number(cardNumber))
        }}
      >
        <Input
          id="hotspot"
          name="hotspot"
          ref={inputRef}
          placeholder="Numer karty czytelnika"
          type="number"
          className="rounded-md"
        />
        <Button 
          type="submit"
          variant='accent'
          className="rounded-md text-lg"
        >
          OK
        </Button>
      </form>

      <Table>
        <TableCaption>Lista użytkowników dozwolonych do WIFI</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Godzina</TableHead>
            <TableHead>Numer karty</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='bg-card'>
          {isLoading && (
            <TableRow className="">
              <TableCell colSpan={3}>Loading...</TableCell>
            </TableRow>
          )}
          {status === 'error' && (
            <TableRow className="bg-destructive/15 text-destructive hover:bg-destructive/15">
              <TableCell colSpan={3}>{error?.message} </TableCell>
            </TableRow>
          )}
          {status === 'success' && data.length === 0 && (
            <TableRow className="bg-primary/15 text-primary hover:bg-primary/15">
              <TableCell colSpan={3}>
                {' '}
                <div className="grid grid-cols-[20px_1fr] gap-2 items-center">
                  <InfoIcon size={20} className="mb-5" />
                   Jeszcze nie udostępniono żadnemu użytkownikowi WiFi w dniu dzisiejszym.
                </div>
              </TableCell>
            </TableRow>
          )}

          {status === 'success' && data.length > 0 && (
            <WifiCodesTable data={data} />
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default WifiPerms
