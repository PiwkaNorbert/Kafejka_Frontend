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
import { useTheme } from '@mui/material/styles';
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
  const url = `http://192.168.200.30:8005/${securityKey}/`;
  let { curFilia } = useParams();
  let smallScreen = useMediaQuery('(max-width: 631px)');

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: smallScreen ? 'column' : null,
          position: smallScreen ? null : 'sticky',
          top: 0,
          zIndex: 20,
          backgroundColor: 'var(--white)',
          borderBottom: '1px solid var(--slider-bg)',
        }}
      >
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
      {tabIndex === 0 && <Information />}
      {tabIndex === 1 && (
        <ComputerPage filia={curFilia} showComps={true} url={url} />
      )}
      {tabIndex === 2 && (
        <>
          {curFilia !== undefined && <WifiPerms filia={curFilia} url={url} />}
        </>
      )}
      {tabIndex === 3 && <LegimiAdmin />}
      {tabIndex === 4 && (
        <ComputerPage filia={curFilia} showComps={false} url={url} />
      )}
    </Box>
  );
};

export default Headers;

///////////////////////////// buttons from legimi

{
  /* {tabIndex === 3 && curFilia !== undefined && (
          <div class="nav-position">
            <div
              class="toggle-position"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end !important',
              }}
            >
              <span>&nbsp;Kolory Dostepnosci </span>

              <div class="btn btn-cp">
                <div
                  id="palette-colors"
                  class="btn-indicator btn-cp__indicator"
                >
                  <div class="btn-icon-container btn-cp__icon-container">
                    <i
                      class="fa-solid fa-droplet btn-icon btn-cp__icon"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
              <span>&nbsp;Ukryj wyczerpane kody </span>
              <div class="btn btn-hc">
                <div id="hide" class="btn-indicator btn-hc__indicator">
                  <div class="btn-icon-container btn-hc__icon-container">
                    <i
                      class="fa-solid fa-eye btn-icon btn-hc__icon"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
              <span>&nbsp;Tryb Nocny </span>

              <div class="btn btn-dm">
                <div id="darkmode" class="btn-indicator btn-dm-indicator">
                  <div class="btn-icon-container btn-dm__icon-container">
                    <i
                      class="fa-solid fa-sun btn-icon btn-dm__icon"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */
}
