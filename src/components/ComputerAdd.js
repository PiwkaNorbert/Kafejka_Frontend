import React, { useState } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import AddIcon from '@mui/icons-material/Add';

const ComputerAdd = ({ filia, url }) => {
  // Send a get to add a new computer
  const compAdd = () => {
    const urlAdd = `${url}add-pc/${filia}/`;
    try {
      axios(urlAdd);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ButtonTemplate
      color={'success'}
      disabled={false}
      className={'btn-add'}
      callback={compAdd}
      icon={<AddIcon />}
      text={'Dodaj Komputer'}
      style={{ positsion: 'absolute', right: '100px' }}
    />
  );
};

export default ComputerAdd;
