import { CardContent } from '@mui/material';

export const Information = function () {
  return (
    <div className="kafeika__background-info">
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
      {/* <code className="highlight"> </code>*/}

      {/* Lipiec 5, 2023 */}
      <CardContent className="information-container info-con">
        <h3 className="info__header--3">v4.3.3</h3>

        <p className="info__date">Październik 19, 2023</p>
        <h2 className="info__header--4">Code</h2>
        <ul className="info__list">
          <li>
            Dodanie <code className="highlight"> signal</code> w{' '}
            <code className="highlight">useComputerData</code>, aby moc anulowac
            zapytanie do serwera przy zmianach na komputerach (np. zmiana stanu)
          </li>
          <li>
            Dodanie <code className="highlight"> Routes</code> w{' '}
            <code className="highlight">App.jsx</code> aby moc zmieniac zakładki
            w poprawny sposob
          </li>
        </ul>
        <h2 className="info__header--4">UI</h2>
        <ul className="info__list">
          <li>
            {/* changed the name to unblock and block from isblock and isunblocked in polish */}
            Zmiana nazwy przycisku <br />
            <code className="highlight">Zablokowany</code>&rarr;
            <code className="highlight">Odblokuj</code>
            <br />
            <code className="highlight">Odblokowany</code>&rarr;
            <code className="highlight">Zablokuj</code> <br />w zakładce KAFEJKA
          </li>
          <li>
            Usuniecie slowo stan obok przycisku
            <code className="highlight">Odblokuj / Zablokuj</code>
          </li>
        </ul>
      </CardContent>

      {/* Wrzesień 9, 2023 */}
      <CardContent className="information-container info-con">
        <h3 className="info__header--3">v4.3.2</h3>

        <p className="info__date">Wrzesień 9, 2023</p>
        <h2 className="info__header--4">Code & UI</h2>
        <ul className="info__list">
          <li>
            Zegar odlicza czas poprawnie i już nie znika po odświeżeniu
            strony/danych po kliknieciu przycisku
            <code className="highlight">Wyłącz za</code>.
          </li>
        </ul>
      </CardContent>

      <CardContent className="information-container info-con">
        <h3 className="info__header--3">v4.3.1</h3>

        <p className="info__date">Lipiec 5, 2023</p>
        <h2 className="info__header--4">Code</h2>
        <ul className="info__list">
          <li>
            Zmiany queryClient.invalidateQueries z{' '}
            <code className="highlight">onSuccess</code>na
            <code className="highlight">onSettled</code>
            <br />w<code className="highlight">useMutation</code> aby nie było
            duplikatów w cache przy zmianie stanu komputera
          </li>
        </ul>
        <h2 className="info__header--4">UI</h2>
        <ul className="info__list">
          <li>
            Interfejs sam sie aktualizuje po jakiej kolwiek zmienie w bazie
          </li>
          <li>
            Zmiana pola <code className="highlight">Input</code>na
            <code className="highlight">Select</code>w Kafejce obok przycisku
            (Wyłącz za)
          </li>
        </ul>
      </CardContent>

      <CardContent className="information-container info-con">
        <h3 className="info__header--3">v4.3</h3>

        <p className="info__date">Czerwiec 30, 2023</p>
        <h2 className="info__header--4">Code</h2>
        <ul className="info__list">
          <li>
            Ogromny <code className="highlight">Refactor</code>
          </li>
          <li>General code quality and performance</li>
        </ul>
        <h2 className="info__header--4">UI</h2>
        <ul className="info__list">
          <li>
            Dodano
            <code className="highlight">Toast Notifikacje</code>tak aby działały
            poprawnie, i bez duplikatów
          </li>
          <li>
            Dodano <code className="highlight">useMutation</code>i
            <code className="highlight">axios</code>
          </li>
          <li>
            Dodano <code className="highlight">Cachowanie</code>aby nie było
            trzeba pobierac danych za każdym razem gdy zmienimy zakładkę (np. z
            WIFI na INFORMACJE) i wrócimy z powrotem na WIFI
          </li>
          <li>
            Dodano
            <code className="highlight">
              Licznik czasu pozostałęgo na stanowisku w czasie rzeczywistym
            </code>
          </li>
          <li>Optymalizacja kodu i poprawa wydajności</li>
        </ul>
      </CardContent>
      <CardContent className="information-container info-con">
        <h3 className="info__header--3">v4.2.2</h3>

        <p className="info__date">Kwi 6, 2023</p>
        <h2 className="info__header--4">Code</h2>
        <ul className="info__list">
          <li>
            Link do szkolenia
            <code className="highlight">KLIKNIJ TUTAJ</code>
            został naprawiony
          </li>
          <li>Theme managment w CSS</li>
        </ul>
        <h2 className="info__header--4">UI</h2>
        <ul className="info__list">
          <li>
            Mobilne urządzenia są teraz obsługiwane poprawnie w zakładce
            <code className="highlight">INFORMACJE</code>i
            <code className="highlight">WIFI</code>
          </li>
        </ul>
      </CardContent>
      <CardContent className="information-container info-con">
        <h3 className="info__header--3">v4.2.1</h3>

        <p className="info__date">Mar 27, 2023</p>
        <h2 className="info__header--4">Code</h2>
        <ul className="info__list">
          <li>
            Dodano <code className="highlight">react-toastify</code>
            dla Toast notifications
          </li>
          <li>General code quality and performance</li>
        </ul>
        <h2 className="info__header--4">UI</h2>
        <ul className="info__list">
          <li>
            Dodano
            <code className="highlight">Toast Notifikacje</code>po kliknieciu
            przycisku, aby użytkownik wiedział, że zostało wysłane zapytanie do
            serwera
          </li>
        </ul>
      </CardContent>

      <CardContent className="information-container info-con">
        <h3 className="info__header--3">v4.2.0</h3>

        <p className="info__date">Mar 20, 2023</p>
        <h2 className="info__header--4">Code</h2>
        <ul className="info__list">
          <li>
            Dodano <code className="highlight">@tanstack/react-query</code>dla
            lepszego data fetching and caching
          </li>
          <li>General code quality and performance</li>
        </ul>
        <h2 className="info__header--4">UI</h2>
        <ul className="info__list">
          <li>
            Dodano zakładke
            <code className="highlight"> INFORMACJE </code>w której jest link do
            szkolenia z tej aplikacji i
            <code className="highlight">CHANGELOG</code>aby prowadzic zmiany
          </li>
          <li>
            Zmiana nazwy zakładki <code className="highlight">KOMPUTERY</code>
            &rarr; <code className="highlight">KAFEJKA</code>
          </li>
          {/* <code className="highlight">  </code>*/}
          <li>Zmiana wyglądu kafejki</li>
          <li>
            Dodano <code className="highlight"> Licznik Czasu </code>do
            komputerów
          </li>
        </ul>
      </CardContent>
    </div>
  );
};
