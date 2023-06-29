import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Headers from './pages/Header';
import LegimiAdmin from './pages/LegimiCodes';
import ErrorCallback from './components/Errors/ErrorCallback';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
            <Route
              path={`${securityKey}`}
              exact
              element={
                <Headers
                  securityKey={securityKey}
                  colorMode={colorMode}
                  errorElement={<ErrorCallback />}
                />
              }
            />
            <Route
              path={`${securityKey}/:curFilia`}
              element={
                <Headers securityKey={securityKey} colorMode={colorMode} />
              }
            />
            <Route
              path={`${securityKey}/legimi_admin/`}
              element={<LegimiAdmin />}
            />
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
