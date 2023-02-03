import React, { useState, useEffect } from 'react';
import { CardContent, Box, CircularProgress } from '@mui/material';
import ComputerIndex from '../components/ComputerIndex';
import ComputerOnlineStatus from '../components/ComputerOnlineStatus';
import ComputerShutdownTimeoutPanel from '../components/ComputerShutdownTimeoutPanel';
import axios from 'axios';
const Computer = ({ _data, index, url, showComps, getDataImmediately }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(_data);
  const [updateComputerData, setUpdateComputerData] = useState('');

  const updateData = () => {
    try {
      axios(`${url}komps/${_data.fields.filia}/${_data.pk}`);
      setIsLoading(false).then(res => setUpdateComputerData(res));
    } catch (err) {
      throw Error('Unable to update data');
    }
  };
  //write a method to update `data` based on an API response (from axios)
  //  you can then pass this method into the props of any button,
  //   and the button can use it after performing an API call
  //      example usage (this code would go inside a button, not here):
  //            ...
  //            async def deleteComputer = (...) => {
  //                await const response = axios('eat my ass/komps/id');
  //                updateComputerData(response);
  //            }
  //            ...
  //   (the state of the computer will get updated)
  console.log(...updateComputerData);
  console.log(`udpate:${updateComputerData}`);
  useEffect(() => {
    // Repeatedly poll all data every 3 seconds
    setIsLoading(true);
    // console.log(data);
    // console.log(...updateComputerData);
  }, [updateComputerData]);

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
          computer={data}
          index={index}
          url={url}
          callback={getDataImmediately}
          showComps={showComps}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        {showComps ? (
          <ComputerOnlineStatus
            computer={data}
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
            computer={data}
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
        ID: {data.pk}
      </Box>
    </CardContent>
  );
};

export default Computer;
