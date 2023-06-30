import React from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const ComputerState = ({ computer, url }) => {
  // Set status Blocked or Unblocked
  const queryClient = useQueryClient();
  const { curFilia } = useParams();

  const statusPCMutation = useMutation(
    async compId => {
      const stateOfPCURL = `${url}block-pc/${compId}/`;
      const { data, status } = await axios.get(stateOfPCURL);
      if (status !== 200) {
        throw new Error(`Nastpił problem: ${status}`);
      }
      return data;
    },
    {
      onSuccess: response => {
        toast.success(
          `${
            response[0].fields.f === 1
              ? 'Komputer Odblokowany'
              : 'Komputer Zablokowany'
          }`,
          {
            icon: '✅',
            toastId: 'state',
          }
        );

        queryClient.invalidateQueries(['komps', curFilia]);
        queryClient.setQueryData(['komps', curFilia], old => {
          return old.map(comp => {
            if (comp.pk === response[0].pk) {
              return {
                ...comp,
                fields: response[0].fields,
              };
            } else {
              return {
                ...comp,
              };
            }
          });
        });
      },
      onError: error => {
        toast.error(error.message, { icon: '❌' });
      },
    }
  );

  return (
    <>
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
        // disabled when the current computer is being fetched
        disabled={statusPCMutation.isLoading}
        className={'btn-state'}
        callback={() => {
          if (statusPCMutation.isLoading) return;
          statusPCMutation.mutate(computer.pk);
        }}
        text={
          computer.fields.f === 0
            ? 'Zablokowany'
            : computer.fields.f === 1
            ? 'Odblokowany'
            : 'Zamykanie'
        }
      />
    </>
  );
};

export default ComputerState;
