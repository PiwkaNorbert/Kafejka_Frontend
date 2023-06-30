import React, { useState } from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const LegimiCodesButtons = ({ filia, empik }) => {
  const url = `http://192.168.200.37:8000/`;
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
        queryClient.invalidateQueries(['codes']);
        toast.success(
          `${typeOfCode ? 'Dodałeś' : 'Usunełeś'} kod ${
            empik ? 'EmpikGo' : 'Legimi'
          }`,
          {
            icon: '➕',
          }
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
            legimiCodesMutation?.isLoading ? (
              <div class="la-ball-clip-rotate la-sm">
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
      </Tooltip>

      <Tooltip title="Dodaj" placement="top">
        <ButtonTemplate
          variant={'contained'}
          color={'success'}
          disabled={legimiCodesMutation.isLoading}
          className={`control__btn-add`}
          icon={
            legimiCodesMutation.isLoading ? (
              <div class="la-ball-clip-rotate la-sm">
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
      </Tooltip>
    </div>
  );
};

export default LegimiCodesButtons;

// <div class="counter">

//   <ButtonTemplate
//     color={'error'}
//     disabled={setAmountQuery?.isFetching ? true : false}
//     className={'control__btn-sub'}
//     icon={spinner}
//     callback={() => {
//       setAmountQuery.refetch(false);
//     }}
//   />

//   <ButtonTemplate
//     color={'success'}
//     disabled={setAmountQuery?.isFetching ? true : false}
//     className={`control__btn-add`}
//     icon={spinner}
//     callback={() => {
//       setAmountQuery.refetch(true);
//     }}
//   />
// </div>

//////////////////////  CHANGE TO    /////////////////////////
// MAKE BUTTONS INTO ONE DYNAMIC ONE

// const whichButton = e => {
//   <ButtonTemplate
//     color={e === true ? 'success' : 'error'}
// variant={'contained'}
//     disabled={legimiQuery?.isFetching ? true : false}
//     className={`control__btn-${e === true ? 'add' : 'sub'}`}
//     icon={spinner}
//     onClick={x => {
//       if (e === true) setAmountQuery.refetch(false);
//       else setAmountQuery.refetch(true);
//     }}
//   />;
// };
// const addCode = whichButton(true);
// const subCode = whichButton(false);

// return (
//   <div class="counter">
//     {subCode}
//     {addCode}
//   </div>
// );
