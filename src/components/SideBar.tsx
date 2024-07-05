import { Switch } from "../components/ui/switch"
import { Filter } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { useFilters } from '../hooks/useFilters';

function SideBar() {

  const {
    sidebarOpen,
    handleViewSidebar,
    toggleLegimi,
    filterLegimi,
    toggleEmpik,
    filterEmpik,
    toggleInputs,
    showInputCodes,
  } = useFilters();

  const sidebarClass = cn("fixed p-3 top-[175px] grid p-3 divide-y rounded-lg gap-4  sidebar",
    sidebarOpen ? 'open' : '');
  return (
    <>
    <div className='bg-card rounded-md'>
    
      <Button
        onClick={handleViewSidebar}
        className="space-x-2 text-base sidebar-toggle sidebar-toggle-outside"
      >
        <Filter size={16} />
        Filtry
      </Button>
    </div>
      
      <div className={sidebarClass}>
 
        <div className="grid gap-2 place-items-center text-sm">
          <span className="align-middle font-medium text-muted-foreground capitalize text-center">Kody Legimi</span>
          <Switch checked={toggleLegimi} onCheckedChange={filterLegimi} />
        </div>
        <div className="grid gap-2 place-items-center text-sm">
        <span className="align-middle font-medium text-muted-foreground capitalize text-center">Kody Empik</span>
          <Switch checked={toggleEmpik} onCheckedChange={filterEmpik} disabled={true} />
        </div>
        <div className="grid gap-2 place-items-center text-sm">
        <span className="align-middle font-medium text-muted-foreground capitalize text-center">Pole Edycji</span>
          <Switch checked={toggleInputs} onCheckedChange={showInputCodes} disabled={false} />
        </div>
      </div>
    </>

  );
}


export default SideBar;
