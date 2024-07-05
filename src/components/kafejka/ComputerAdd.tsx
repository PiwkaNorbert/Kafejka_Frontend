import { Button } from '../ui/button'
import { IP_PRZEKIEROWANIE } from '../../constants'
import { useAddComputer } from '../../hooks/mutations/useAddComputer'
import { Plus } from 'lucide-react'


const ComputerAdd = ({ url }: { url: string }) => {
  const { onAdd, addPCMutation } = useAddComputer(url)

  if (window.location.hostname.includes(IP_PRZEKIEROWANIE)) return null

  return (
    <div className='ml-auto bg-card rounded-md shadow'>

      <Button
        disabled={addPCMutation.isPending}
        className='ml-auto space-x-2'
        onClick={onAdd}
      >
        <Plus size={16} />
        <span>Dodaj Komputer</span>
      </Button>
    </div>
  )
}

export default ComputerAdd



