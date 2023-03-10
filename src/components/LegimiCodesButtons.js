import React from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CircularProgress, Tooltip } from '@mui/material';

const LegimiCodesButtons = ({ filia, url, empik, legimiQuery }) => {
  const setLegimiCodes = async e => {
    const urlLegimiCodes = `${url}${e ? 'add' : 'sub'}/${filia}/${
      empik ? 1 : 0
    }/`;

    //EDIT SWITCH

    axios(urlLegimiCodes);
    legimiQuery?.refetch();
    legimiQuery?.refetch();
  };
  return (
    <div class="counter">
      <Tooltip title="Usuń" placement="top">
        <ButtonTemplate
          variant={'contained'}
          color={'error'}
          disabled={legimiQuery?.isLoading ? true : false}
          className={'control__btn-sub'}
          icon={
            legimiQuery?.isRefetching ? (
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
            setLegimiCodes(false);
          }}
        />
      </Tooltip>

      <Tooltip title="Dodaj" placement="top">
        <ButtonTemplate
          variant={'contained'}
          color={'success'}
          disabled={legimiQuery?.isLoading ? true : false}
          className={`control__btn-add`}
          icon={
            legimiQuery?.isRefetching ? (
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
            setLegimiCodes(true);
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
