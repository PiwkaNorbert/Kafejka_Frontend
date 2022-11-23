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

const Headers = ({ verificationCode }) => {
  let { curFilia } = useParams();

<<<<<<< HEAD
  const url = `http://192.168.15.160:8000/${verificationCode}/`;
=======
  const url = `http://192.168.15.115:8000/${verificationCode}/`;
>>>>>>> 2a71e9debaa95ffc886aad93916184bb5856b7a6

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  let smallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: smallScreen ? 'column' : null,
        }}
      >
        <Tabs
          orientation={smallScreen ? 'vertical' : 'horizonal'}
          className="option__tabs"
          value={tabIndex}
          onChange={handleTabChange}
          selectionFollowsFocus
        >
          <Tab icon={<ComputerIcon />} value={0} label="Komputery" />
          {!curFilia == '' && (
            <Tab value={1} icon={<WifiIcon />} label="WiFi" />
          )}
          <Tab icon={<SettingIcon />} value={2} label="Ustawienia" />
          <Tab
            sx={{ justifyContent: 'space-around' }}
            value={3}
            icon={<Feather />}
            label="Legimi"
            filia={curFilia}
          />
        </Tabs>
        {tabIndex === 0 && curFilia !== undefined && (
          <ComputerShutdownAll filia={curFilia} url={url} />
        )}
        {tabIndex === 2 && curFilia !== undefined && (
          <ComputerAdd filia={curFilia} url={url} />
        )}
        {/* {tabIndex === 3 && curFilia !== undefined && (
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
        )} */}
      </Box>
      <Box sx={{ paddingBlock: 1 }}>
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
            <ComputerPage filia={curFilia} showComps={false} url={url} />
          </Box>
        )}
        {tabIndex === 3 && (
          <Box>
            <LegimiAdmin />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Headers;
