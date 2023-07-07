import ButtonTemplate from './ButtonTemplate';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

function ComputerShutdown({ computer, url }) {
  const queryClient = useQueryClient();
  const { curFilia } = useParams();

  const shutdownPCMutation = useMutation(
    async compId => {
      const shutdownPCURL = `${url}shutdown-pc/${compId}/`;
      const { data, status } = await axios.get(shutdownPCURL);
      if (status !== 200) {
        throw new Error(`Nastpił problem: ${status}`);
      }
      return data;
    },
    {
      onSuccess: response => {
        toast.success('Komputer został wyłączony', {
          icon: '✅',
          toastId: 'state',
        });

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
      onSettled: () => {
        queryClient.invalidateQueries(['komps', curFilia]);
      },
      onError: error => {
        toast.error(error.message, { icon: '❌' });
      },
    }
  );

  return (
    <ButtonTemplate
      color={computer.fields.online >= 60 ? 'error' : 'error'}
      className={'btn-shutdown'}
      icon={
        <PowerSettingsNewIcon sx={{ fontSize: '2.0rem', margin: '0 4px' }} />
      }
      disabled={shutdownPCMutation.isLoading}
      callback={() => {
        if (shutdownPCMutation.isLoading) return;
        shutdownPCMutation.mutate(computer.pk);
      }}
      text={'Wyłącz'}
    />
  );
}
ComputerShutdown.propTypes = {
  computer: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};
export default ComputerShutdown;
