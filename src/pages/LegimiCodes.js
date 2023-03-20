import React, { useState } from 'react';
import LegimiCodesButtons from '../components/LegimiCodesButtons';
import { useParams } from 'react-router-dom';
import { CircularProgress, Switch } from '@mui/material';
import ErrorCallback from '../components/Errors/ErrorCallback';
import { useEbookData } from '../helper/useEbookData';
const LegimiCodes = () => {
  const [filterLegimiValue, setFilterLegimi] = useState();
  const [filterEmpikValue, setFilterEmpik] = useState();

  let { curFilia } = useParams();

  const legimiQuery = useEbookData();

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

  const legimiCodesList = legimiQuery.data?.map(code => tableValues(code));

  const legimiCodesListFiltered = legimiQuery.data
    ?.filter(code => code.fields.codesNumber !== 0)
    .map(code => tableValues(code));

  const empikCodesListFiltered = legimiQuery.data
    ?.filter(code => code.fields.empikNumber !== 0)
    .map(code => tableValues(code));

  let empik = true;
  const FiliaCodes = legimiQuery.data
    ?.filter(code =>
      curFilia === undefined ? true : code.fields.index === +curFilia
    )
    .map(code => {
      return (
        <>
          {curFilia !== '' && !curFilia !== '0' ? (
            <>
              {/* TODO make it a one liner */}
              {/* <h1 className="counter__output-header" key={code.fields.index}>
                {empik
                  ? `Empik: ${code.fields.empikNumber}`
                  : `Legimi: ${code.fields.codesNumber}`}
              </h1>
              <LegimiCodesButtons filia={curFilia} empik={ ?empik : null}  /> */}
              <div className="codes__header">
                <h1 className="codes__header--1">{code.fields.filiaName}</h1>
              </div>
              <div className="counter__output">
                <h1 className="counter__output-header" key={code.fields.index}>
                  {code.fields.codesNumber}
                  <span> Legimi</span>
                </h1>
                <LegimiCodesButtons filia={curFilia} />
              </div>
              <div className="counter__output">
                <h1 className="counter__output-header" key={code.fields.index}>
                  {code.fields.empikNumber}
                  <span> Empik</span>
                </h1>
                <LegimiCodesButtons filia={curFilia} empik={empik} />
              </div>
            </>
          ) : null}
        </>
      );
    });

  if (legimiQuery.isLoading)
    return (
      <div className="codes__loading">
        <h2 className="codes__header--2">Nawiązywanie połączenia...</h2>
        <CircularProgress className="loading-status" disableShrink />
      </div>
    );
  if (legimiQuery.error) return <ErrorCallback />;
  return (
    <div>
      <main className="codes__main">
        <div className="codes__container">{FiliaCodes}</div>
        <table id="table" class="table__codes-ebook">
          <thead>
            <tr>
              <th>Nazwa Filii</th>
              <th className="number-of-codes">
                <div>
                  <span>Kody Legimi</span>
                  <Switch onClick={filterLegimi} />
                </div>
              </th>
              <th className="number-of-codes">
                <div>
                  <span>Kody Empik Go</span>
                  <Switch onClick={filterEmpik} />
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
