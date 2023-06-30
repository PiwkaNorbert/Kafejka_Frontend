import React, { useState } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ComputerAdd = ({ url }) => {
  // Send a get to add a new computer
  const { curFilia } = useParams();
  const queryClient = useQueryClient();

  const addPCMutation = useMutation(
    async () => {
      const urlAdd = `${url}add-pc/${curFilia}/`;

      const { data, status } = await axios.get(urlAdd);
      if (status !== 200) {
        throw new Error(`Nastpił problem: ${status}`);
      }
      return data;
    },
    {
      onSuccess: response => {
        queryClient.invalidateQueries(['komps', curFilia]);
        toast.success('Komputer został dodany', { icon: '✅' });
        console.log(response);
        // queryClient.setQueryData(['komps', curFilia], old => {

        // });
      },
      onError: error => {
        console.error(error);
        toast.error('Komputer niezostał dodany', { icon: '❌' });
      },
    }
  );
  return (
    <ButtonTemplate
      color={'success'}
      disabled={false}
      className={'btn-add'}
      callback={() => {
        if (addPCMutation.isLoading) return;
        addPCMutation.mutate();
      }}
      icon={<AddIcon />}
      text={'Dodaj Komputer'}
    />
  );
};

export default ComputerAdd;
