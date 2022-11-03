import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ComputerPage from "../pages/ComputerPage";
import WifiPerms from "./WifiPerms";
import ComputerShutdownAll from "./ComputerShutdownAll";

const Headers = () => {
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
          <Tab label="Settigns" />
          <ComputerShutdownAll />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
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
