import React, { useState } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';

const ComputerShutdown = ({ computer, url }) => {
  // Set status Shutdown
  const compShutdown = async () => {
    const urlShutdown = `${url}shutdown-pc/${computer.pk}/`;
    try {
      await axios(urlShutdown);
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
      className={'btn-shutdown'}
      callback={compShutdown}
      text={'Wyłacz'}
    />
  );
};
export default ComputerShutdown;
