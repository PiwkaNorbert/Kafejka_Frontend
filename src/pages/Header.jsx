import React, { useState } from 'react';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import ComputerIcon from '@mui/icons-material/Computer';
import SettingIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import Feather from '../components/Feather';
import ComputerShutdownAll from '../components/ComputerShutdownAll';
import ComputerAdd from '../components/ComputerAdd';

import DarkModeButton from '../components/DarkModeButton';

import PropTypes from 'prop-types';
import { HelpCenter, Home } from '@mui/icons-material';

const Headers = ({ securityKey, colorMode, url }) => {
  let [tabIndex, setTabIndex] = useState(
    JSON.parse(
      localStorage.getItem('set-tab-index') === null
        ? 0
        : localStorage.getItem('set-tab-index')
    )
  );
  const navigate = useNavigate();
  const location = useLocation();
  const curFilia = location.pathname.split('/')[2];
  const smallScreen = useMediaQuery('(max-width: 850px)');

  const navLinks = [
    {
      to: `/${securityKey}/${curFilia}/`,
      icon: <Home />,
      label: 'Home',
    },
    {
      to: `/${securityKey}/${curFilia}/informacje`,
      icon: <InfoIcon />,
      label: 'Informacje',
    },
    {
      to: `/${securityKey}/${curFilia}/kafejka`,
      icon: <ComputerIcon />,
      label: 'Kafejka',
    },
    {
      to: `/${securityKey}/${curFilia}/wifi`,
      icon: <WifiIcon />,
      label: 'WiFi',
    },
    {
      to: `/${securityKey}/${curFilia}/ebooki`,
      icon: <Feather />,
      label: 'Ebooki',
    },
    {
      to: `/${securityKey}/${curFilia}/ustawienia`,
      icon: <SettingIcon />,
      label: 'Ustawienia',
    },
    {
      to: `/${securityKey}/${curFilia}/zgloszenia`,
      icon: <HelpCenter />,
      label: 'Zgłoszenia',
    },
  ];

  const handleClick = value => {
    localStorage.setItem('set-tab-index', JSON.stringify(value));
    setTabIndex(value);
  };

  return (
    <>
      <div className="navigation">
        <input
          type="checkbox"
          id="navi-toggle"
          className="navigation__checkbox"
          onClick={() => {
            document
              .querySelector('.kafejka__header')
              .classList.toggle('kafejka__header--active');
          }}
        />
        <label htmlFor="navi-toggle" className="navigation__button">
          <span className="navigation__icon">&nbsp;</span>
        </label>
      </div>

      <Box className="kafejka__header">
        <Tabs
          orientation={smallScreen && 'vertical'}
          className="option__tabs"
          value={tabIndex}
          onChange={(_, index) => {
            handleClick(index);
          }}
          selectionFollowsFocus
        >
          {navLinks.map((link, index) => (
            <Tab
              key={index}
              icon={link.icon}
              label={link.label}
              onClick={() => navigate(link.to)}
            />
          ))}
        </Tabs>
        <Box sx={{ p: 2, display: 'grid' }}>
          <DarkModeButton colorMode={colorMode} />
        </Box>
      </Box>
      {/*
      {TABS.map((tab, index) => {
        if (index === tabIndex) {
          return <React.Fragment key={index}>{tab.component}</React.Fragment>;
        } else {
          return null;
        }
      })} */}
    </>
  );
};

Headers.propTypes = {
  securityKey: PropTypes.string,
  colorMode: PropTypes.object,
};

export default Headers;
