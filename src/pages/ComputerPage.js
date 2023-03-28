import React from 'react';
import { Box, CircularProgress, CardContent } from '@mui/material';
import ComputerIndex from '../components/ComputerIndex';
import ComputerOnlineStatus from '../components/ComputerOnlineStatus';
import ComputerShutdownTimeoutPanel from '../components/ComputerShutdownTimeoutPanel';
import ErrorCallback from '../components/Errors/ErrorCallback';
import { useComputerData } from '../helper/useComputerData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ComputerPage = ({ filia, showComps, url }) => {
  const computerQuery = useComputerData(filia, url);

  if (computerQuery.isLoading)
    return (
      <div className="codes__loading">
        <h2 className="codes__header--2">Nawiązywanie połączenia...</h2>
        <CircularProgress className="loading-status" disableShrink />
      </div>
    );

  if (computerQuery.error) return <ErrorCallback />;

  const computers = computerQuery.data
    ?.filter(
      computer => filia === undefined || computer.fields.filia === +filia
    )
    .map((computer, index) => {
      return (
        <CardContent className="kafeika__background" key={index}>
          <ComputerIndex
            computer={computer}
            index={index}
            url={url}
            showComps={showComps}
            computerQuery={computerQuery}
          />
          <Box className="kafeika__wrap" sx={{ margin: 1 }}>
            {showComps ? (
              <ComputerOnlineStatus
                computer={computer}
                url={url}
                showComps={showComps}
                computerQuery={computerQuery}
              />
            ) : null}
            {showComps ? (
              <ComputerShutdownTimeoutPanel
                computer={computer}
                index={index}
                url={url}
                computerQuery={computerQuery}
              />
            ) : null}
          </Box>

          <Box
            className={`${
              computerQuery.isLoading
                ? 'la-ball-clip-rotate la-dark la-sm'
                : null
            }`}
            sx={{
              textAlign: 'end',
              color: '#444',
              p: 0,
              marginRight: 1,
              marginLeft: 'auto',
            }}
          >
            {computerQuery.isFetching ? <div></div> : 'ID:' + computer.pk}
          </Box>
          <ToastContainer limit={1} />
        </CardContent>
      );
    });

  return (
    <Box>
      {computerQuery.isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress className="loading-status" disableShrink />
        </div>
      ) : (
        <Box className={`${showComps ? 'layout-grid' : 'layout-flex'}`}>
          {computers}
        </Box>
      )}
    </Box>
  );
};

export default ComputerPage;
