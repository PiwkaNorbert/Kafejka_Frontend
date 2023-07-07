import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CircularProgress, Tooltip, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const LegimiCodesAdd = ({ filia, url, isLoading, setIsLoading, empik }) => {
  const legimiCodesMutation = useMutation(
    async state => {
      const urlLegimiCodes = `${url}${state ? 'add' : 'sub'}/${filia}/${
        empik ? 1 : 0
      }/`;
      const { data, status } = await axios(urlLegimiCodes);
      if (status !== 200) {
        throw new Error('Błąd połączenia z serwerem');
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success(
          `Dodałeś kod ${
            urlLegimiCodes.includes('add') ? 'Legimi' : 'EmpikGo'
          }`,
          { icon: '➕' }
        );
      },
      onError: () => {
        toast.error('Błąd', { icon: '❌' });
      },
    }
  );

  return (
    <div class="counter">
      <Tooltip title="Usuń" placement="top">
        <ButtonTemplate
          variant={'contained'}
          color={'error'}
          disabled={legimiCodesMutation.isLoading}
          className={'control__btn-sub'}
          icon={
            legimiCodesMutation.isLoading ? (
              <CircularProgress className="loading-status-btn" disableShrink />
            ) : (
              <RemoveIcon />
            )
          }
          type="submit"
          callback={e => {
            e.preventDefault();
            if (legimiCodesMutation.isLoading) return;

            legimiCodesMutation.mutate(false);
          }}
        />
      </Tooltip>

      <Tooltip title="Dodaj" placement="top">
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
          type="submit"
          callback={e => {
            e.preventDefault();
            if (legimiCodesMutation.isLoading) return;

            legimiCodesMutation.mutate(true);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default LegimiCodesAdd;
