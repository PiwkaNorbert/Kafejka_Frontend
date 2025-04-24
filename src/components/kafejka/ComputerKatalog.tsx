import { useEffect, useRef } from 'react'
import { Computer } from '@/types/computer'
import { Input } from '../ui/input'
import { useChangeStateByIDMutation } from '../../hooks/mutations/useChangeStateByIDMutation'
import { toast } from 'react-toastify'
import { cn } from '../../lib/utils'

const ComputerKatalog = ({
  computer,
  url,
}: {
  computer: Computer
  url: string
}) => {
  const { id: computerID, katalog } = computer
  const formRef = useRef<HTMLFormElement>(null)
  const { onStateChange } = useChangeStateByIDMutation(url)

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
        const katalogValue = formData.get('katalog')
        // check if katalog is either a 0 or 1

        interface Katalog {
          katalog: 0 | 1
        }
        // Check if katalogValue is either '0' or '1', and then convert it to number
        if (katalogValue !== '0' && katalogValue !== '1') {
          toast.error('Katalog musi być 0 or 1')
        } else {
          // Convert katalogValue to number and ensure it matches the Katalog type
          const katalogNumber: Katalog = {
            katalog: Number(katalogValue) as 0 | 1,
          }
          onStateChange({ id: computerID, katalog: katalogNumber.katalog })
        }

        if (formRef.current) formRef.current.reset()
      }}
    >
      <section className="flex flex-col ">
        <label
          htmlFor="assigned-filia"
          className="flex items-center justify-between  pb-2 text-sm text-muted-foreground"
        >
          Katalog{' '}
          <span className='text-end" text-xs text-muted-foreground'>0 | 1</span>
        </label>
        <Input
          name="katalog"
          placeholder={katalog.toString()}
          className={cn(
            katalog === 1 && 'border-card bg-border'
          )}
        />
      </section>
    </form>
  )
}
export default ComputerKatalog
