import { useEffect, useRef } from 'react'
import type { Computer } from '@/types/computer'
import { Input } from '@/components/ui/input'
import { useChangeStateByIDMutation } from '@/hooks/mutations/useChangeStateByIDMutation'
import { cn } from '@/lib/utils'

const ComputerAssignFilia = ({
  computer,
  filia,
}: {
  computer: Computer
  filia: string
}) => {
  const { id: computerID, filia: compFilia } = computer
  const formRef = useRef<HTMLFormElement>(null)
  const { onStateChange } = useChangeStateByIDMutation(filia)

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset()
    }
  }, [computerID])

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const newFilia = formData.get('assigned-filia') as string

        onStateChange({ id: computerID, filia: newFilia })

        if (formRef.current) formRef.current.reset()
      }}
    >
      <section className="flex flex-col ">
        <label
          htmlFor="assigned-filia"
          className="flex items-center justify-between  pb-2 text-sm text-muted-foreground"
        >
          Filia{' '}
          <span className='text-end" text-xs text-muted-foreground'>
            ID {computerID}
          </span>
        </label>
        <Input
          name="assigned-filia"
          placeholder={compFilia.toString()}
          className={cn(computer.katalog === 1 && 'border-card bg-border')}
        />
      </section>
    </form>
  )
}
export default ComputerAssignFilia
