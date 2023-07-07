import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Headers from './pages/Header';
import ErrorCallback from './components/Errors/ErrorCallback';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PageNotFound from './pages/pageNotFound';

const queryClient = new QueryClient();
const SecurityKeyLink = window.location.pathname.split('/');
const securityKey = SecurityKeyLink[1];

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export function App() {
  const colorMode = React.useContext(ColorModeContext);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <Routes>
            {securityKey.length === 64 ? (
              <Route
                path={`/${securityKey}/:curFilia`}
                exact
                element={
                  <Headers
                    securityKey={securityKey}
                    colorMode={colorMode}
                    errorElement={<ErrorCallback />}
                  />
                }
              />
            ) : (
              <>
                <Route path="*" element={<Navigate to="/404" replace />} />
                <Route path="404" element={<PageNotFound />} />
              </>
            )}
          </Routes>
        </Router>
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
