import React, { useState } from 'react';
import axios from 'axios';
import ButtonAddShutdown from './ButtonAddShutdown';

const ComputerShutdownAll = ({ filia, url }) => {
  const ShutdownAll = useState('');

  // Send a get to shutdown all computers

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
    <ButtonAddShutdown compShutdownAll={compShutdownAll} curShutDown={true} />
  );
};

export default ComputerShutdownAll;
