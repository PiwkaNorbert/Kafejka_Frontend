import React from 'react';
import ButtonTemplate from './ButtonTemplate';
import { CircularProgress } from '@mui/material';
import buttonCommand from '../helper/buttonCommand';

const ComputerDelete = ({ computer, url, computerQuery }) => {
  // Delete pc
  const handleDeletedButton = e => {
    const deletePCURL = `${url}delete-pc/${e.currentTarget.value}/`;
    buttonCommand(
      deletePCURL,
      'Błąd podczas usuwania komputera',
      computerQuery
    );
  };
  return (
    <ButtonTemplate
      variant={'contained'}
      color={'error'}
      fullWidth={true}
      callback={handleDeletedButton}
      value={computer.pk}
      disabled={computerQuery.isLoading && computer.pk ? true : false}
      className={'btn-delete'}
      text={
        computerQuery.isLoading ? (
          <CircularProgress className="loading-status-btn" disableShrink />
        ) : (
          'Usuń'
        )
      }
    />
  );
};

export default ComputerDelete;
