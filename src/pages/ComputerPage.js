import React from 'react';
import { Box, CircularProgress, CardContent } from '@mui/material';
import ComputerIndex from '../components/ComputerIndex';
import ComputerOnlineStatus from '../components/ComputerOnlineStatus';
import ComputerShutdownTimeoutPanel from '../components/ComputerShutdownTimeoutPanel';
import { useQuery } from '@tanstack/react-query';

const ComputerPage = ({ filia, showComps, url }) => {
  const computerQuery = useQuery(['komps'], () =>
    fetch(`${url}komps/${filia}/`).then(res => res.json())
  );

  if (computerQuery.isLoading)
    return (
      <div class="la-ball-clip-rotate la-md la-dark">
        <div></div>
      </div>
    );
  if (computerQuery.error)
    return (
      <h1>
        Nastąpił Error, Proszę skontatkuj sie z administratorem systemów 112
      </h1>
    );

  const computers = computerQuery.data
    ?.filter(
      computer => filia === undefined || computer.fields.filia === +filia
    )
    .map((computer, index) => {
      return (
        <CardContent
          sx={{
            boxShadow: 2,
            borderRadius: 3,
            margin: 1,
          }}
          className="kafeika__background"
          key={index}
        >
          <ComputerIndex
            computer={computer}
            index={index}
            url={url}
            // callback={getDataImmediately}
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
              computerQuery.isFetching
                ? 'la-ball-clip-rotate la-dark la-sm'
                : null
            }`}
            sx={{
              textAlign: 'end',
              color: 'grey',
              p: 0,
              m: 1,
              marginLeft: 'auto',
            }}
          >
            {computerQuery.isFetching ? <div></div> : 'ID:' + computer.pk}
          </Box>
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
