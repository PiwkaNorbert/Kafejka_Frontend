import React, { useState } from 'react';
import axios from 'axios';
import ButtonDelStaShut from './ButtonDelStaShut';

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
  return <ButtonDelStaShut compDelete={compDelete} buttonIndex={2} />;
};

export default ComputerDelete;
