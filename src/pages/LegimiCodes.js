import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LegimiCodesAdd from '../components/LegimiCodesAdd';
import { CircularProgress } from '@mui/material';

import axios from 'axios';

const LegimiCodes = () => {
  const [legimiCodes, setLegimiCodes] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState();

  let { curFilia } = useParams();

  const urlLegmi = `http://192.168.15.115:7000/`;

  const getLegimiCodes = async () => {
    try {
      await axios(`${urlLegmi}json-codes/`).then(response => {
        setLegimiCodes(response.data);
        setIsLoading(false);
      });
    } catch {
      setError(`Unable to fetch Data`);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    setInterval(getLegimiCodes, 2000);
  }, []);

  // .filter(code =>
  //   curFilia === undefined ? true : code.fields.index == curFilia
  // )
  const legimiCodesList = legimiCodes.map((code, index) => {
    return (
      <tr key={index}>
        <td>{code.fields.filiaName}</td>

        <td>{code.fields.codesNumber}</td>
        <td>{code.fields.empikNumber}</td>

        <td>{code.fields.address}</td>
      </tr>
    );
  });
  let empik = true;
  const FiliaCodes = legimiCodes
    .filter(code =>
      curFilia === undefined ? true : code.fields.index === +curFilia
    )
    .map((code, index) => {
      return (
        <>
          <div className="counter__output">
            <h1 className="counter__output-header" key={index}>
              {`Legimi: ${code.fields.codesNumber}`}
            </h1>
            <LegimiCodesAdd
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              filia={curFilia}
              url={urlLegmi}
            />
          </div>
          <div className="counter__output">
            <h1 className="counter__output-header" key={index}>
              {`Empik: ${code.fields.empikNumber}`}
            </h1>
            <LegimiCodesAdd
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              filia={curFilia}
              url={urlLegmi}
              empik={empik}
            />
          </div>
        </>
      );
    });
  return (
    <div>
      <main className="codes__main">
        <div className="codes__header">
          {!curFilia == '' && !curFilia !== '0' ? (
            <h1 className="codes__header--1">
              {curFilia === '0' ? 'Biblioteka Główna' : 'Filia ' + curFilia}
            </h1>
          ) : null}
        </div>
        <div className="codes__buttons">{FiliaCodes}</div>
        <table id="table" class="table__codes-ebook">
          <thead>
            <tr>
              <th>Nazwa Filii</th>
              <th class="number-of-codes">Kody Legimi</th>
              <th class="number-of-codes">Kody Empik Go</th>
              <th>Adres</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress className="loading-status" disableShrink />
              </div>
            ) : (
              legimiCodesList
            )}
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
            <a>Norbert Piwka</a> <br />
            2022 <br />
            Version 5.0
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LegimiCodes;
