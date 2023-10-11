import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { useNavigate, Link, Outlet } from 'react-router-dom';

function PanelBibliotekarza() {
  const navigate = useNavigate();

  return (
    <div>
      {/* <Header /> */}
      <h1>Usługi BK</h1>
      <ul>
        <li>
          <Link to="komps">Komputery</Link>
        </li>
        <li>
          <Link to="legimi">Legimi</Link>
        </li>
        <li>
          <Link to="informacje">Informacje</Link>
        </li>
        <li>
          <Link to="wifi">Wifi</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

PanelBibliotekarza.propTypes = {};

export default PanelBibliotekarza;
