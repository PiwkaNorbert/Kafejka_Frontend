
import { ReactNode, createContext, useState } from "react";

export interface FilterContextType {
  toggleLegimi: boolean;
  filterLegimi: (checked: boolean) => void;
  toggleEmpik: boolean;
  filterEmpik: (checked: boolean) => void;
  sidebarOpen: boolean;
  toggleInputs: boolean;
  handleViewSidebar: () => void;
  showInputCodes: (checked: boolean) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

type Props = { children: ReactNode }

export const FilterProvider = ({ children }: Props) => {
  const [toggleLegimi, setToggleLegimi] = useState<boolean>(false);
  const [toggleEmpik, setToggleEmpik] = useState<boolean>(false);
  const [toggleInputs, setToggleInputs] = useState<boolean>(false);
  const [sidebarOpen, setSideBarOpen] = useState<boolean>(() => {
    const sidebarBoolean = localStorage.getItem('sidebar')
    if(sidebarBoolean) {
      return  JSON.parse(sidebarBoolean) 
    }
    return false
  })

  const handleViewSidebar = () => {
    const updatedSidebarOpen = !sidebarOpen;
    setSideBarOpen(updatedSidebarOpen);
    localStorage.setItem('sidebar', JSON.stringify(updatedSidebarOpen));
  };

  const filterLegimi = (checked: boolean): void => {
    setToggleLegimi(checked);
  };

  const filterEmpik = (checked: boolean): void => {
    setToggleEmpik(checked);
  };

  const showInputCodes = (checked: boolean): void => {
    setToggleInputs(checked);
  };

return (
    <FilterContext.Provider value={{showInputCodes, filterEmpik, filterLegimi, handleViewSidebar, toggleInputs, toggleEmpik, toggleLegimi, sidebarOpen}} >
    { children }
    </FilterContext.Provider>
)}