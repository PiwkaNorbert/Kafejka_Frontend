import { Computer } from '../../types/computer'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useShutdownTime } from '../../hooks/useShutdownTime'
import { memo } from 'react'

interface ComputerShutdownTimeoutPanelProps {
  computer: Computer
  index: number
}

const ComputerShutdownTimeoutPanel = memo(({
  computer,
}: ComputerShutdownTimeoutPanelProps) => {
  const { shutdownTime, setShutdownTime } = useShutdownTime()

  if (computer.fields.katalog) return null

  const handleTimeoutChange = (value: string) => {
    setShutdownTime(value)
  }

  return (
    <form className="w-full">
      <Select
        name="timeout"
        defaultValue="0"
        value={shutdownTime}
        onValueChange={handleTimeoutChange}
      >
        <SelectTrigger disabled={computer.fields.f === 5}>
          <SelectValue placeholder="Wyłącz za" />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value }, index) => (
            <SelectItem
              key={index}
              className="w-full "
              value={value}
            >
              {value} min {'    '}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  )
})

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
