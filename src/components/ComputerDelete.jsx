import ButtonTemplate from './ButtonTemplate';
import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const ComputerDelete = ({ computer, url }) => {
  const { curFilia } = useParams();
  const queryClient = useQueryClient();

  const deletePCMutation = useMutation(
    async compId => {
      const deletePCURL = `${url}delete-pc/${compId}/`;

      const { data, status } = await axios.get(deletePCURL);
      if (status !== 200) {
        throw new Error(`Nastpił problem: ${status}`);
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success('Komputer został usunięty', { icon: '✅' });
        // queryClient.setQueryData(['komps', curFilia], old => {

        // });
      },
      onSettled: () => {
        queryClient.invalidateQueries(['komps', curFilia]);
      },
      onError: error => {
        console.error(error);
        toast.error('Komputer niezostał usunięty', { icon: '❌' });
      },
    }
  );

  return (
    <Box className={`kafeika-komputer__index`}>
      <Box className={`kafeika-komputer__index-computer`}>
        <ButtonTemplate
          variant={'contained'}
          color={'error'}
          fullWidth={true}
          disabled={deletePCMutation.isLoading}
          callback={() => {
            if (deletePCMutation?.isLoading) return;
            deletePCMutation?.mutate(computer?.pk);
          }}
          className={'btn-delete'}
          text={
            deletePCMutation?.isLoading ? (
              <CircularProgress className="loading-status-btn" disableShrink />
            ) : (
              'Usuń'
            )
          }
        />
      </Box>
    </Box>
  );
};

ComputerDelete.propTypes = {
  computer: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default ComputerDelete;
