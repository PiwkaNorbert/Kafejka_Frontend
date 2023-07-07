import { Switch } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PropTypes from 'prop-types';

function SideBar(props) {
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
}

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  filterLegimi: PropTypes.func.isRequired,
  filterEmpik: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
export default SideBar;
