import React, { useState } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

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
    <ButtonTemplate
      color={'error'}
      disabled={false}
      className={'btn-block'}
      callback={compShutdownAll}
      icon={<PowerSettingsNewIcon />}
      text={'Wyłącz Wszystkie'}
    />
  );
};

export default ComputerShutdownAll;
