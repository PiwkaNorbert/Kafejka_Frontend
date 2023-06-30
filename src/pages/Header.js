import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import ComputerIcon from '@mui/icons-material/Computer';
import SettingIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

import ComputerPage from '../pages/ComputerPage';
import WifiPerms from '../pages/WifiPerms';
import ComputerShutdownAll from '../components/ComputerShutdownAll';
import ComputerAdd from '../components/ComputerAdd';
import Feather from '../components/Feather';
import LegimiAdmin from './LegimiCodes';
import { Information } from './Information';
import DarkModeButton from '../components/DarkModeButton';

const Headers = ({ securityKey, colorMode }) => {
  let [tabIndex, setTabIndex] = useState(
    JSON.parse(
      localStorage.getItem('set-tab-index') === null
        ? 0
        : localStorage.getItem('set-tab-index')
    )
  );
  const handleClick = () => {
    localStorage.setItem('set-tab-index', JSON.stringify(tabIndex));
  };

  const urlStalowy = window.location.href.includes('192.168.200.');
  const urlFortiClient = window.location.href.includes('192.168.3.');
  const url = `http://192.168.200.37:8005/${securityKey}/`;
  const TABS = [
    {
      index: 0,
      component: <Information />,
    },
    {
      index: 1,
      component: <ComputerPage showComps={true} url={url} />,
    },
    {
      index: 2,
      component: <WifiPerms url={url} />,
    },
    {
      index: 3,
      component: <LegimiAdmin />,
    },
    {
      index: 4,
      component: <ComputerPage showComps={false} url={url} />,
    },
  ];

  let { curFilia } = useParams();
  let smallScreen = useMediaQuery('(max-width: 850px)');

  return (
    <>
      <Box className="kafejka__header">
        <Tabs
          orientation={`${smallScreen ? 'vertical' : 'horizonal'}`}
          className="option__tabs"
          value={tabIndex}
          onChange={(e, index) => setTabIndex(index)}
          selectionFollowsFocus
        >
          <Tab icon={<InfoIcon />} label="Informacje" onClick={handleClick} />
          <Tab
            icon={<ComputerIcon />}
            label="Kafejka"
            onClick={handleClick}
            disabled={urlFortiClient ? true : false}
          />
          {curFilia !== undefined && (
            <Tab
              icon={<WifiIcon />}
              label="WiFi"
              onClick={handleClick}
              disabled={urlFortiClient ? true : false}
            />
          )}
          <Tab
            icon={<Feather />}
            label="Ebooki"
            filia={curFilia}
            onClick={handleClick}
          />
          <Tab
            icon={<SettingIcon />}
            label="Ustawienia"
            disabled={urlStalowy ? true : false}
            onClick={handleClick}
          />
        </Tabs>
        <Box sx={{ p: 2, display: 'grid' }}>
          <DarkModeButton colorMode={colorMode} />
        </Box>
        {tabIndex === 1 && curFilia !== undefined && (
          <ComputerShutdownAll filia={curFilia} url={url} />
        )}
        {tabIndex === 4 && curFilia !== undefined && (
          <ComputerAdd filia={curFilia} url={url} />
        )}
      </Box>
      {TABS.map(tab => {
        if (tab.index === tabIndex) {
          return tab.component;
        } else {
          return null;
        }
      })}
    </>
  );
};

export default Headers;
