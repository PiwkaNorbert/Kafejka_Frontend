import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const ComputerDelete = ({ index, computer, url, showComps, getDataSlow }) => {
  const compDel = useState('');

  // Set status Shutdown
  const compDelete = async e => {
    const urlDelete = `${url}delete-pc/${e}/`;
    try {
      await axios.get(urlDelete, {
        compDel,
        title: 'Delete',
        completed: false,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button
      variant="contained"
      color="error"
      size="small"
      type="submit"
      className={'btn btn-block btn-delete'}
      fullWidth={true}
      sx={{
        boxShadow: '2px 3px 2px 1px rgb(0 0 0 / 40%)',
        fontWeight: '900',
      }}
      onClick={e => {
        e.preventDefault();
        compDelete(computer.pk);
      }}
    >
      Usuń
    </Button>
  );
};

export default ComputerDelete;
