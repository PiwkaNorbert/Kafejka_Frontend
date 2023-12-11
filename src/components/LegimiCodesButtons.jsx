import { useState } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import PropTypes from 'prop-types';

const LegimiCodesButtons = ({ filia, empik, url, children }) => {
  const queryClient = useQueryClient();
  const [typeOfCode, setTypeOfCode] = useState(null);

  const legimiCodesMutation = useMutation(
    async state => {
      const urlLegimiCodes = `${url}${state ? 'add' : 'sub'}/${filia}/${
        empik ? 1 : 0
      }/`;
      setTypeOfCode(state);
      const { data, status } = await axios(urlLegimiCodes);
      if (status !== 200) {
        throw new Error('Błąd połączenia z serwerem');
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success(
          `${typeOfCode ? 'Dodałeś' : 'Usunełeś'} kod ${
            empik ? 'EmpikGo' : 'Legimi'
          }`,
          {
            icon: '➕',
          }
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(['codes']);
      },
      onError: () => {
        toast.error('Błąd', { icon: '❌' });
      },
    }
  );

  return (
    <>
      <ButtonTemplate
        variant={'contained'}
        color={'error'}
        disabled={legimiCodesMutation.isLoading}
        className={'control__btn-sub'}
        icon={
          legimiCodesMutation?.isLoading ? (
            <div className="la-ball-clip-rotate la-sm">
              <div></div>
            </div>
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
      {children}

      <ButtonTemplate
        variant={'contained'}
        color={'success'}
        disabled={legimiCodesMutation.isLoading}
        className={`control__btn-add`}
        icon={
          legimiCodesMutation.isLoading ? (
            <div className="la-ball-clip-rotate la-sm">
              <div></div>
            </div>
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
    </>
  );
};

LegimiCodesButtons.propTypes = {
  filia: PropTypes.string.isRequired,
  empik: PropTypes.bool,
};

export default LegimiCodesButtons;
