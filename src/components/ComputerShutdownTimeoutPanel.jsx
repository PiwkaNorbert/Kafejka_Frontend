import { useRef, useState } from 'react';
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

import PropTypes from 'prop-types';

const ComputerShutdownTimeoutPanel = ({ computer, index, url }) => {
  const [num, setNum] = useState(
    Math.min(Math.max(parseInt(computer.fields.shutdown_timeout), 1), 60)
  );
  const fetching = useIsFetching();
  const { curFilia } = useParams();
  const queryClient = useQueryClient();
  const inputRef = useRef(null);
  // Set status Shutdown Time

  const pcTimerMutation = useMutation(
    async closeByAmount => {
      const urlShutdownTimeout = `${url}shutdown-timeout/${computer.pk}/${closeByAmount}/`;
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
        setNum(undefined);
        inputRef.current.value = 0;

        // queryClient.invalidateQueries(['komps', curFilia]);
        queryClient.setQueryData(['komps', curFilia], old => {
          return old.map(comp => {
            if (comp.pk === response[0].pk) {
              return {
                ...comp,
                fields: { ...response[0].fields },
              };
            } else {
              return {
                ...comp,
                fields: { ...comp.fields },
              };
            }
          });
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(['komps', curFilia]);
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
            if (pcTimerMutation.isLoading || isNaN(num)) return;
            pcTimerMutation.mutate(num);
          }}
        >
          <ButtonTemplate
            variant={'contained'}
            type="submit"
            color={'primary'}
            fullWidth={true}
            disabled={pcTimerMutation.isFetching || computer.fields.f === 5}
            key={index}
            className={'btn-cancel'}
            text={`Wyłącz za`}
          />
          <select
            className="kafeika-komputer__timeout-computer--input"
            disabled={
              pcTimerMutation.isFetching ||
              computer.fields.online > 60 ||
              options.value === 0
            }
            ref={inputRef}
            onChange={e => {
              setNum(e.target.value);
            }}
            defaultValue={0}
          >
            {options.map((option, index) => (
              <option
                key={index}
                value={option.value}
                disabled={option.label == 0}
              >
                {option.label}
              </option>
            ))}
          </select>
        </form>
      </Box>
    </Box>
  );
};

// options for a select with increments of 5 up to 60
const options = [
  { value: 0, label: '0' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
  { value: 30, label: '30' },
  { value: 35, label: '35' },
  { value: 40, label: '40' },
  { value: 45, label: '45' },
  { value: 50, label: '50' },
  { value: 55, label: '55' },
  { value: 60, label: '60' },
];

ComputerShutdownTimeoutPanel.propTypes = {
  computer: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default ComputerShutdownTimeoutPanel;
