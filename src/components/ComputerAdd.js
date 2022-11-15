import React, { useState } from 'react';
import axios from 'axios';
import ButtonAddShutdown from './ButtonAddShutdown';

const ComputerAdd = ({ filia, url }) => {
  const add = useState('');

  // Send a get to add a new computer
  const compAdd = async () => {
    const urlAdd = `${url}add-pc/${filia}/`;
    try {
      await axios.get(urlAdd, {
        add,
        title: 'Add',
        completed: false,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return <ButtonAddShutdown compAdd={compAdd} curShutDown={false} />;
};

export default ComputerAdd;
