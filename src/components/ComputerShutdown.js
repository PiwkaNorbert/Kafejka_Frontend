import React from 'react';
import ButtonTemplate from './ButtonTemplate';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import buttonCommand from '../helper/buttonCommand';
import { useParams } from 'react-router-dom';

export default function ComputerShutdown({ computer, url, computerQuery }) {
  // Set status Shutdown
  const handleShutdownButton = e => {
    const shutdownPCURL = `${url}shutdown-pc/${e.currentTarget.value}/`;
    buttonCommand(
      shutdownPCURL,
      'Błąd podczas wyłączania komputera',
      computerQuery
    );
  };

  return (
    <ButtonTemplate
      color={computer.fields.online >= 60 ? 'error' : 'error'}
      className={'btn-shutdown'}
      value={computer.pk}
      icon={
        <PowerSettingsNewIcon sx={{ fontSize: '2.0rem', margin: '0 4px' }} />
      }
      callback={handleShutdownButton}
      text={'Wyłącz'}
    />
  );
}
