import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CircularProgress } from '@mui/material';

const LegimiCodesAdd = ({ filia, url, isLoading, setIsLoading, empik }) => {
  const setLegimiCodes = async e => {
    const urlLegimiCodes = `${url}${e ? 'add' : 'sub'}/${filia}/${
      empik ? 1 : 0
    }/`;

    //EDIT SWITCH
    try {
      await axios(urlLegimiCodes);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(true);
    }
  };

  return (
    <div class="counter">
      <ButtonTemplate
        variant={'contained'}
        color={'error'}
        disabled={isLoading ? setIsLoading(true) : setIsLoading(false)}
        className={'control__btn-sub'}
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
      <ButtonTemplate
        variant={'contained'}
        color={'success'}
        disabled={isLoading ? setIsLoading(true) : setIsLoading(false)}
        className={'control__btn-add'}
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
    </div>
  );
};

export default LegimiCodesAdd;
