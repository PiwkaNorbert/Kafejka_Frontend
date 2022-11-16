import React, { useState } from 'react';
import { Button, CardActions } from '@mui/material';
import axios from 'axios';
import ButtonDelStaShut from './ButtonDelStaShut';

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
    <ButtonDelStaShut
      compStatus={compStatus}
      computer={computer}
      buttonIndex={0}
    />
  );
};

export default ComputerState;
