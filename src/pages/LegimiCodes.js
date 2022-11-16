import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const LegimiCodes = () => {
  const [legimiCodes, setLegimiCodes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  let { curFilia } = useParams();

  const urlLegmi = `http://192.168.15.14:8000/json-codes/`;

  const getLegimiCodes = async () => {
    try {
      await axios(urlLegmi).then(response => {
        setLegimiCodes(response.data);
        setLoading(true);
      });
    } catch {
      setError(`Unable to fetch Data`);
      setLoading(true);
    }
    {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLegimiCodes();
    setInterval(getLegimiCodes, 100000);
  }, []);

  const legimiCodesList = legimiCodes
    .filter(computer =>
      curFilia === undefined ? true : computer.fields.filia == curFilia
    )
    .map((code, index) => {
      return (
        <tr key={index}>
          <td>{code.fields.filiaName}</td>
          <td>{code.fields.codesNumber}</td>
          <td>{code.fields.address}</td>
        </tr>
      );
    });

  return (
    <div>
      <main class="hi">
        <h1>Filia: {curFilia}</h1>
        <table id="table">
          <thead>
            <tr>
              <th>Nazwa Filii</th>
              <th class="number-of-codes">Liczba kodow</th>
              <th>Adres</th>
            </tr>
          </thead>
          <tbody>{legimiCodesList}</tbody>
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
