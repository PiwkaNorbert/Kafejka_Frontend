import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Headers from './pages/Header';
const ComputerPage = lazy(() => import('./pages/ComputerPage'));
const PageNotFound = lazy(() => import('./pages/pageNotFound'));
const TicketPage = lazy(() => import('./pages/TicketPage'));
const LegimiCodes = lazy(() => import('./pages/LegimiCodes'));
const Information = lazy(() => import('./pages/Information'));
const WifiPerms = lazy(() => import('./pages/WifiPerms'));

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});
const queryClient = new QueryClient();

export function App() {
  const securityKey = window.location.pathname.split('/')[1];
  const url = `http://192.168.200.37:8005/${securityKey}/`;

  const colorMode = React.useContext(ColorModeContext);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Headers securityKey={securityKey} colorMode={colorMode} url={url} />
          <Suspense
            fallback={
              <div className="layout-grid" style={{ marginTop: '10rem' }}>
                <CircularProgress className="loading-status" disableShrink />
              </div>
            }
          >
            <Routes>
              {securityKey?.length === 64 && (
                <>
                  <Route
                    path={`/${securityKey}/:curFilia`}
                    element={<Information />}
                    exact
                  />
                  {/* information route */}
                  <Route
                    path={`/${securityKey}/:curFilia/informacje`}
                    element={<Information />}
                  />
                  {/* Computer route */}

                  <Route
                    path={`/${securityKey}/:curFilia/kafejka`}
                    element={<ComputerPage showComps={true} url={url} />}
                  />
                  {/* Settings route */}
                  <Route
                    path={`/${securityKey}/:curFilia/ustawienia`}
                    element={<ComputerPage showComps={false} url={url} />}
                  />
                  {/* Legimi route */}
                  <Route
                    path={`/${securityKey}/:curFilia/ebooki`}
                    element={<LegimiCodes />}
                  />
                  {/* WifiPerms route */}
                  <Route
                    path={`/${securityKey}/:curFilia/wifi`}
                    element={<WifiPerms url={url} />}
                  />
                  {/* ticket route */}
                  <Route
                    path={`/${securityKey}/:curFilia/zgloszenia`}
                    element={<TicketPage />}
                  />
                </>
              )}
              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route path="404" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer
          position="bottom-right"
          pauseOnHover={true}
          newestOnTop={true}
          limit={3}
          autoClose={2000}
        />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = useState(
    localStorage.getItem('mode') === null
      ? 'light'
      : localStorage.getItem('mode')
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  function cssColorChanger(name, fromColor, toColor) {
    document.documentElement.style.setProperty(
      `--${name}`,
      `${mode === 'light' ? fromColor : toColor}`
    );
  }
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App colorModese={colorMode} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
