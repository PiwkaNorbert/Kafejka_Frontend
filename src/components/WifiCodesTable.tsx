import { cn } from '../lib/utils'
import type { GetWifiCodesResponse } from '../types/wifi-codes'
import { TableCell, TableRow } from './ui/table'
import { formatDate } from '../utils/dateFormatter'

interface WifiCodesTableProps {
  data: GetWifiCodesResponse
}

const WifiCodesTable = ({ data }: WifiCodesTableProps) => {
  return (
    <>
      {data ? (
        data?.map((code, index) => (
          <TableRow
            key={index}
            className={cn(
              'rounded-lg ',
              code.w === 0
                ? 'bg-destructive/15 text-destructive hover:bg-destructive/10'
                : 'bg-secondary/15 text-secondary hover:bg-secondary/10'
            )}
          >
            <TableCell data-cell="Godzina" className="tabular-nums">
              {formatDate(code.cz)}
            </TableCell>
            <TableCell data-cell="Numer karty" className="tabular-nums">
              {Math.trunc(Math.abs(+code.nr + 1745) / 3)}
            </TableCell>
            <TableCell data-cell="Status">
              {code.w === 0 ? 'Oczekuję na połączenie' : 'Połączony'}
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={3}>Brak danych</TableCell>
        </TableRow>
      )}
    </>
  )
}

export default WifiCodesTable
