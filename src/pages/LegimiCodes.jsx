import { useState } from 'react';
import LegimiCodesButtons from '../components/LegimiCodesButtons';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import ErrorCallback from '../components/Errors/ErrorCallback';
import { useEbookData } from '../helper/useEbookData';
import SideBar from '../components/SideBar';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';

const LegimiCodes = () => {
  const [filterLegimiValue, setFilterLegimi] = useState();
  const [filterEmpikValue, setFilterEmpik] = useState();
  const [inputValueLegimi, setInputValueLegimi] = useState();
  const [inputValueEmpik, setInputValueEmpik] = useState();
  const [showInputs, setShowInputs] = useState(false);

  const url = `http://192.168.200.37:8000/`;

  const queryClient = useQueryClient();
  const legimiQuery = useEbookData();
  let { curFilia } = useParams();

  const [sidebarOpen, setSideBarOpen] = useState(
    JSON.parse(
      localStorage.getItem('sidebar') === null
        ? false
        : localStorage.getItem('sidebar')
    )
  );

  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
    localStorage.setItem('sidebar', JSON.stringify(!sidebarOpen));
  };

  const filterLegimi = e => {
    if (e.target.checked) {
      setFilterLegimi(true);
    } else {
      setFilterLegimi(false);
    }
  };
  const filterEmpik = e => {
    if (e.target.checked) {
      setFilterEmpik(true);
    } else {
      setFilterEmpik(false);
    }
  };
  const showInputCodes = e => {
    if (e.target.checked) {
      setShowInputs(true);
    } else {
      setShowInputs(false);
    }
  };

  const codeInputMutation = useMutation(
    body => {
      // use axios.post
      return axios.post(`${url}start-point/${curFilia}/`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    {
      onError: error => {
        toast.error(error.message, {
          toastId: 'LegitmiCodes',
          position: 'top-right',
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries('codes');
      },
    }
  );

  const tableValues = function (code) {
    return (
      <tr key={code.fields.index}>
        <td>{code.fields.filiaName}</td>

        <td>{code.fields.codesNumber}</td>
        <td>{code.fields.empikNumber}</td>

        <td>{code.fields.address}</td>
      </tr>
    );
  };
  if (legimiQuery.isLoading)
    return (
      <div className="codes__loading">
        <h2 className="codes__header--2">Nawiązywanie połączenia...</h2>
        <CircularProgress className="loading-status" disableShrink />
      </div>
    );
  if (legimiQuery.error) return <ErrorCallback />;

  const legimiCodesList = legimiQuery.data?.map(code => tableValues(code));

  const legimiCodesListFiltered = legimiQuery.data
    ?.filter(code => code.fields.codesNumber !== 0 && filterLegimiValue)
    .map(code => tableValues(code));

  const empikCodesListFiltered = legimiQuery.data
    ?.filter(code => code.fields.empikNumber !== 0 && filterEmpikValue)
    .map(code => tableValues(code));
  let empik = true;

  const FiliaCodes = legimiQuery.data
    ?.filter(code =>
      curFilia === undefined ? true : code.fields.index === +curFilia
    )
    .map(code => {
      return (
        <>
          {curFilia !== '' && !curFilia !== '0' && curFilia !== undefined && (
            <>
              <div className="codes__header">
                <h1 className="codes__header--1">{code.fields.filiaName}</h1>
              </div>
              <div className="counter__output">
                <h1 className="counter__output-header" key={code.fields.index}>
                  {!showInputs && <span>{code.fields.codesNumber}</span>}
                  Legimi
                </h1>
                <div className={showInputs ? 'codes__form' : undefined}>
                  {showInputs && (
                    <form
                      className="codes__form-codes"
                      onSubmit={e => {
                        e.preventDefault();
                        codeInputMutation.mutate(
                          {
                            amount: +e.target.legimi.value,
                            type: 'legimi',
                          },
                          {
                            onSuccess: response => {
                              console.log(response);
                              toast.success(
                                `${response.data[0].fields.codesNumber} Kody Legimi `,
                                {
                                  toastId: 'LegitmiCodes',
                                  position: 'top-right',
                                }
                              );
                              setInputValueLegimi('');
                            },
                          }
                        );
                      }}
                    >
                      <input
                        maxLength="3"
                        min="0"
                        max="999"
                        type="number"
                        name="legimi"
                        className="counter__code-input "
                        placeholder={code.fields.codesNumber}
                        value={inputValueLegimi}
                        onChange={e => {
                          if (
                            e.target.value.length <= 3 &&
                            e.target.value.length >= 0
                          ) {
                            setInputValueLegimi(e.target.value);
                          } else {
                            toast.error(
                              'Legimi, proszę wpisać liczbę od 0 do 999',
                              {
                                toastId: 'LegimiCodes',
                                position: 'top-right',
                              }
                            );
                            console.error('Proszę wpisać liczbę od 0 do 999');
                          }
                        }}
                      />
                      <Button
                        sx={{
                          maxHeight: 'min-content',
                          boxShadow: 'none',
                          borderRadius: '4px',
                          p: '1rem',
                        }}
                        className="counter__code-input--btn"
                        variant="contained"
                        type="submit"
                        disabled={codeInputMutation.isLoading}
                      >
                        {/* OK */}
                        <CheckIcon />
                      </Button>
                    </form>
                  )}
                  <LegimiCodesButtons filia={curFilia} url={url} />
                </div>
              </div>
              <div className="counter__output">
                <h1 className="counter__output-header" key={code.fields.index}>
                  {!showInputs && <span>{code.fields.empikNumber}</span>}
                  Empik
                </h1>
                <div className={showInputs ? 'codes__form' : undefined}>
                  {showInputs && (
                    <form
                      className="codes__form-codes"
                      onSubmit={e => {
                        e.preventDefault();
                        codeInputMutation.mutate(
                          {
                            amount: +e.target.empik.value,
                            type: 'empik',
                          },
                          {
                            onSuccess: response => {
                              toast.success(
                                `${response.data[0].fields.empikNumber} Kody Empik `,
                                {
                                  toastId: 'EmpikCodes',
                                  position: 'top-right',
                                }
                              );

                              setInputValueEmpik('');
                            },
                          }
                        );
                      }}
                    >
                      <input
                        maxLength="3"
                        min="0"
                        max="999"
                        type="number"
                        name="empik"
                        className="counter__code-input"
                        placeholder={code.fields.empikNumber}
                        value={inputValueEmpik}
                        onChange={e => {
                          if (
                            e.target.value.length <= 3 &&
                            e.target.value.length >= 0
                          ) {
                            setInputValueEmpik(e.target.value);
                          } else {
                            toast.error(
                              'Legimi, proszę wpisać liczbę od 0 do 999',
                              {
                                toastId: 'LegitmiCodes',
                                position: 'top-right',
                              }
                            );
                            console.error('Proszę wpisać liczbę od 0 do 999');
                          }
                        }}
                      />
                      <Button
                        sx={{
                          maxHeight: 'min-content',
                          boxShadow: 'none',
                          borderRadius: '4px',
                          p: '1rem',
                        }}
                        className="counter__code-input--btn"
                        variant="contained"
                        type="submit"
                        disabled={codeInputMutation.isLoading}
                      >
                        {/* OK */}
                        <CheckIcon />
                      </Button>
                    </form>
                  )}
                  <LegimiCodesButtons
                    filia={curFilia}
                    empik={empik}
                    url={url}
                  />
                </div>
              </div>
            </>
          )}
        </>
      );
    });

  return (
    <div>
      <main className="codes__main">
        <div className="codes__container">{FiliaCodes}</div>
        <span>
          <SideBar
            isOpen={sidebarOpen}
            filterLegimi={filterLegimi}
            filterEmpik={filterEmpik}
            toggleSidebar={handleViewSidebar}
            showInputCodes={showInputCodes}
          />
        </span>
        <table id="table" className="table__codes-ebook">
          <thead>
            <tr>
              <th>Nazwa Filii</th>
              <th className="number-of-codes">
                <div>
                  <span>Kody Legimi</span>
                </div>
              </th>
              <th className="number-of-codes">
                <div>
                  <span>Kody Empik Go</span>
                </div>
              </th>
              <th>Adres</th>
            </tr>
          </thead>

          <tbody>
            {filterLegimiValue && filterEmpikValue
              ? legimiCodesListFiltered
              : null}
            {filterLegimiValue && !filterEmpikValue
              ? legimiCodesListFiltered
              : null}
            {filterEmpikValue && !filterLegimiValue
              ? empikCodesListFiltered
              : null}
            {!filterLegimiValue && !filterEmpikValue ? legimiCodesList : null}
          </tbody>
        </table>
      </main>
      <footer className="footer-wrap">
        <div className="ftr-container">
          <span>
            Copyright
            <br />
            <a>Mateusz Rozycki</a> &amp;
            <a> Norbert Piwka</a> <br />
            2022 <br />
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LegimiCodes;
