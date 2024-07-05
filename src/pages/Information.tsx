
export default function Information() {
  return (
    <>
      <article className=" p-5 bg-background rounded-lg shadow-md ">
        <h3 className="text-2xl font-medium">Jak posługiwać się kafejką</h3>

        <p className="text-sm text-slate-500 mb-6 ">Mar 20, 2023</p>
        <a
          className="text-blue-500 hover:underline"
          href="url:http://moodlebkr.biblioteka.krakow.pl/course/view.php?id=146"
        >
          Kliknij tutaj
        </a>
      </article>
      {/* <code className="highlight"> </code>*/}


      {/* Lipiec 4, 2024 */}

      <article className=" p-5 bg-background rounded-lg shadow-md ">
        <h3 className="text-2xl font-medium">v5.0.0</h3>

        <p className="text-sm text-slate-500 mb-6">Lipiec 4, 2024</p>
        <h2 className="text-xl border-b">Code</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
          <li>
            Zmiana z <br/>
            <code className="highlight">JavaScript</code>&rarr;
            <code className="highlight">TypeScript</code>
          </li>
          <li>
            Code refactoring i optymalizacja
          </li>
        </ul>
        <h2 className="text-xl border-b">UI</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
          <li>
            Zmiana całej szaty graficznej na bardziej przejrzystą 
          </li>
        </ul>
      </article>

      {/* Październik 19, 2023 */}
      <article className=" p-5 bg-background rounded-lg shadow-md ">
        <h3 className="text-2xl font-medium">v4.3.3</h3>

        <p className="text-sm text-slate-500 mb-6">Październik 19, 2023</p>
        <h2 className="text-xl border-b">Code</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
          <li>
            Dodanie <code className="highlight">signal</code> w{' '}
            <code className="highlight">useComputerData</code>, aby moc anulowac
            zapytanie do serwera przy zmianach na komputerach (np. zmiana stanu)
          </li>
          <li>
            Dodanie <code className="highlight">routes</code> w{' '}
            <code className="highlight">App.jsx</code> aby moc zmieniac zakładki
            w poprawny sposob
          </li>
        </ul>
        <h2 className="text-xl border-b">UI</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
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
      </article>

      {/* Wrzesień 9, 2023 */}
      <article className=" p-5 bg-background rounded-lg shadow-md ">
        <h3 className="text-2xl font-medium">v4.3.2</h3>

        <p className="text-sm text-slate-500 mb-6">Wrzesień 9, 2023</p>
        <h2 className="text-xl border-b">Code & UI</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
          <li>
            Zegar odlicza czas poprawnie i już nie znika po odświeżeniu
            strony/danych po kliknieciu przycisku
            <code className="highlight">Wyłącz za</code>.
          </li>
        </ul>
      </article>

      <article className=" p-5 bg-background rounded-lg shadow-md ">
        <h3 className="text-2xl font-medium">v4.3.1</h3>

        <p className="text-sm text-slate-500 mb-6">Lipiec 5, 2023</p>
        <h2 className="text-xl border-b">Code</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
          <li>
            Zmiany queryClient.invalidateQueries z{' '}
            <code className="highlight">onSuccess</code>na
            <code className="highlight">onSettled</code>
            <br />w<code className="highlight">useMutation</code> aby nie było
            duplikatów w cache przy zmianie stanu komputera
          </li>
        </ul>
        <h2 className="text-xl border-b">UI</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
          <li>
            Interfejs sam sie aktualizuje po jakiej kolwiek zmienie w bazie
          </li>
          <li>
            Zmiana pola <code className="highlight">Input</code>na
            <code className="highlight">Select</code>w Kafejce obok przycisku
            (Wyłącz za)
          </li>
        </ul>
      </article>

      <article className=" p-5 bg-background rounded-lg shadow-md ">
        <h3 className="text-2xl font-medium">v4.3</h3>

        <p className="text-sm text-slate-500 mb-6">Czerwiec 30, 2023</p>
        <h2 className="text-xl border-b">Code</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
          <li>
            Ogromny <code className="highlight">Refactor</code>
          </li>
          <li>General code quality and performance</li>
        </ul>
        <h2 className="text-xl border-b">UI</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
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
      </article>
      <article className=" p-5 bg-background rounded-lg shadow-md ">
        <h3 className="text-2xl font-medium">v4.2.2</h3>

        <p className="text-sm text-slate-500 mb-6">Kwi 6, 2023</p>
        <h2 className="text-xl border-b">Code</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
          <li>
            Link do szkolenia
            <code className="highlight">KLIKNIJ TUTAJ</code>
            został naprawiony
          </li>
          <li>Theme managment w CSS</li>
        </ul>
        <h2 className="text-xl border-b">UI</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
          <li>
            Mobilne urządzenia są teraz obsługiwane poprawnie w zakładce
            <code className="highlight">INFORMACJE</code>i
            <code className="highlight">WIFI</code>
          </li>
        </ul>
      </article>
      <article className=" p-5 bg-background rounded-lg shadow-md ">
        <h3 className="text-2xl font-medium">v4.2.1</h3>

        <p className="text-sm text-slate-500 mb-6">Mar 27, 2023</p>
        <h2 className="text-xl border-b">Code</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
          <li>
            Dodano <code className="highlight">react-toastify</code>
            dla Toast notifications
          </li>
          <li>General code quality and performance</li>
        </ul>
        <h2 className="text-xl border-b">UI</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
          <li>
            Dodano
            <code className="highlight">Toast Notifikacje</code>po kliknieciu
            przycisku, aby użytkownik wiedział, że zostało wysłane zapytanie do
            serwera
          </li>
        </ul>
      </article>

      <article className=" p-5 bg-background rounded-lg shadow-md ">
        <h3 className="text-2xl font-medium">v4.2.0</h3>

        <p className="text-sm text-slate-500 mb-6">Mar 20, 2023</p>
        <h2 className="text-xl border-b">Code</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
          <li>
            Dodano <code className="highlight">@tanstack/react-query</code>dla
            lepszego data fetching and caching
          </li>
          <li>General code quality and performance</li>
        </ul>
        <h2 className="text-xl border-b">UI</h2>
        <ul className="mb-4 mt-2 list-disc pl-8">
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
      </article>
    </>
  )
}
