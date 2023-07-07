import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ComputerShutdownAll = ({ url }) => {
  const { curFilia } = useParams();
  // Send a get to shutdown all computers
  const queryClient = useQueryClient();

  const shutdownAllPCMutation = useMutation(
    async () => {
      const urlSDAll = `${url}shutdown-all/${curFilia}/`;

      const { data, status } = await axios.get(urlSDAll);
      if (status !== 200) {
        throw new Error(`Nastpił problem: ${status}`);
      }
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['komps', curFilia]);
        toast.success('Komputer został usunięty', { icon: '✅' });
        // queryClient.setQueryData(['komps', curFilia], old => {

        // });
      },
      onError: error => {
        console.error(error);
        toast.error('Komputer niezostał usunięty', { icon: '❌' });
      },
    }
  );

  return (
    <ButtonTemplate
      color={'error'}
      disabled={false}
      className={'btn-block'}
      callback={() => {
        if (shutdownAllPCMutation?.isLoading) return;
        shutdownAllPCMutation?.mutate();
      }}
      icon={<PowerSettingsNewIcon />}
      text={'Wyłącz Wszystkie'}
    />
  );
};

ComputerShutdownAll.propTypes = {
  computer: PropTypes.object,
  url: PropTypes.string.isRequired,
};

export default ComputerShutdownAll;
