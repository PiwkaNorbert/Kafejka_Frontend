import React from "react";
import { Box } from "@mui/material";
import ComputerShutdown from "./ComputerShutdown";

const ComputerIndex = ({ computer, index, url }) => {
  const statusCheck = () => {
    if (computer.fields.online === 0) {
    }
  };
  return (
    <Box className={`kafeika-komputer__index`}>
      <Box className={`kafeika-komputer__index-computer`}>
        <Box sx={{ padding: 1, textAlign: "center" }}>Komputer {index + 1}</Box>
        <Box
          className={`kafeika-komputer__index-content ${
            computer.fields.online >= 120 ? "bg-red" : "bg-green"
          }`}
          sx={{ padding: 1, textAlign: "center" }}
        >
          {`${computer.fields.online >= 120 ? "Off-line" : "On-line"}`}
          {statusCheck()}
        </Box>
      </Box>
      <ComputerShutdown computer={computer} url={url} />
    </Box>
  );
};

export default ComputerIndex;
