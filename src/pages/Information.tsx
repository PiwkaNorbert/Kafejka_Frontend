import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

export default function Information() {
  return (
    <>
      <article className=" p-5 bg-background rounded-lg shadow-md ">
        <h3 className="text-2xl font-medium">Jak posługiwać się kafejką</h3>

        <p className="text-sm text-slate-500 mb-6 ">Mar 20, 2023</p>
        <a
          className="text-blue-500 hover:underline"
          href="url:https://moodlebkr.biblioteka.krakow.pl/course/view.php?id=146"
        >
          Kliknij tutaj
        </a>
      </article>
      {/* <code className="highlight"> </code>*/}

      {changelogData.map((entry, index) => (
        <ChangelogEntry key={index} version={entry.version} date={entry.date} sections={entry.sections} />
      ))}
    </>
  )
}
const changelogData = [
  {
    version: 'v5.0.0',
    date: 'Lipiec 4, 2024',
    sections: [
      {
        title: 'Code',
        items: [
          'Zmiana z <br/><code class="highlight">JavaScript</code>&rarr;<code class="highlight">TypeScript</code>',
          'Code refactoring i optymalizacja',
        ],
      },
      {
        title: 'Interface użytkownika',
        items: [
          'Interfejs naszej strony został zaktualizowany, aby był bardziej przyjazny użytkownikowi i przejrzysty. Poprawiliśmy układ strony, co ułatwia nawigację i sprawia, że znalezienie potrzebnych informacji oraz usług jest jeszcze prostsze.',
          'W nagłówku naszej strony dodaliśmy nową zakładkę <code class="highlight">Zgłoszenia</code>. Ta zakładka jest specjalnie zaprojektowana, aby umożliwić Państwu zgłaszanie błędów i propozycji zmian w aplikacji na bieżąco. W sekcji "Zgłoszenia" znajduje się również tabela, w której można przeglądać wszystkie zgłoszone problemy i propozycje zmian, co pozwala na śledzenie ich statusu w sposób przejrzysty i zorganizowany.',
        ],
      },
    ],
  },
  {
    version: "v4.3.3",
    date: "Październik 19, 2023",
    sections: [
      {
        title: "Code",
        items: [
          "Dodanie <code class='highlight'>signal</code> w <code class='highlight'>useComputerData</code>, aby moc anulowac zapytanie do serwera przy zmianach na komputerach (np. zmiana stanu)",
          "Dodanie <code class='highlight'>routes</code> w <code class='highlight'>App.jsx</code> aby moc zmieniac zakładki w poprawny sposob"
        ]
      },
      {
        title: "Interface użytkownika",
        items: [
          "Zmiana nazwy przycisku <code class='highlight'>Zablokowany</code>&rarr;<code class='highlight'>Odblokuj</code><br /><code class='highlight'>Odblokowany</code>&rarr;<code class='highlight'>Zablokuj</code> w zakładce KAFEJKA",
          "Usuniecie slowo stan obok przycisku <code class='highlight'>Odblokuj / Zablokuj</code>"
        ]
      }
    ]
  },

  {
    version: "v4.3.2",
    date: "Wrzesień 9, 2023",
    sections: [
      {
        title: "Code & Interface użytkownika",
        items: [
          "Zegar odlicza czas poprawnie i już nie znika po odświeżeniu strony/danych po kliknieciu przycisku <code class='highlight'>Wyłącz za</code>."
        ]
      }
    ]
  },
  {
    version: "v4.3.1",
    date: "Lipiec 5, 2023",
    sections: [
      {
        title: "Code",
        items: [
          "Zmiany <code class='highlight'>queryClient.invalidateQueries</code> z <code class='highlight'>onSuccess</code> na <code class='highlight'>onSettled</code> w <code class='highlight'>useMutation</code> aby nie było duplikatów w cache przy zmianie stanu komputera"
        ]
      },
      {
        title: "Interface użytkownika",
        items: [
          "Interfejs sam sie aktualizuje po jakiej kolwiek zmienie w bazie",
          "Zmiana pola <code class='highlight'>Input</code> na <code class='highlight'>Select</code> w Kafejce obok przycisku (Wyłącz za)"
        ]
      }
    ]
  },
  {
    version: "v4.3",
    date: "Czerwiec 30, 2023",
    sections: [
      {
        title: "Code",
        items: [
          "Ogromny <code class='highlight'>Refactor</code>",
          "General code quality and performance"
        ]
      },
      {
        title: "Interface użytkownika",
        items: [
          "Dodano <code class='highlight'>Toast Notifikacje</code> tak aby działały poprawnie, i bez duplikatów",
          "Dodano <code class='highlight'>useMutation</code> i <code class='highlight'>axios</code>",
          "Dodano <code class='highlight'>Cachowanie</code> aby nie było trzeba pobierac danych za każdym razem gdy zmienimy zakładkę (np. z WIFI na INFORMACJE) i wrócimy z powrotem na WIFI",
          "Dodano <code class='highlight'>Licznik czasu pozostałęgo na stanowisku w czasie rzeczywistym</code>",
          "Optymalizacja kodu i poprawa wydajności"
        ]
      }
    ]
  },
  {
    version: "v4.2.2",
    date: "Kwi 6, 2023",
    sections: [
      {
        title: "Code",
        items: [
          "Link do szkolenia <code class='highlight'>KLIKNIJ TUTAJ</code> został naprawiony",
          "Theme managment w CSS"
        ]
      },
      {
        title: "Interface użytkownika",
        items: [
          "Mobilne urządzenia są teraz obsługiwane poprawnie w zakładce <code class='highlight'>INFORMACJE</code> i <code class='highlight'>WIFI</code>"
        ]
      }
    ]
  },
  {
    version: "v4.2.1",
    date: "Mar 27, 2023",
    sections: [
      {
        title: "Code",
        items: [
          "Dodano <code class='highlight'>react-toastify</code> dla Toast notifications",
          "General code quality and performance"
        ]
      },
      {
        title: "Interface użytkownika",
        items: [
          "Dodano <code class='highlight'>Toast Notifikacje</code> po kliknieciu przycisku, aby użytkownik wiedział, że zostało wysłane zapytanie do serwera"
        ]
      }
    ]
  },
  {
    version: "v4.2.0",
    date: "Mar 20, 2023",
    sections: [
      {
        title: "Code",
        items: [
          "Dodano <code class='highlight'>@tanstack/react-query</code> dla lepszego data fetching and caching",
          "General code quality and performance"
        ]
      },
      {
        title: "Interface użytkownika",
        items: [
          "Dodano zakładke <code class='highlight'>INFORMACJE</code> w której jest link do szkolenia z tej aplikacji i <code class='highlight'>CHANGELOG</code> aby prowadzic zmiany",
          "Zmiana nazwy zakładki <code class='highlight'>KOMPUTERY</code>&rarr;<code class='highlight'>KAFEJKA</code>",
          "Zmiana wyglądu kafejki",
          "Dodano <code class='highlight'>Licznik Czasu</code> do komputerów"
        ]
      }
    ]
  }
];


interface ChangelogSection {
  title: string;
  items: string[];
}

interface ChangelogEntryProps {
  version: string;
  date: string;
  sections: ChangelogSection[];
}

const ChangelogEntry: React.FC<ChangelogEntryProps> = ({ version, date, sections }) => {
  return (
    <article className="p-5 bg-background rounded-lg shadow-md">
      <h3 className="text-2xl font-medium">{version}</h3>
      <p className="text-sm text-slate-500 mb-2">{date}</p>
      {sections.map((section, index) => (
        <div key={index}>
          <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-muted-foreground text-xl">{section.title}</AccordionTrigger>
                <AccordionContent>
                <ul className="list-disc pl-8 text-base">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
                </AccordionContent>
              </AccordionItem>
          </Accordion>
        </div>
      ))}
    </article>
  );
};