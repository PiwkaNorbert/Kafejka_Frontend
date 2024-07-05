import * as React from 'react';

import { Moon, Sun } from 'lucide-react';

export default function DarkModeButton() {
  const [mode, setMode] = React.useState<string>();

  React.useEffect(() => {
    const localMode = localStorage.getItem('mode');
    if (localMode) {
      setMode(localMode);
    } else {
      setMode('light');
    }
  }, []);

  const handleLocalStorage = () => {
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
      onClick={handleLocalStorage}
    >
      {mode === 'light' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
