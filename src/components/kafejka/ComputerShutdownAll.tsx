import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { Power } from 'lucide-react'

const ComputerShutdownAll = ({ url }: { url: string }) => {
  const { curFilia } = useParams()
  // Send a get to shutdown all computers
  const queryClient = useQueryClient()

  const { mutate: shutdownAllComputers, isPending } = useMutation({
    mutationFn: async () => {
      const urlSDAll = `${url}shutdown-all/${curFilia}/`

      const res = await fetch(urlSDAll)
      if (!res.ok) {
        throw new Error(`Nastpił problem: ${status}`)
      }
      return await res.json()
    },
    onSuccess: () => {
      toast.success('Wszystkie komputery zostały wyłączone', { icon: <Power /> })
      // queryClient.setQueryData({ queryKey: ['komps', curFilia] }, old => {
        return queryClient.invalidateQueries({ queryKey: ['komps', curFilia] })

      // });
    },
    onError: error => {
      console.error(error)
      toast.error('Komputery niezostały wyłączone', { icon: <Power /> })
    },
  })

  return (
    <div className='ml-auto bg-card rounded-md shadow'>
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
