import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Headers from './pages/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PageNotFound from './pages/pageNotFound';
import ComputerPage from './pages/ComputerPage';
import LegimiCodes from './pages/LegimiCodes';
import { Information } from './pages/Information';
import WifiPerms from './pages/WifiPerms';
import TicketPage from './pages/TicketPage';

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
