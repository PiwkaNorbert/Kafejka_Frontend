import { deleteComputerByIdAction } from '@/mutations'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'

interface ComputerDeleteProps {
  computerID: number
  filia: string
}

const ComputerDelete = ({ computerID, filia }: ComputerDeleteProps) => {
  const { curFilia } = useParams()
  const queryClient = useQueryClient()

  const { mutate: deleteComputerById, isPending } = useMutation<
    string,
    Error,
    number
  >({
    mutationFn: (compId) => deleteComputerByIdAction(filia, compId),
    onSuccess: () => {
      toast.success('Komputer został usunięty')
      // queryClient.setQueryData({ queryKey: ['komps', curFilia] }, old => {

      // });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['komps', curFilia] })
    },
    onError: (error) => {
      toast.error(`Komputer niezostał usunięty: ${error?.message}`)
    },
  })

  const handleDelete = () => {
    if (isPending) return
    deleteComputerById(computerID)
  }

  return (
    <Button disabled={isPending} onClick={handleDelete} variant="destructive">
      Usuń
    </Button>
  )
}

export default ComputerDelete
