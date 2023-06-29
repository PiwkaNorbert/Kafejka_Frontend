import React from 'react';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function DarkModeButton({ colorMode }) {
  const [mode, setMode] = React.useState(
    localStorage.getItem('mode') === null
      ? 'light'
      : localStorage.getItem('mode')
  );

  function handleLocalStorage() {
    if (mode === 'dark') {
      localStorage.setItem('mode', 'light');
      setMode('light');
      colorMode.toggleColorMode();
    } else {
      localStorage.setItem('mode', 'dark');
      setMode('dark');
      colorMode.toggleColorMode();
    }
  }
  return (
    <button
      className="darkmode-bg"
      onClick={e => {
        e.preventDefault();
        handleLocalStorage();
      }}
    >
      {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  );
}
