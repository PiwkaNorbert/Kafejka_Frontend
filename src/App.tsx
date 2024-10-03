import './App.css'
import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import LazyRoutes from './pages/LazyRoutes.tsx'
// import Dystrybucja from './pages/Dystrybucja.tsx'

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from './components/ui/dialog.tsx'
// import { useEffect, useState } from 'react';
// import { Button } from './components/ui/button.tsx';

function App() {
  // const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   // Check if the update information has been shown to the user
  //   const updateShown = localStorage.getItem('updateShown');
  //   if (updateShown !== 'true') {
  //     setOpen(true);
  //   }
  // }, []);

  // const handleClose = () => {
  //   // Set 'updateShown' to true in localStorage when the modal is closed
  //   localStorage.setItem('updateShown', 'true');
  //   setOpen(false);
  // };

  return (
    <>
      <div className="App">
        {/* <Dialog open={open} onOpenChange={handleClose}>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className='text-2xl font-bold text-muted-foreground mb-6'>Szanowni Użytkownicy,</DialogTitle>
              <DialogDescription className='grid gap-4 text-lg'>
                <span className='indent-8'>
                W nagłówku naszej strony dodaliśmy nową zakładkę <span className="text-primary font-semibold">"Dystrybucja"</span>. Zakładka "Dytrybucja" ma na celu zastąpienie arkuszy Google, umożliwiając aktualizację ilości makulatury na filii oraz ilości pudła z filii. Dodatkowo dział gospodarczy będzie mógł dodawać więcej "Arkuszy", dostosowując je do aktualnych potrzeb. W sekcji "Dystrybucja" znajduje się również tabela, w której można przeglądać wszystkie zgłoszone ilości makulatury, pudła oraz inne dane, co pozwala na śledzenie ich statusu.
                </span>
                <span className='indent-8'>
                  Dziękujemy za zaufanie i zapraszamy do korzystania z nowych funkcji!
                </span>
                <span className="text-lg font-bold">Pozdrawiamy,<br />
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
        </Dialog> */}

        <Router>
          <Routes>
            <Route
              path="/:securityKey/:curFilia/*"
              element={
                <PrivateRoute>
                  <Suspense fallback={<></>}>
                    <LazyRoutes />
                  </Suspense>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/404" replace />} />
            <Route path="404" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
