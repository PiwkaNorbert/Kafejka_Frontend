import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { IP_MATEUSZ } from '../../constants'
import { fetchApi } from '../../lib/custom-fetch'
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
    mutationFn: (compId) =>
      fetchApi({
        url: IP_MATEUSZ,
        port: '8080',
        path: `/delete-pc/${filia}/${compId}`,
      }),
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
