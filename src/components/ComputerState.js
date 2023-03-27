import React from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComputerState = ({ computer, url, computerQuery }) => {
  // Set status Blocked or Unblocked
  const urlBlock = `${url}block-pc/${computer.pk}/`;

  const compStatus = () => {
    axios(urlBlock)
      .then(response => {
        computerQuery.refetch();
        if (response.status === 200) {
          console.log('Zmieniono status komputera');
        }
      })
      .catch(err => {
        console.log(err);
        toast.error(`Nie udało się zmienić statusu komputera`);
      });
  };

  return (
    <ButtonTemplate
      variant={'contained'}
      fullWidth={true}
      color={
        computer.fields.f === 0
          ? 'error'
          : computer.fields.f === 1
          ? 'success'
          : 'primary'
      }
      disabled={computerQuery.isFetching}
      className={'btn-state'}
      callback={compStatus}
      text={
        computer.fields.f === 0
          ? 'Zablokowany'
          : computer.fields.f === 1
          ? 'Odblokowany'
          : 'Zamykanie'
      }
    />
  );
};

export default ComputerState;
