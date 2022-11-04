import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ComputerPage from "../pages/ComputerPage";
import WifiPerms from "../components/WifiPerms";
import ComputerShutdownAll from "../components/ComputerShutdownAll";
import ComputerAdd from "../components/ComputerAdd";

const Headers = ({ computer, url }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  return (
    <Box>
      <Box>
        <Tabs
          className="option__tabs"
          value={tabIndex}
          onChange={handleTabChange}
        >
          <Tab label="Komputery" />
          <Tab label="WiFi" />
          <Tab label="Ustawienia" />
          <ComputerShutdownAll />
          <ComputerAdd computer={computer} url={url} />
        </Tabs>
      </Box>
      <Box sx={{ paddingBlock: 1 }}>
        {tabIndex === 0 && (
          <Box>
            <ComputerPage showComps={true} />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <WifiPerms />
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <ComputerPage showComps={false} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Headers;
