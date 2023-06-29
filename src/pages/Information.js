import React from 'react';
import { CardContent } from '@mui/material';

export const Information = function () {
  return (
    <div>
      <CardContent className="information-container info-con">
        <h3 className="info__header--3">Jak posługiwać się kafejką</h3>

        <p className="info__date">Mar 20, 2023</p>
        <a
          className="info__link"
          href="url:http://moodlebkr.biblioteka.krakow.pl/course/view.php?id=146"
        >
          Kliknij tutaj
        </a>
      </CardContent>
      <CardContent className="information-container info-con">
        <h3 className="info__header--3">v4.2.2</h3>

        <p className="info__date">Kwi 6, 2023</p>
        <h2 className="info__header--4">Code Quality</h2>
        <ul className="info__list">
          <li>Link do szkolenia <span className="highlight">"KLIKNIJ TUTAJ"</span> został naprawiony</li>
          <li>Theme managment w CSS</li>
        </ul>
        <h2 className="info__header--4">UI</h2>
        <ul className="info__list">
          <li>
            Mobilne urządzenia są teraz obsługiwane poprawnie w zakładce
            <span className="highlight">INFORMACJE</span> i{' '}
            <span className="highlight">WIFI</span>
          </li>
        </ul>
      </CardContent>
      <CardContent className="information-container info-con">
        <h3 className="info__header--3">v4.2.1</h3>

        <p className="info__date">Mar 27, 2023</p>
        <h2 className="info__header--4">Code Quality</h2>
        <ul className="info__list">
          <li>
            Dodano <span className="highlight">react-toastify</span>
            dla Toast notifications
          </li>
          <li>General code quality and performance</li>
        </ul>
        <h2 className="info__header--4">UI</h2>
        <ul className="info__list">
          <li>
            Dodano
            <span className="highlight">Toast Notifikacje</span> po kliknieciu
            przycisku, aby użytkownik wiedział, że zostało wysłane zapytanie do
            serwera
          </li>
        </ul>
      </CardContent>

      <CardContent className="information-container info-con">
        <h3 className="info__header--3">v4.2.0</h3>

        <p className="info__date">Mar 20, 2023</p>
        <h2 className="info__header--4">Code Quality</h2>
        <ul className="info__list">
          <li>
            Dodano <span className="highlight">@tanstack/react-query</span> dla
            lepszego data fetching and caching
          </li>
          <li>General code quality and performance</li>
        </ul>
        <h2 className="info__header--4">UI</h2>
        <ul className="info__list">
          <li>
            Dodano zakładke
            <span className="highlight"> INFORMACJE </span> w której jest link
            do szkolenia z tej aplikacji i{' '}
            <span className="highlight">CHANGELOG</span> aby prowadzic zmiany
          </li>
          <li>
            Zmiana nazwy zakładki <span className="highlight">KOMPUTERY</span>{' '}
            &rarr; <span className="highlight">KAFEJKA</span>{' '}
          </li>
          {/* <span className="highlight">  </span> */}
          <li>Zmiana wyglądu kafejki</li>
          <li>
            Dodano <span className="highlight"> Licznik Czasu </span> do
            komputerów
          </li>
        </ul>
      </CardContent>
    </div>
  );
};
