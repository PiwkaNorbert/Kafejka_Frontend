import { Switch } from "../components/ui/switch"
import { Filter } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { useFilters } from '../hooks/useFilters';

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
  } = useFilters();

  const sidebarClass = cn("fixed p-3 top-[175px] grid p-3 divide-y rounded-lg gap-4  sidebar",
    sidebarOpen ? 'open' : '');
  return (
    <>
    <div className='bg-card rounded-md'>
    
      <Button
        onClick={() => handleToggleSidebar(!sidebarOpen)}
        className="space-x-2 text-base sidebar-toggle sidebar-toggle-outside"
      >
        <Filter size={16} />
        Filtry
      </Button>
    </div>
      
      <div className={sidebarClass}>
 
        <div className="grid gap-2 place-items-center text-sm">
          <span className="align-middle font-medium text-muted-foreground capitalize text-center">Kody Legimi</span>
          <Switch defaultChecked={toggleLegimi} onCheckedChange={handleFilterLegimi} />
        </div>
        <div className="grid gap-2 place-items-center text-sm">
        <span className="align-middle font-medium text-muted-foreground capitalize text-center">Kody Empik</span>
          <Switch defaultChecked={toggleEmpik} onCheckedChange={handleFilterEmpik} disabled={true} />
        </div>
        <div className="grid gap-2 place-items-center text-sm">
        <span className="align-middle font-medium text-muted-foreground capitalize text-center">Pole Edycji</span>
          <Switch defaultChecked={toggleInputs} onCheckedChange={handleCodes} disabled={false} />
        </div>
      </div>
    </>

  );
}


export default SideBar;
