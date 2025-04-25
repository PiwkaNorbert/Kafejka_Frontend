import { IP_MATEUSZ } from '@/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Power } from 'lucide-react'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { fetchApi } from '@/lib/custom-fetch'
import { computerQueryKeys } from '@/hooks/useComputerData'

const ComputerShutdownAll = ({ filia }: { filia: string }) => {
  // Send a get to shutdown all computers
  const queryClient = useQueryClient()

  const { mutate: shutdownAllComputers, isPending } = useMutation({
    mutationFn: () =>
      fetchApi({
        url: IP_MATEUSZ,
        port: '8080',
        path: `/shutdown-all/${filia}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: computerQueryKeys.byFilia(filia),
      })
      toast.success('Wszystkie komputery zostały wyłączone', {
        icon: <Power />,
      })
    },
    onError: (error) => {
      console.error(error)
      toast.error('Komputery niezostały wyłączone', { icon: <Power /> })
    },
  })

  return (
    <div className="ml-auto rounded-md bg-card shadow">
      <Button
        disabled={isPending}
        className="space-x-2"
        onClick={() => {
          if (isPending) return
          shutdownAllComputers()
        }}
      >
        <Power size={16} />

        <span>Wyłącz Wszystkie</span>
      </Button>
    </div>
  )
}

export default ComputerShutdownAll
