import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LegimiCodesAdd from '../components/LegimiCodesAdd';
import { CircularProgress } from '@mui/material';

import axios from 'axios';

const LegimiCodes = ({}) => {
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

    getLegimiCodes();
    setInterval(getLegimiCodes, 10000);
  }, []);

  // .filter(code =>
  //   curFilia === undefined ? true : code.fields.index == curFilia
  // )
  const legimiCodesList = legimiCodes.map((code, index) => {
    return (
      <tr key={index}>
        <td>{code.fields.filiaName}</td>

        <td>{code.fields.codesNumber}</td>

        <td>{code.fields.address}</td>
      </tr>
    );
  });
  const FiliaCodes = legimiCodes
    .filter(code =>
      curFilia === undefined ? true : code.fields.index == curFilia
    )
    .map((code, index) => {
      return (
        <h1
          style={{ fontSize: '1.5rem' }}
          className="counter__output"
          key={index}
        >{`Dostępnychy kodów: ${code.fields.codesNumber}`}</h1>
      );
    });

  return (
    <div>
      <main style={{ background: 'unset' }}>
        {!curFilia == '' && !curFilia !== '0' ? (
          <LegimiCodesAdd
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            filia={curFilia}
            url={urlLegmi}
            FiliaCodes={FiliaCodes}
          />
        ) : null}
        <table id="table">
          <thead>
            <tr>
              <th>Nazwa Filii</th>
              <th class="number-of-codes">Liczba kodow</th>
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
            <a href="https://github.com/mysh3k">Mateusz Rozycki</a> &amp;
            <a href="https://github.com/PiwkaNorbert">Norbert Piwka</a> <br />
            2022 <br />
            Version 4.0
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LegimiCodes;
