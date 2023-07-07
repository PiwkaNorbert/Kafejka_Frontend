import { Box, CircularProgress, CardContent } from '@mui/material';
import ComputerIndex from '../components/ComputerIndex';
import ComputerOnlineStatus from '../components/ComputerOnlineStatus';
import ComputerShutdownTimeoutPanel from '../components/ComputerShutdownTimeoutPanel';
import ErrorCallback from '../components/Errors/ErrorCallback';
import { useComputerData } from '../helper/useComputerData';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

const ComputerPage = ({ showComps, url }) => {
  let { curFilia } = useParams();
  const { data, isError, isLoading, isFetching, fetchStatus, state } =
    useComputerData(curFilia, url);
  console.log(data);

  if (isLoading)
    return (
      <div className="codes__loading">
        <h2 className="codes__header--2">Nawiązywanie połączenia...</h2>
        <CircularProgress className="loading-status" disableShrink />
      </div>
    );

  if (isError) return <ErrorCallback />;
  if (fetchStatus === 'paused' && state === 'loading') {
    toast.error('Serwer nie odpowiada. Sprawdź połączenie z internetem.');
    return <div style={{ color: 'red' }}>paused</div>;
  }

  const computers = data.map((computer, index) => {
    return (
      <CardContent className="kafeika__background" key={index}>
        <ComputerIndex
          computer={computer}
          index={index}
          url={url}
          showComps={showComps}
        />
        <Box className="kafeika__wrap" sx={{ margin: 1 }}>
          {showComps && (
            <>
              <ComputerOnlineStatus
                computer={computer}
                url={url}
                showComps={showComps}
                isLoading={isLoading}
              />
              <ComputerShutdownTimeoutPanel
                computer={computer}
                index={index}
                url={url}
              />
            </>
          )}
        </Box>

        <Box
          className={`${
            isLoading ? 'la-ball-clip-rotate la-dark la-sm' : null
          }`}
          sx={{
            textAlign: 'end',
            color: '#444',
            p: 0,
            marginRight: 1,
            marginLeft: 'auto',
          }}
        >
          {isFetching ? <div></div> : 'ID:' + computer.pk}
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
          {computers}
        </Box>
      )}
    </Box>
  );
};
ComputerPage.propTypes = {
  showComps: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
};

export default ComputerPage;
