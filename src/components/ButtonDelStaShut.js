import React from 'react';
import { Button } from '@mui/material';

const ButtonDelStaShut = ({
  buttonIndex,
  computer,
  compDelete,
  compStatus,
  compShutdown,
}) => {
  /*
  Button Index 0 = State
  Button Index 1 = Shutdown
  Button Index 2 = Delete
  */
  return (
    <Button
      variant="contained"
      color={
        buttonIndex === 0 && computer.fields.f === 0
          ? 'success'
          : (buttonIndex === 0 && computer.fields.f === 1) || buttonIndex !== 0
          ? 'error'
          : 'primary'
      }
      size="small"
      type="submit"
      disabled={
        (buttonIndex === 1 &&
          computer.fields.f === 5 &&
          computer.fields.t === 0) ||
        (buttonIndex === 0 && computer.fields.f === 5)
      }
      className="btn btn-delete"
      fullWidth={true}
      sx={{
        minWidth: 'fit-content',
        boxShadow: '2px 3px 2px 1px rgb(0 0 0 / 40%)',
        fontWeight: '900',
      }}
      onClick={
        buttonIndex === 1
          ? compShutdown
          : buttonIndex === 2
          ? compDelete
          : compStatus
      }
    >
      {buttonIndex === 1
        ? 'Wyłacz'
        : buttonIndex === 2
        ? 'Usuń'
        : buttonIndex === 0 && computer.fields.f === 0
        ? 'Odblokuj'
        : buttonIndex === 0 && computer.fields.f === 1
        ? 'Zablokuj'
        : 'Zamykanie'}
    </Button>
  );
};

export default ButtonDelStaShut;
