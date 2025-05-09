import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import WifiCodesTable from '../components/WifiCodesTable'
import { Button } from '../components/ui/button'

import { InfoIcon } from 'lucide-react'
import { Input } from '../components/ui/input'
import { Skeleton } from '../components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { wifiCodeOptions } from '../hooks/options/wifi-code-options'
import { fetchApi } from '../lib/custom-fetch'

export async function addWifiCode(filia: string | undefined, value: number) {
  const response = await fetchApi({
    url: 'http://192.168.15.220:8080',
    port: '8080',
    path: `/hotspot-code/${filia}/${value * 3 - 1745}/`,
  })

  return response
}

const useWifi = (filia: string | undefined) => {
  const queryClient = useQueryClient()

  const addCodeMutation = useMutation({
    mutationFn: ({
      filia,
      value,
    }: {
      filia: string | undefined
      value: number
    }) => addWifiCode(filia, value),
    onSuccess: () => {
      toast.success('Kod został wysłany!', { toastId: 'addCode' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['wifiCodes', filia] })
    },
    onError: () => {
      toast.error('Kod niezostał wysłany', { toastId: 'removeCode' })
    },
  })

  return { addCodeMutation }
}

const WifiPerms = () => {
  const { curFilia } = useParams()
  const filia = curFilia
  const { data, status, error, isLoading } = useQuery(wifiCodeOptions(filia))

  return (
    <div className="mx-auto grid w-full max-w-sm gap-6">
      <AddWifiCode />

      <Table>
        <TableCaption>Lista użytkowników dozwolonych do WIFI</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Godzina</TableHead>
            <TableHead>Numer karty</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-card">
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
                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                  <InfoIcon size={20} className="mb-5" />
                  Jeszcze nie udostępniono żadnemu użytkownikowi WiFi w dniu
                  dzisiejszym.
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

const AddWifiCode = () => {
  const formRef = useRef<null | HTMLFormElement>(null)
  const inputRef = useRef<null | HTMLInputElement>(null)
  const { curFilia } = useParams()
  const { addCodeMutation } = useWifi(curFilia)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (addCodeMutation.isPending) return
    const cardNumber = new FormData(e.currentTarget).get('hotspot')

    addCodeMutation.mutate(
      { filia: curFilia, value: Number(cardNumber) },
      {
        onSuccess: () => {
          if (formRef.current) {
            formRef.current.reset()
          }
        },
      }
    )
  }

  if (!curFilia)
    return (
      <div className="grid gap-4 rounded-lg bg-card p-5 shadow-md">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )

  return (
    <form
      className="grid gap-4 rounded-lg bg-card p-5 shadow-md"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <Input
        name="hotspot"
        ref={inputRef}
        placeholder="Numer karty czytelnika"
        type="number"
        className="rounded-md"
      />
      <Button type="submit" variant="accent" className="rounded-md">
        {addCodeMutation.isPending ? 'Wysyłanie...' : 'Wyślij kod'}
      </Button>
    </form>
  )
}
