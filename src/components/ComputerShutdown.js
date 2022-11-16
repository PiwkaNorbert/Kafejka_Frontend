import React, { useState } from 'react';
import axios from 'axios';
import ButtonDelStaShut from './ButtonDelStaShut';

const ComputerShutdown = ({ computer, url }) => {
  const shutdown = useState('');

  // Set status Shutdown
  const compShutdown = async () => {
    const urlShutdown = `${url}shutdown-pc/${computer.pk}/`;
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
    <ButtonDelStaShut
      compShutdown={compShutdown}
      computer={computer}
      buttonIndex={1}
    />
  );
};
export default ComputerShutdown;
