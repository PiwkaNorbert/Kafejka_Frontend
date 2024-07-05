import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'

interface ComputerDeleteProps {
  computerID: number
  url: string
}

const ComputerDelete = ({ computerID, url }: ComputerDeleteProps) => {
  const { curFilia } = useParams()
  const queryClient = useQueryClient()

  const { mutate: deleteComputerById, isPending } = useMutation<
    string,
    Error,
    number
  >({
    mutationFn: async compId => {
      const deletePCURL = `${url}delete-pc/${compId}/`

      const { data, status } = await axios.get(deletePCURL)
      if (status !== 200) {
        throw new Error(`Nastpił problem: ${status}`)
      }
      return data
    },
    onSuccess: () => {
      toast.success('Komputer został usunięty')
      // queryClient.setQueryData({ queryKey: ['komps', curFilia] }, old => {

      // });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['komps', curFilia] })
    },
    onError: error => {
      toast.error(`Komputer niezostał usunięty: ${error?.message}`)
    },
  })

  const handleDelete = () => {
      if (isPending) return
      deleteComputerById(computerID)
  }


  return (
        <Button
          disabled={isPending}
          onClick={handleDelete}
          variant='destructive'
        >
          Usuń
        </Button>
  )
}

export default ComputerDelete
