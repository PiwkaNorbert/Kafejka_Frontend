import React, { useState, Suspense } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';

export default function ComputerShutdown({
  computer,
  url,
  isLoading,
  setIsLoading,
}) {
  console.log(isLoading);
  // Set status Shutdown
  const compShutdown = () => {
    const urlShutdown = `${url}shutdown-pc/${computer.pk}/`;
    try {
      axios(urlShutdown);
      setIsLoading(false);
    } catch (err) {
      throw Error('Unable to fetch data');
      setIsLoading(true);
    }
  };

  return (
    <ButtonTemplate
      variant={'contained'}
      color={'error'}
      fullWidth={true}
      disabled={isLoading}
      className={'btn-shutdown'}
      callback={compShutdown}
      text={'Wyłacz'}
    />
  );
}
