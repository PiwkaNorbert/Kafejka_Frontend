import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.tsx'
import { IP_POWROZNICZA } from './constants.ts'
import PageNotFound from './pages/PageNotFound.tsx'
import Information from './pages/Information.tsx'
import LegimiCodes from './pages/LegimiCodes.tsx'
import TicketPage from './pages/TicketPage.tsx'
import Makulatura from './pages/Makulatura.tsx'
import WifiPerms from './pages/WifiPerms.tsx'
import ComputerPageMemo from './pages/ComputerPage.tsx'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog.tsx'
import { useEffect, useState } from 'react';
import { Button } from './components/ui/button.tsx';

function App() {
  const securityKey = window.location.pathname.split('/')[1];
  const url = `${IP_POWROZNICZA}:8005/${securityKey}/`;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if the update information has been shown to the user
    const updateShown = localStorage.getItem('updateShown');
    if (updateShown !== 'true') {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    // Set 'updateShown' to true in localStorage when the modal is closed
    localStorage.setItem('updateShown', 'true');
    setOpen(false);
  };


  return (
    <>
       <div className="App">
       <Dialog open={open} onOpenChange={handleClose}>
       
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold text-muted-foreground mb-6'>Szanowni Użytkownicy,</DialogTitle>
            <DialogDescription className='grid gap-4 text-lg'>
              <span className='indent-8'>
                Z przyjemnością informujemy, że szata graficzna aplikacji została nieco zmieniona, aby była bardziej przejrzysta i przyjazna dla użytkowników. Mamy nadzieję, że nowy wygląd przypadnie Wam do gustu i ułatwi korzystanie z aplikacji.
              </span>
              <span className='indent-8'>
              Zakładka <span className="text-primary font-semibold">"Zgłoszenia"</span> została stworzona z myślą o tym, aby umożliwić Wam zgłaszanie wszelkich zadań, które wymagają wsparcia działu informatyzacji na naszej filii. Dzięki tej funkcji możecie łatwo przekazywać swoje potrzeby i problemy, a także śledzić postęp ich realizacji w przejrzystej tabeli zawierającej wszystkie zgłoszone zadania.
              </span>
              <span className='indent-8'>
                Dziękujemy za zaufanie i zapraszamy do korzystania z nowych funkcji!
              </span>
              <span className="text-lg font-bold">Pozdrawiamy,<br/>
              Pracownia Informatyczna</span>
           
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="accent" onClick={handleClose}>
              Zamknij
            </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>

        <Router>
            <Routes>

             
                <Route path='/:securityKey/:curFilia' element={<PrivateRoute />} >
                  <Route
                    path="/:securityKey/:curFilia"
                    element={<Information />}
                      
                  />
                  {/* information route */}
                  <Route
                    path={`/:securityKey/:curFilia/informacje`}
                    element={<Information />}
                  />
                  {/* Computer route */}

                  <Route
                    path={`/:securityKey/:curFilia/kafejka`}
                    element={<ComputerPageMemo showComps={true} url={url} />}
                  />
                  {/* Settings route */}
                  <Route
                    path={`/:securityKey/:curFilia/ustawienia`}
                    element={<ComputerPageMemo showComps={false} url={url} />}
                  /> 
                  {/* Legimi route */}
                  <Route
                    path={`/:securityKey/:curFilia/ebooki`}
                    element={<LegimiCodes />}
                  />
                  <Route
                    path={`/:securityKey/:curFilia/zgloszenia`}
                    element={<TicketPage />}
                  />
                    <Route
                    path={`/:securityKey/:curFilia/makulatura`}
                    element={<Makulatura />}
                  />
                  {/* WifiPerms route */}
                  <Route
                    path={`/:securityKey/:curFilia/wifi`}
                    element={<WifiPerms url={url} />}
                  />
          
                </Route>
              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route path="404" element={<PageNotFound />} />
            </Routes>

        </Router>
    

      </div>
    </>
  )
}

export default App
