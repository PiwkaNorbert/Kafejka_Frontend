import React, { useState } from 'react';
import { Button, CardActions } from '@mui/material';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';

const ComputerState = ({ computer, url }) => {
  const status = useState('');

  // Set status Blocked or Unblocked
  const compStatus = async () => {
    const urlBlock = `${url}block-pc/${computer.pk}/`;
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
    <ButtonTemplate
      variant={'contained'}
      fullWidth={true}
      color={
        computer.fields.f === 0
          ? 'success'
          : computer.fields.f === 1
          ? 'error'
          : 'primary'
      }
      disabled={computer.fields.f === 5}
      className={'btn-state'}
      callback={compStatus}
      text={
        computer.fields.f === 0
          ? 'Odblokuj'
          : computer.fields.f === 1
          ? 'Zablokuj'
          : 'Zamykanie'
      }
    />
  );
};

export default ComputerState;
