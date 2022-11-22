import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CircularProgress } from '@mui/material';
const LegimiCodesAdd = ({
  FiliaCodes,
  filia,
  url,
  isLoading,
  setIsLoading,
}) => {
  const setLegimiCodes = async e => {
    const urlLegimiCodes = `${url}${e ? 'add' : 'sub'}/${filia},0/`;
    try {
      await axios(urlLegimiCodes);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(true);
    }
  };

  return (
    <div class="counter" style={{ marginBottom: '8px' }}>
      <h1 style={{ fontSize: '3rem' }}>
        {filia === '0' ? 'Biblioteka Kraków' : 'Filia ' + filia}
      </h1>
      <ButtonTemplate
        variant={'contained'}
        color={'success'}
        disabled={isLoading ? setIsLoading(true) : setIsLoading(false)}
        className={'control__btn btn-legimi__add'}
        icon={
          isLoading ? (
            <CircularProgress className="loading-status-btn" disableShrink />
          ) : (
            <AddIcon />
          )
        }
        text={isLoading ? 'Ładowanie' : 'Dodaj'}
        type="submit"
        callback={e => {
          e.preventDefault();
          setLegimiCodes(true);
        }}
      />
      <>{FiliaCodes}</>
      <ButtonTemplate
        variant={'contained'}
        color={'error'}
        disabled={isLoading ? setIsLoading(true) : setIsLoading(false)}
        className={'control__btn btn-legimi__remove'}
        icon={
          isLoading ? (
            <CircularProgress className="loading-status-btn" disableShrink />
          ) : (
            <RemoveIcon />
          )
        }
        text={isLoading ? 'Ładowanie' : 'Usuń'}
        type="submit"
        callback={e => {
          e.preventDefault();
          setLegimiCodes(false);
        }}
      />
    </div>
  );
};

export default LegimiCodesAdd;
