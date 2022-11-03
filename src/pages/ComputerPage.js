import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardContent, Box, CircularProgress } from "@mui/material";
import ComputerOnlineStatus from "../components/ComputerOnlineStatus";
import ComputerIndex from "../components/ComputerIndex";
import ComputerShutdown from "../components/ComputerShutdown";
import ComputerState from "../components/ComputerState";
import ComputerShutdownTimeoutPanel from "../components/ComputerShutdownTimeoutPanel";
import ComputerDelete from "../components/ComputerDelete";

const ComputerPage = ({ showComps }) => {
  let { compId } = useParams();
  const [computers, setComputer] = useState([]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const verificationCode = "";
  const url = `http://192.168.15.115:8000/${verificationCode}/`;
  const getData = async (e) => {
    await axios(`${url}${e == true ? "fast-komps/" : "komps/"}`)
      .then((response) => {
        setComputer(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(`Unable to fetch Data`);
        setIsLoading(true);
      });
    // const response3 = await axios(
    //   `${url}${e == true ? "fast-komps/" : "komps/"}`
    // );
  };

  // Called after an interaction is made, to poll updated computer status after a short time
  const getDataSlow = async (e) => {
    getData(e);
    setInterval(getData, 4000);
  };

  useEffect(() => {
    // Repeatedly poll all data every 3 seconds
    setIsLoading(true);

    getData();
    setInterval(getData, 1000);
  }, []);

  const computerArrayValues2 = computers
    .filter((computer) =>
      compId === undefined ? true : computer.fields.filia == compId
    )
    .map((computer, index) => {
      return (
        <CardContent
          sx={{ boxShadow: 2, borderRadius: 3, padding: 2, margin: 1 }}
          className="kafeika__background"
          key={index}
        >
          <Box className="kafeika__wrap">
            <CardContent sx={{ boxShadow: 2 }}>
              <ComputerIndex
                computer={computer}
                index={index}
                url={url}
                callback={getDataSlow}
              />
            </CardContent>
            {showComps ? (
              <CardContent sx={{ boxShadow: 0 }}>
                <ComputerOnlineStatus computer={computer} />
              </CardContent>
            ) : null}
            <hr></hr>
            {showComps ? (
              <ComputerShutdownTimeoutPanel
                computer={computer}
                index={index}
                url={url}
                callback={getDataSlow}
              />
            ) : null}{" "}
            {showComps ? null : (
              <ComputerDelete
                computer={computer}
                index={index}
                url={url}
                callback={getDataSlow}
              />
            )}
          </Box>
        </CardContent>
      );
    });

  return (
    <Box sx={{ display: "flex" }}>
      {isLoading ? (
        <div style={{ display: "grid", justifyContent: "center" }}>
          <CircularProgress className="loading-status" disableShrink />
        </div>
      ) : (
        computerArrayValues2
      )}
    </Box>
  );
};

export default ComputerPage;
