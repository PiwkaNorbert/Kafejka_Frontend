import React from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function ComputerShutdown({ computer, url, computerQuery }) {
  // Set status Shutdown
  const compShutdown = async () => {
    const urlShutdown = `${url}shutdown-pc/${computer.pk}/`;
    try {
      await axios(urlShutdown).then(() => computerQuery.refetch());
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
      disabled={computerQuery.isFetching ? true : false}
      callback={compShutdown}
      text={'Wyłącz'}
    />
  );
}
