import {
  ComputerShutdownTimeoutPanelProps,
} from '../../types/computer'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useChangeStateByIDMutation } from '../../hooks/mutations/useChangeStateByIDMutation'

const ComputerShutdownTimeoutPanel = ({
  computer,
  url,
}: ComputerShutdownTimeoutPanelProps) => {

  // Set status Shutdown Time
  

  const { onStateChange, changeStateByIDMutation } = useChangeStateByIDMutation(url)
  if (computer.fields.katalog) return null

  return (
        <form className='w-full' >
          <Select name="timeout" disabled={changeStateByIDMutation.isPending} onValueChange={(e)=> {

            const numberValue: number = Number(e)
            return onStateChange({ id: computer.pk, t: numberValue, flag: 6})

          }} >
            <SelectTrigger  disabled={changeStateByIDMutation.isPending || computer.fields.f === 5}>
              <SelectValue  placeholder=" Wyłącz za" />
            </SelectTrigger>
            <SelectContent>
              {options.map(({ value }, index) => (
                <SelectItem key={index} className="w-full " value={value} disabled={value === '0'}>

                {value} min {"    "}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </form>
  )
}

// options for a select with increments of 5 up to 60
const options = [
  { value: '0' },
  { value: '5' },
  { value: '10' },
  { value: '15' },
  { value: '20' },
  { value: '25' },
  { value: '30' },
  { value: '35' },
  { value: '40' },
  { value: '45' },
  { value: '50' },
  { value: '55' },
  { value: '60' },
]

export default ComputerShutdownTimeoutPanel
