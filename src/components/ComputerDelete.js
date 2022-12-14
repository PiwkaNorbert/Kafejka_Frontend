import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import { CircularProgress, Button } from '@mui/material';

const ComputerDelete = ({ computer, url }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  // Set status Shutdown
  const compDelete = async () => {
    const urlDelete = `${url}delete-pc/${computer.pk}/`;
    try {
      await axios(urlDelete).then(setIsDisabled(false));
    } catch (err) {
      console.log(`error brah ${err}`);
      setIsDisabled(true);
    }
  };
  return (
    <ButtonTemplate
      variant={'contained'}
      color={'error'}
      fullWidth={true}
      callback={e => {
        e.preventDefault();
        compDelete();
        setIsDisabled(true);
      }}
      disabled={isDisabled && computer.pk ? true : false}
      className={'btn-delete'}
      text={
        isDisabled && computer.pk ? (
          <CircularProgress className="loading-status-btn" disableShrink />
        ) : (
          'Usuń'
        )
      }
    />
  );
};

export default ComputerDelete;
