import React from 'react';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function DarkModeButton() {
  const [mode, setMode] = React.useState(
    localStorage.getItem('mode') === null
      ? 'light'
      : localStorage.getItem('mode')
  );

  function handleLocalStorage() {
    if (mode === 'dark') {
      localStorage.setItem('mode', 'light');
      setMode('light');
    } else {
      localStorage.setItem('mode', 'dark');
      setMode('dark');
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
