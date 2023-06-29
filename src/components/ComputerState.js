import React from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import { toast } from 'react-toastify';

import buttonCommand from '../helper/buttonCommand';

const ComputerState = ({ computer, url, computerQuery }) => {
  // Set status Blocked or Unblocked

  const handleStateOfButton = e => {
    const stateOfPCURL = `${url}block-pc/${e}/`;

    buttonCommand(
      stateOfPCURL,
      'Błąd podczas zmiany statusu komputera',
      computerQuery
    );
  };

  return (
    <>
      <ButtonTemplate
        variant={'contained'}
        fullWidth={true}
        value={computer.pk}
        color={
          computer.fields.f === 0
            ? 'error'
            : computer.fields.f === 1
            ? 'success'
            : 'primary'
        }
        disabled={computerQuery.isFetching}
        className={'btn-state'}
        callback={e => {
          handleStateOfButton(e.currentTarget.value);
          toast.success('Zmieniono status komputera' + e.currentTarget.value, {
            icon: '👍',
          });
        }}
        text={
          computer.fields.f === 0
            ? 'Zablokowany'
            : computer.fields.f === 1
            ? 'Odblokowany'
            : 'Zamykanie'
        }
      />
    </>
  );
};

export default ComputerState;
