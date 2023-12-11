import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import PropTypes from 'prop-types';

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
      onMutate: async compId => {
        await queryClient.cancelQueries(['komps', curFilia]);

        const previousKomps = queryClient.getQueryData(['komps', curFilia]);

        queryClient.setQueryData(['komps', curFilia], oldData => {
          return oldData.map(comp => {
            if (comp.pk === compId) {
              return {
                ...comp,
                fields: {
                  ...comp.fields,
                  f: 5,
                },
              };
            } else {
              return {
                ...comp,
              };
            }
          });
        });

        return { previousKomps };
      },
      onSuccess: response => {
        toast.success('Zmieniono status komputera', {
          icon: '✅',
          toastId: 'state',
        });
        queryClient.setQueryData(['komps', curFilia], oldData => {
          return oldData.map(comp => {
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
      onSettled: () => queryClient.invalidateQueries(['komps', curFilia]),
      onError: (error, context) => {
        console.log(error);
        queryClient.setQueryData(['komps', curFilia], context.previousKomps);
        toast.error(error.message, { icon: '❌', toastId: 'state' });
      },
    }
  );

  return (
    <>
      <ButtonTemplate
        variant={'contained'}
        fullWidth={true}
        color={computer.fields.f === 1 ? 'error' : 'success'}
        // disabled when the current computer is being fetched
        disabled={statusPCMutation.isLoading || computer.fields.f === 5}
        className={'btn-state'}
        callback={() => {
          if (statusPCMutation.isLoading) return;
          statusPCMutation.mutate(computer.pk);
        }}
        text={computer.fields.f === 0 ? 'Odblokuj' : 'Zablokuj'}
      />
    </>
  );
};

ComputerState.propTypes = {
  computer: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default ComputerState;
