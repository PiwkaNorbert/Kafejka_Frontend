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

const Headers = ({ verificationCode }) => {
  let { curFilia } = useParams();

  //34004b40a0ce84853b64700605d9694fb11e898c10d48878cc8773f21e0edb97
  const url = `http://192.168.15.115:8000/${verificationCode}/`;

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const smallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs
          orientation={smallScreen ? 'vertical' : 'horizonal'}
          className="option__tabs"
          value={tabIndex}
          onChange={handleTabChange}
          selectionFollowsFocus
        >
          <Tab icon={<ComputerIcon />} label="Komputery" />
          <Tab icon={<WifiIcon />} label="WiFi" />
          <Tab icon={<SettingIcon />} label="Ustawienia" />
          {tabIndex === 0 && curFilia !== undefined && (
            <ComputerShutdownAll filia={curFilia} url={url} />
          )}
          {tabIndex === 2 && curFilia !== undefined && (
            <ComputerAdd filia={curFilia} url={url} />
          )}
        </Tabs>
      </Box>
      <Box sx={{ paddingBlock: 1 }}>
        {tabIndex === 0 && (
          <Box>
            <ComputerPage showComps={true} url={url} />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            {curFilia !== undefined && <WifiPerms filia={curFilia} url={url} />}
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <ComputerPage showComps={false} url={url} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Headers;
