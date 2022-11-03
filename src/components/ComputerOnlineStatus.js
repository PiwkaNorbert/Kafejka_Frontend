import React from "react";
import { Box } from "@mui/material";
import ComputerState from "./ComputerState";

const ComputerOnlineStatus = ({ computer, url }) => {
  return (
    <Box className={`kafeika-komputer__status`}>
      <Box className={`kafeika-komputer__status-computer`}>
        <Box sx={{ padding: 1, textAlign: "center" }}>Stan</Box>
        <Box
          className={`kafeika-komputer__status-content ${
            computer.fields.f === 0
              ? "bg-red"
              : computer.fields.f === 1
              ? "bg-green"
              : "bg-blue"
          }`}
          sx={{ padding: 1, textAlign: "center" }}
        >
          {`${
            computer.fields.f === 0
              ? "Zablokowany"
              : computer.fields.f === 1
              ? "Odblokowany"
              : "Zamykanie"
          }`}
        </Box>
      </Box>
      <ComputerState computer={computer} url={url} />
    </Box>
  );
};

export default ComputerOnlineStatus;
