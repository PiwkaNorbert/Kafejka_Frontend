import React from "react";
import { Box } from "@mui/material";

const HackStatus = (props) => {
  if (props.isHackedStatus) {
    return (
      <Box sx={{ width: 200, height: 200, backgroundColor: "#f00" }}></Box>
    );
  } else {
    return (
      <Box sx={{ width: 200, height: 200, backgroundColor: "#0F0" }}>
        asdasd
      </Box>
    );
  }
};

export default HackStatus;
