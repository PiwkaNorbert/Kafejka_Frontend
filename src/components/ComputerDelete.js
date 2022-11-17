import React, { useState } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import { CircularProgress } from '@mui/material';
import { findAllByLabelText } from '@testing-library/react';

const ComputerDelete = ({ computer, url }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Set status Shutdown
  const compDelete = async () => {
    const urlDelete = `${url}delete-pc/${computer.pk}/`;
    try {
      await axios(urlDelete).then(setIsLoading(false));
    } catch (err) {
      console.log(err);
      setIsLoading(true);
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
        setIsLoading(true);
      }}
      disabled={isLoading || !computer.pk ? true : false}
      className={'btn-delete'}
      text={
        isLoading ? (
          <CircularProgress className="loading-status-btn" disableShrink />
        ) : (
          'Usuń'
        )
      }
    />
  );
};

export default ComputerDelete;
