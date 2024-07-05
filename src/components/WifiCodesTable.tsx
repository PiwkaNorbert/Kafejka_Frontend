import { cn } from '../lib/utils'
import { Code } from '../types/wifi-codes'
import { TableCell, TableRow } from './ui/table'

interface WifiCodesTableProps {
   data: Code[] 
}

const WifiCodesTable = ({ data }: WifiCodesTableProps) => {
  return (
    <>
      {data?.map((code, index) => (
        <TableRow
          key={index}
          className={cn("rounded-lg ",code.fields.w === 0 ? "bg-destructive/15 text-destructive hover:bg-destructive/10" : "bg-secondary/15 text-secondary hover:bg-secondary/10")}
          
        >
          <TableCell data-cell='Godzina' className="tabular-nums">{code.fields.cz}</TableCell>
          <TableCell data-cell='Numer karty' className="tabular-nums">
            {Math.trunc(Math.abs(+code.fields.nr + 1745) / 3)}
          </TableCell>
          <TableCell  data-cell='Status'>
            {code.fields.w === 0 ? 'Oczekuję połączenie' : 'Połączony'}
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export default WifiCodesTable
