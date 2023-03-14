import React from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const ComputerShutdownAll = ({ filia, url }) => {
  // Send a get to shutdown all computers
  const compShutdownAll = async () => {
    const urlSDAll = `${url}shutdown-all/${filia}/`;
    try {
      await axios(urlSDAll);
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
