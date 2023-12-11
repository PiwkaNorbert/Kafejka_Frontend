import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import ComputerIcon from '@mui/icons-material/Computer';
import SettingIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import Feather from '../components/Feather';

import DarkModeButton from '../components/DarkModeButton';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Headers = ({ securityKey, colorMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const curFilia = location.pathname.split('/')[2];
  const smallScreen = useMediaQuery('(max-width: 850px)');

  const navLinks = [
    // {
    //   to: `/${securityKey}/${curFilia}/`,
    //   icon: <Home />,
    //   label: 'Home',
    // },
    {
      id: 0,
      to: `/${securityKey}/${curFilia}/informacje`,
      icon: <InfoIcon />,
      label: 'Informacje',
    },
    {
      id: 1,
      to: `/${securityKey}/${curFilia}/kafejka`,
      icon: <ComputerIcon />,
      label: 'Kafejka',
    },
    {
      id: 2,
      to: `/${securityKey}/${curFilia}/wifi`,
      icon: <WifiIcon />,
      label: 'WiFi',
    },
    {
      id: 3,
      to: `/${securityKey}/${curFilia}/ebooki`,
      icon: <Feather />,
      label: 'Ebooki',
    },
    {
      id: 4,
      to: `/${securityKey}/${curFilia}/ustawienia`,
      icon: <SettingIcon />,
      label: 'Ustawienia',
    },
    // {
    //   to: `/${securityKey}/${curFilia}/zgloszenia`,
    //   icon: <HelpCenter />,
    //   label: 'Zgłoszenia',
    // },
  ];

  useEffect(() => {
    const storedValue = localStorage.getItem('navTitle');
    if (storedValue) {
      const index = navLinks.findIndex(
        link => link.label.toLowerCase() === storedValue
      );
      if (index !== -1) {
        setTabIndex(index);
        navigate(navLinks[index].to);
      }
    }
  }, []);

  const tabIndices = {
    informacje: 0,
    kafejka: 1,
    wifi: 2,
    ebooki: 3,
    ustawienia: 4,
  };

  const tab = location.pathname.split('/')[3];

  const [tabIndex, setTabIndex] = useState(() => {
    return tabIndices[tab]?.id ?? 0;
  });

  const handleClick = value => {
    setTabIndex(value);
    localStorage.setItem('navTitle', navLinks[value].label.toLowerCase());
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
          onChange={(_, idx) => {
            handleClick(idx);
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
