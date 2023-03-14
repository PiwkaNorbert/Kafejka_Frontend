import React from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';

const ComputerState = ({ computer, url, computerQuery }) => {
  // Set status Blocked or Unblocked
  const urlBlock = `${url}block-pc/${computer.pk}/`;
  const compStatus = async () => {
    try {
      await axios(urlBlock);
    } catch (err) {
      console.log(err);
    }
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
