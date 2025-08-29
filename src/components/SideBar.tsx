import { Switch } from '../components/ui/switch'
import { Filter } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '../lib/utils'
import { useFilters } from '../hooks/useFilters'

function SideBar() {
  const {
    sidebarOpen,
    toggleLegimi,
    toggleEmpik,
    toggleInputs,
    handleToggleSidebar,
    handleFilterLegimi,
    handleFilterEmpik,
    handleCodes,
  } = useFilters()

  const sidebarClass = cn(
    'fixed p-3 top-[175px] grid p-3 divide-y rounded-lg gap-4  sidebar',
    sidebarOpen ? 'open' : ''
  )
  return (
    <>
      <div className="rounded-md bg-card">
        <Button
          onClick={() => handleToggleSidebar(!sidebarOpen)}
          className="sidebar-toggle sidebar-toggle-outside space-x-2 text-base"
        >
          <Filter size={16} />
          Filtry
        </Button>
      </div>

      <div className={sidebarClass}>
        <div className="grid place-items-center gap-2 text-sm">
          <span className="text-center align-middle font-medium capitalize text-muted-foreground">
            Kody Legimi
          </span>
          <Switch
            defaultChecked={toggleLegimi}
            onCheckedChange={handleFilterLegimi}
          />
        </div>
        <div className="grid place-items-center gap-2 text-sm">
          <span className="text-center align-middle font-medium capitalize text-muted-foreground">
            Kody Empik
          </span>
          <Switch
            defaultChecked={toggleEmpik}
            onCheckedChange={handleFilterEmpik}
            disabled={true}
          />
        </div>
        <div className="grid place-items-center gap-2 text-sm">
          <span className="text-center align-middle font-medium capitalize text-muted-foreground">
            Pole Edycji
          </span>
          <Switch
            defaultChecked={toggleInputs}
            onCheckedChange={handleCodes}
            disabled={false}
          />
        </div>
      </div>
    </>
  )
}

export default SideBar
