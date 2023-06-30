import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import ButtonTemplate from './ButtonTemplate';
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const ComputerShutdownTimeoutPanel = ({ computer, index, url }) => {
  const [num, setNum] = useState(
    Math.min(Math.max(parseInt(computer.fields.shutdown_timeout), 1), 60)
  );
  const inputRef = useRef(null);
  const fetching = useIsFetching();
  const { curFilia } = useParams();
  const queryClient = useQueryClient();

  // Set status Shutdown Time

  const pcTimerMutation = useMutation(
    async compId => {
      const urlShutdownTimeout = `${url}shutdown-timeout/${computer.pk}/${compId}/`;
      const { data, status } = await axios.get(urlShutdownTimeout);
      if (status !== 200) {
        throw new Error(`Nastpił problem: ${status}`);
      }
      return data;
    },
    {
      onSuccess: response => {
        toast.success(
          `Za ${inputRef.current.value} minut nastapi wyłączenie komputera.`,
          {
            icon: '✅',
            toastId: 'timeout',
          }
        );
        inputRef.current.value = '';

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
    <Box className={`kafeika-komputer__timeout`}>
      <Box
        className={`kafeika-komputer__timeout-computer`}
        sx={{
          backgroundColor: `${
            fetching ? 'transparent' : 'var(--body-bg-color)'
          }`,
        }}
      >
        <form
          className="kafeika-komputer__timeout-computer"
          onSubmit={e => {
            e.preventDefault();
            // mutate based by the input value
            if (pcTimerMutation.isLoading) return;
            pcTimerMutation.mutate(num);
          }}
        >
          <ButtonTemplate
            variant={'contained'}
            type="submit"
            color={computer.fields.f === 5 ? 'warning' : 'primary'}
            fullWidth={true}
            disabled={pcTimerMutation.isFetching}
            key={index}
            className={'btn-cancel'}
            text={`${computer.fields.f === 5 ? 'Wyłączanie' : 'Wyłącz za'}`}
          />
          <input
            placeholder="min"
            size="small"
            ref={inputRef}
            disabled={pcTimerMutation.isFetching}
            name="closeTime"
            type="number"
            min={5}
            max={60}
            onChange={e => {
              if (
                (e.target.value >= 1 && e.target.value <= 60) ||
                e.target.value === '' ||
                e.target.value === null
              )
                return setNum(e.target.value);
              return toast.error('Wprowadź liczbę od 1 do 60.', {
                icon: '❌',
              });
            }}
            className="kafeika-komputer__timeout-computer--input"
          />
        </form>
      </Box>
    </Box>
  );
};

export default ComputerShutdownTimeoutPanel;
