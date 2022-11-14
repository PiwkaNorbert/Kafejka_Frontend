import React, { useState } from 'react';
import { Box, Tab, Tabs, Button } from '@mui/material';
import axios from 'axios';

const ComputerShutdownAll = ({ filia, url }) => {
  const ShutdownAll = useState('');

  const compShutdownAll = async () => {
    const urlSDAll = `${url}shutdown-all/${filia}/`;
    try {
      await axios.get(urlSDAll, {
        ShutdownAll,
        title: 'Shutdown-All',
        completed: false,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button
      color="error"
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
        compShutdownAll();
      }}
    >
      Zamknij Wszystkie
    </Button>
  );
};

export default ComputerShutdownAll;
