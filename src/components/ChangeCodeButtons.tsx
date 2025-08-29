import { Button } from '@/components/ui/button'
import { useChangeCodes } from '@/hooks/mutations/useChangeCodes'
import { Minus, Plus } from 'lucide-react'

const ChangeCodeButtons = ({
  amount,
  type,
  children,
}: {
  amount: number
  type: 'legimi' | 'empik'
  children?: React.ReactNode
}) => {
  const { onChange, changeCodesMutation } = useChangeCodes()

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 pt-2 first:pt-0">
      <h1 className="text-center align-middle font-medium capitalize  text-muted-foreground">
        {type}
      </h1>
      <div className="flex items-center justify-center space-x-2">
        <Button
          disabled={changeCodesMutation.isPending || amount === 0}
          variant="destructive"
          type="submit"
          onClick={() => {
            onChange({ action: 'sub-codes', type })
          }}
        >
          <Minus size={16} />
        </Button>

        {children}

        <Button
          disabled={changeCodesMutation.isPending}
          variant="secondary"
          type="submit"
          onClick={() => {
            onChange({ action: 'add-codes', type })
          }}
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  )
}

export default ChangeCodeButtons
