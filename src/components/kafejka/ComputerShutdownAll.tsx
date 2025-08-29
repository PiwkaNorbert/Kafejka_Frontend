import { Button } from '@/components/ui/button'
import { computerQueryKeys } from '@/hooks/useComputerData'
import { shutdownAllComputersAction } from '@/mutations'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Power } from 'lucide-react'
import { toast } from 'react-toastify'

const ComputerShutdownAll = ({ filia }: { filia: string }) => {
  // Send a get to shutdown all computers
  const queryClient = useQueryClient()

  const { mutate: shutdownAllComputers, isPending } = useMutation({
    mutationFn: () => shutdownAllComputersAction(filia),
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
