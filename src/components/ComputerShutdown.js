import React, { useState, Suspense } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Tooltip from '@mui/material/Tooltip';

export default function ComputerShutdown({ computer, url }) {
  // Set status Shutdown
  const compShutdown = () => {
    const urlShutdown = `${url}shutdown-pc/${computer.pk}/`;
    try {
      axios(urlShutdown);
    } catch (err) {
      throw new Error('Unable to delete computer');
    }
  };

  return (
    <ButtonTemplate
      color={computer.fields.online >= 60 ? 'error' : 'error'}
      className={'btn-shutdown'}
      icon={
        <PowerSettingsNewIcon sx={{ fontSize: '2.0rem', margin: '0 4px' }} />
      }
      callback={compShutdown}
      text={'Wyłącz'}
    />
  );
}
