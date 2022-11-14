import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const ComputerAdd = ({ filia, url }) => {
  const add = useState('');

  // Set status Shutdown
  const compAdd = async () => {
    const urlAdd = `${url}add-pc/${filia}/`;
    try {
      await axios.get(urlAdd, {
        add,
        title: 'Add',
        completed: false,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button
      color="success"
      size="small"
      type="submit"
      className={'btn btn-block btn-add'}
      sx={{
        padding: '12px 16px',
        fontSize: ' 0.875rem',
        lineHeight: '1.25',
      }}
      onClick={e => {
        e.preventDefault();
        compAdd();
      }}
    >
      Dodaj Komputer
    </Button>
  );
};

export default ComputerAdd;
