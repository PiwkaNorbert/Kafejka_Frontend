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
          ? 'error'
          : computer.fields.f === 1
          ? 'success'
          : 'primary'
      }
      disabled={computer.fields.f === 5}
      className={'btn-state'}
      callback={compStatus}
      text={
        computer.fields.f === 0
          ? 'Zablokowany'
          : computer.fields.f === 1
          ? 'Odblokowany'
          : 'Zamykanie'
      }
    />
  );
};

export default ComputerState;
