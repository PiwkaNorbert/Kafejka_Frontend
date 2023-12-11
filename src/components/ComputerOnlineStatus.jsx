import { Box } from '@mui/material';
import ComputerState from './ComputerState';
import PropTypes from 'prop-types';

const ComputerOnlineStatus = ({ computer, url, isLoading }) => {
  return (
    <Box
      className={`kafeika-komputer__status`}
      sx={{ display: 'flex', maxHeight: 'min-content !important' }}
    >
      <Box
        className={`kafeika-komputer__status-computer`}
        sx={{
          textAlign: 'end',
          flex: '1 1 0',
          fontWeight: 700,
        }}
      >
        {isLoading ? (
          <div className="la-ball-clip-rotate la-dark la-sm">
            <div></div>
          </div>
        ) : (
          <ComputerState computer={computer} url={url} />
        )}
      </Box>
    </Box>
  );
};
ComputerOnlineStatus.propTypes = {
  computer: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ComputerOnlineStatus;
