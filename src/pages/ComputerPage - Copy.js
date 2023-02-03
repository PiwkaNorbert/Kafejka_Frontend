import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, CircularProgress } from '@mui/material';

import Computer from '../components/Computer';

const ComputerPage = ({ filia, showComps, url }) => {
  const [computers, setComputer] = useState([]);
  let { curFilia } = useParams();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getData = async e => {
    await axios(`${url}${e ? 'fast-komps/' : 'komps/'}`)
      .then(response => {
        setComputer(
          response.data.flatMap((data, index) => {
            return {
              filia: data.fields.filia,
              component: (
                <Computer
                  _data={data}
                  index={index}
                  url={url}
                  showComps={showComps}
                  getDataImmediately={getDataImmediately}
                  filia={filia}
                />
              ),
            };
          })
        );
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
      setInterval(getDataSlowCached, 10000);
    }
  }, []);

  const computerArrayValues2 = computers
    .filter(computer => filia === undefined || computer.filia === +filia)
    .map((computer, _) => computer.component);

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
