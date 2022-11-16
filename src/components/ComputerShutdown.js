import React, { useState } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';

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
    <ButtonTemplate
      variant={'contained'}
      color={'error'}
      fullWidth={true}
      disabled={computer.fields.f === 5 && computer.fields.t === 0}
      className={'btn btn-shutdown'}
      callback={compShutdown}
      text={'Wyłacz'}
    />
  );
};
export default ComputerShutdown;
