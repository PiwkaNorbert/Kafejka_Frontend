import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const ComputerShutdown = ({ computer, url, callback }) => {
  const shutdown = useState('');

  // Set status Shutdown
  const compShutdown = async e => {
    const urlShutdown = `${url}shutdown-pc/${e}/`;
    try {
      await axios.get(urlShutdown, {
        shutdown,
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
      color="error"
      size="small"
      type="submit"
      disabled={computer.fields.f === 5 && computer.fields.t === 0}
      className="btn "
      fullWidth={true}
      sx={{
        minWidth: 'fit-content',
        boxShadow: '2px 3px 2px 1px rgb(0 0 0 / 40%)',
        fontWeight: '900',
      }}
      onClick={e => {
        e.preventDefault();
        compShutdown(computer.pk);
      }}
    >
      Wylacz
    </Button>
  );
};

export default ComputerShutdown;
