import React, { useState } from 'react';
import { Button, CardActions } from '@mui/material';
import axios from 'axios';

const ComputerState = ({ computer, url, callback }) => {
  const status = useState('');

  // Set status Blocked or Unblocked
  const compStatus = async e => {
    const urlBlock = `${url}block-pc/${e}/`;
    try {
      await axios.get(urlBlock, {
        status,
        title: 'Zablokuj Odblokuj',
        completed: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      variant="contained"
      color={
        computer.fields.f === 0
          ? 'success'
          : computer.fields.f === 1
          ? 'error'
          : 'primary'
      }
      size="small"
      type="submit"
      className={'btn btn-block btn-un-block'}
      disabled={computer.fields.f === 5}
      fullWidth={true}
      sx={{
        minWidth: 'fit-content',
        boxShadow: '2px 3px 2px 1px rgb(0 0 0 / 40%)',
        fontWeight: '900',
      }}
      onClick={e => {
        e.preventDefault();
        compStatus(computer.pk);
      }}
    >
      {computer.fields.f === 0
        ? 'Odblokuj'
        : computer.fields.f === 1
        ? 'Zablokuj'
        : 'Zamykanie'}
    </Button>
  );
};

export default ComputerState;
