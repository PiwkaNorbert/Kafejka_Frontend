import React from 'react';
import { Button } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AddIcon from '@mui/icons-material/Add';

const ButtonAddShutdown = ({ compShutdownAll, compAdd, curShutDown }) => {
  return (
    <Button
      color={curShutDown ? 'error' : 'success'}
      size="small"
      type="submit"
      className={`btn ${curShutDown ? 'btn-block' : 'btn-add'}`}
      sx={{
        padding: '12px 16px',
        fontSize: ' 0.875rem',
        lineHeight: '1.25',
      }}
      onClick={curShutDown ? compShutdownAll : compAdd}
    >
      {curShutDown ? <PowerSettingsNewIcon /> : <AddIcon />}
      {curShutDown ? 'Zamknij Wszystkie' : 'Dodaj Komputer'}
    </Button>
  );
};

export default ButtonAddShutdown;
