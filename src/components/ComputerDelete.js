import React, { useState } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';

const ComputerDelete = ({ computer, url }) => {
  const compDel = useState('');

  // Set status Shutdown
  const compDelete = async () => {
    const urlDelete = `${url}delete-pc/${computer.pk}/`;
    try {
      await axios.get(urlDelete, {
        compDel,
        title: 'Delete',
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
      disabled={false}
      className={'btn btn-delete'}
      callback={compDelete}
      text={'Usuń'}
    />
  );
};

export default ComputerDelete;
