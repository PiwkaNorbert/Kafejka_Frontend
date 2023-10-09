import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import ComputerIcon from '@mui/icons-material/Computer';
import SettingIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

import ComputerPage from './ComputerPage';
import WifiPerms from './WifiPerms';
import ComputerShutdownAll from '../components/ComputerShutdownAll';
import ComputerAdd from '../components/ComputerAdd';
import Feather from '../components/Feather';
import LegimiAdmin from './LegimiCodes';
import { Information } from './Information';
import DarkModeButton from '../components/DarkModeButton';

import PropTypes from 'prop-types';

const Headers = ({ securityKey, colorMode }) => {
  let [tabIndex, setTabIndex] = useState(
    JSON.parse(
      localStorage.getItem('set-tab-index') === null
        ? 0
        : localStorage.getItem('set-tab-index')
    )
  );
  const handleClick = value => {
    localStorage.setItem('set-tab-index', JSON.stringify(value));
    setTabIndex(value);
  };

  const urlStalowy = window.location.href.includes('192.168.200.');
  const urlFortiClient = window.location.href.includes('192.168.3.');
  const url = `http://192.168.200.37:8005/${securityKey}/`;

  let { curFilia } = useParams();
  let smallScreen = useMediaQuery('(max-width: 850px)');

  const TABS = [
    {
      component: <Information />,
    },
    {
      component: <ComputerPage showComps={true} url={url} />,
    },
    {
      component: <WifiPerms url={url} />,
    },
    {
      component: <LegimiAdmin />,
    },
    {
      component: <ComputerPage showComps={false} url={url} />,
    },
  ];

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
          <Tab icon={<InfoIcon />} label="Informacje" />
          <Tab
            icon={<ComputerIcon />}
            label="Kafejka"
            disabled={urlFortiClient ? true : false}
          />
          {curFilia !== undefined && (
            <Tab
              icon={<WifiIcon />}
              label="WiFi"
              disabled={urlFortiClient ? true : false}
            />
          )}
          <Tab icon={<Feather />} label="Ebooki" filia={curFilia} />
          <Tab
            icon={<SettingIcon />}
            label="Ustawienia"
            disabled={urlStalowy ? true : false}
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
      {TABS.map((tab, index) => {
        if (index === tabIndex) {
          return <React.Fragment key={index}>{tab.component}</React.Fragment>;
        } else {
          return null;
        }
      })}
    </>
  );
};

Headers.propTypes = {
  securityKey: PropTypes.string.isRequired,
  colorMode: PropTypes.object,
};

export default Headers;
