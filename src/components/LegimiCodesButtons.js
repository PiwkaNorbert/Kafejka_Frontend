import React from 'react';
import axios from 'axios';
import ButtonTemplate from './ButtonTemplate';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Tooltip } from '@mui/material';
import { useEbookData } from '../helper/useEbookData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LegimiCodesButtons = ({ filia, empik }) => {
  const legimiQuery = useEbookData();
  const url = `http://192.168.200.37:8000/`;

  // };
  // const notify = () => {
  //   toast('Default Notification !');

  //   toast.success('Success Notification !', {
  //     position: toast.POSITION.TOP_CENTER,
  //   });

  //   toast.error('Error Notification !', {
  //     position: toast.POSITION.TOP_LEFT,
  //   });

  //   toast.warn('Warning Notification !', {
  //     position: toast.POSITION.BOTTOM_LEFT,
  //   });

  //   toast.info('Info Notification !', {
  //     position: toast.POSITION.BOTTOM_CENTER,
  //   });

  //   toast('Custom Style Notification with css class!', {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //     className: 'foo-bar',
  //   });
  // };

  const setLegimiCodes = async e => {
    const urlLegimiCodes = `${url}${e ? 'add' : 'sub'}/${filia}/${
      empik ? 1 : 0
    }/`;

    axios(urlLegimiCodes)
      .then(response => {
        legimiQuery?.refetch();

        if (response.status === 200) {
          if (response.config.url.includes('add')) {
            toast.success('Dodałeś kod', { icon: '➕' });
          }
          if (response.config.url.includes('sub')) {
            toast.success('Usunełeś kod', { icon: '➖' });
          }
        }
        if (response.status !== 200) {
          toast.error('Błąd', { icon: '❌' });
        }
      })
      .catch(error => {
        console.error(error);
        toast.error('Błąd', { icon: '❌' });
        throw new Error(error);
      });
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
      <ToastContainer
        position="bottom-right"
        pauseOnHover={false}
        newestOnTop={true}
        limit={3}
        autoClose={2000}
      />
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
