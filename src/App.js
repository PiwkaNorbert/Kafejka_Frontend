import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Headers from './pages/Header';
import LegimiAdmin from './pages/LegimiCodes';
import ErrorCallback from './components/Errors/ErrorCallback';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import DarkModeButton from './components/DarkModeButton';
import { light } from '@mui/material/styles/createPalette';

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
    cssColorChanger('white', '#fff', '#000');
    cssColorChanger('table-row-even-color', '#fff', '#111');
    cssColorChanger('bg-slate-100', '#E2E8F', '#555');
    cssColorChanger('body-bg-color', '#eee', '#121212');
    cssColorChanger(
      'icon-fill-color-lm',
      'rgba(0, 0, 0, 0.6)',
      'rgba(255, 255, 255, 0.7)'
    );
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
