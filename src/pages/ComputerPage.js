import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, CircularProgress, CardContent } from '@mui/material';
import ComputerIndex from '../components/ComputerIndex';
import ComputerOnlineStatus from '../components/ComputerOnlineStatus';
import ComputerShutdownTimeoutPanel from '../components/ComputerShutdownTimeoutPanel';

import Computer from '../components/Computer';

const ComputerPage = ({ filia, showComps, url }) => {
  const [computers, setComputers] = useState([]);
  let { curFilia } = useParams();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getData = async e => {
    await axios(`${url}${e === true ? 'fast-komps/' : 'komps/'}`)
      .then(response => {
        setComputers(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(`Unable to fetch Data`);
        setIsLoading(true);
      });
  };

  // Called after an interaction is made, to poll updated computer status after a short time
  const getDataImmediately = () => {
    getData(true);
  };

  const getDataSlowCached = () => {
    getData(false);
  };
  let didInit = false;
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // Repeatedly poll all data every 3 seconds
      setIsLoading(true);

      getData(true);
      setInterval(getDataSlowCached, 6000);
    }
  }, []);
  const computerArrayValues2 = computers
    .filter(computer => filia === undefined || computer.fields.filia === +filia)
    .map((computer, index) => {
      return (
        <CardContent
          sx={{
            boxShadow: 2,
            borderRadius: 3,
            padding: 1,
            margin: 1,
          }}
          className="kafeika__background"
          disabled={
            isLoading ? null : (
              <div style={{ zIndex: 1, backgroundColor: 'red' }}>
                <CircularProgress className="loading-status" disableShrink />
              </div>
            )
          }
          key={index}
        >
          <Box className="kafeika__wrap">
            <ComputerIndex
              computer={computer}
              index={index}
              url={url}
              callback={getDataImmediately}
              showComps={showComps}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            {showComps ? (
              <ComputerOnlineStatus
                computer={computer}
                index={index}
                url={url}
                callback={getDataImmediately}
                showComps={showComps}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            ) : null}
            {showComps ? (
              <ComputerShutdownTimeoutPanel
                computer={computer}
                index={index}
                url={url}
                callback={getDataImmediately}
                showComps={showComps}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            ) : null}
          </Box>

          <Box sx={{ textAlign: 'end', color: 'grey', p: 0, m: 0 }}>
            ID: {computer.pk}
          </Box>
        </CardContent>
      );
    });
  return (
    <Box>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress className="loading-status" disableShrink />
        </div>
      ) : (
        <Box className={`${showComps ? 'layout-grid' : 'layout-flex'}`}>
          {computerArrayValues2}
        </Box>
      )}
    </Box>
  );
};

export default ComputerPage;
