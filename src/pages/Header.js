import React from 'react';
import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ComputerPage from '../pages/ComputerPage';
import WifiPerms from '../pages/WifiPerms';
import ComputerShutdownAll from '../components/ComputerShutdownAll';
import ComputerAdd from '../components/ComputerAdd';
import WifiIcon from '@mui/icons-material/Wifi';
import ComputerIcon from '@mui/icons-material/Computer';
import SettingIcon from '@mui/icons-material/Settings';
import Feather from '../components/Feather';

import LegimiAdmin from './LegimiCodes';

const Headers = ({ securityKey }) => {
  let [tabIndex, setTabIndex] = useState(
    JSON.parse(localStorage.getItem('set-tab-index'))
  );

  const handleClick = () => {
    localStorage.setItem('set-tab-index', JSON.stringify(tabIndex));
  };

  const urlStalowy = window.location.href.includes('192.168.200.');
  const urlFortiClient = window.location.href.includes('192.168.3.');
  const url = `http://192.168.200.30:8005/${securityKey}/`;
  let smallScreen = useMediaQuery('(max-width: 500px)');
  let { curFilia } = useParams();

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
          orientation={smallScreen ? 'vertical' : 'horizonal'}
          className="option__tabs"
          value={tabIndex}
          onChange={(e, index) => setTabIndex(index)}
          selectionFollowsFocus
        >
          <Tab
            icon={<ComputerIcon />}
            label="Komputery"
            disabled={urlFortiClient}
          />
          {!curFilia == '' && (
            <Tab
              icon={<WifiIcon />}
              label="WiFi"
              onClick={handleClick}
              disabled={urlFortiClient}
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
            disabled={urlStalowy || handleClick}
            onClick={handleClick}
          />
        </Tabs>
        {tabIndex === 0 && curFilia !== undefined && (
          <ComputerShutdownAll filia={curFilia} url={url} />
        )}
        {tabIndex === 3 && curFilia !== undefined && (
          <ComputerAdd filia={curFilia} url={url} />
        )}
      </Box>
      <Box>
        {tabIndex === 0 && (
          <Box>
            <ComputerPage filia={curFilia} showComps={true} url={url} />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            {curFilia !== undefined && <WifiPerms filia={curFilia} url={url} />}
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <LegimiAdmin />
          </Box>
        )}
        {tabIndex === 3 && (
          <Box>
            <ComputerPage filia={curFilia} showComps={false} url={url} />
          </Box>
        )}
      </Box>
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
