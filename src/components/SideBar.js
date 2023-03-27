import React from 'react';
import { Switch } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const SideBar = props => {
  const sidebarClass = props.isOpen ? 'sidebar open' : 'sidebar';
  return (
    <>
      <button
        onClick={props.toggleSidebar}
        className={`sidebar-toggle sidebar-toggle-outside ${
          props.isOpen ? 'display-none' : ''
        }`}
      >
        <FilterAltIcon />
        Filtry
      </button>
      <div className={sidebarClass}>
        <button onClick={props.toggleSidebar} className="sidebar-toggle ">
          <FilterAltIcon />
          Filtry
        </button>
        <span>Kody Legimi</span>

        <Switch onClick={props.filterLegimi} />
        <span>Kody Empik</span>

        <Switch onClick={props.filterEmpik} />
      </div>
    </>
  );
};
