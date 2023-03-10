import React, { useState } from 'react';
import LegimiCodesButtons from '../components/LegimiCodesButtons';
import { useParams } from 'react-router-dom';
import { CircularProgress, Switch } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import ErrorCallback from '../components/Errors/ErrorCallback';
const LegimiCodes = () => {
  const [filterLegimiValue, setFilterLegimi] = useState();
  const [filterEmpikValue, setFilterEmpik] = useState();

  let { curFilia } = useParams();

  const hostnameDomain = window.location.hostname.includes('192.168.200.30');
  const hostnameForward = window.location.hostname.includes('192.168.200.37');
  const hostnameStalowe = window.location.hostname.includes('192.168.3.34');
  const port = '8000';
  const urlStalowy = `http://192.168.3.34:${port}/`;
  const urlDomena = `http://192.168.200.30:${port}/`;
  const urlForward = `http://192.168.200.37:${port}/`;

  let urlLegmi = hostnameDomain
    ? urlDomena
    : hostnameForward
    ? urlForward
    : hostnameStalowe
    ? urlStalowy
    : urlForward;

  const fetchCodes = () =>
    fetch(`${urlLegmi}json-codes/`).then(res => res.json());

  const legimiQuery = useQuery(['codes'], fetchCodes);

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
          {!curFilia == '' && !curFilia !== '0' ? (
            <>
              {/* TODO make it a one liner
              <h1 className="counter__output-header" key={code.fields.index}>
                  { ? `Empik: ${code.fields.empikNumber}`:`Legimi: ${code.fields.codesNumber}` }
                </h1>
                <LegimiCodesAdd filia={curFilia} url={urlLegmi} legimiQuery={legimiQuery} empik={ ?empik : null} 
                */}

              <div className="codes__header">
                <h1 className="codes__header--1">{code.fields.filiaName}</h1>
              </div>

              <div className="counter__output">
                <h1 className="counter__output-header" key={code.fields.index}>
                  {`Legimi: ${code.fields.codesNumber}`}
                </h1>
                <LegimiCodesButtons
                  filia={curFilia}
                  url={urlLegmi}
                  refetch={legimiQuery.refetch}
                  legimiQuery={legimiQuery}
                />
              </div>
              <div className="counter__output">
                <h1 className="counter__output-header" key={code.fields.index}>
                  {`Empik: ${code.fields.empikNumber}`}
                </h1>
                <LegimiCodesButtons
                  filia={curFilia}
                  url={urlLegmi}
                  empik={empik}
                  refetch={legimiQuery.refetch}
                  legimiQuery={legimiQuery}
                />
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
              <th class="number-of-codes">
                <div>
                  <span>Kody Legimi</span>
                  <Switch onClick={filterLegimi} />
                </div>
              </th>
              <th class="number-of-codes">
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
      <footer class="footer-wrap">
        <div class="ftr-container">
          <span>
            Ostatnia aktualizacja: <br />
            2022-11-16 14:13:12
          </span>
          <span>
            Copyright
            <br />
            <a>Mateusz Rozycki</a> &amp;
            <a> Norbert Piwka</a> <br />
            2022 <br />
            Version 5.0
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LegimiCodes;
