
import { ReactNode, createContext, useReducer } from "react";
import * as React from 'react';

export type ThemeContextType = {
  handleToggleTheme: (theme: "light" | "dark") => void;
  theme: "light" | "dark";
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type Props = { children: ReactNode }
type State = { theme: "light" | "dark" }
type Action = { type: 'TOGGLE_THEME'; theme: "light" | "dark" };

function reducer(state: State, action: Action) {

  if (action.type === 'TOGGLE_THEME') {
    const storageTheme = localStorage.getItem('theme');
    if (!storageTheme) return { ...state, theme: action.theme }
      const theme = JSON.parse(storageTheme);
    
    if (theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', JSON.stringify(action.theme));
    return { ...state, theme: action.theme }

  } else {
    throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const ThemeProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, { theme : 'light' });

  
  React.useEffect(() => {
    const storageTheme = localStorage.getItem('theme');
    if (storageTheme) {
      const theme = JSON.parse(storageTheme);
      dispatch({ type: 'TOGGLE_THEME', theme });
    }
  }, []);

  const handleToggleTheme = (theme: "light" | "dark"): void =>
  {
    console.log(theme);
    
    return dispatch({ type: 'TOGGLE_THEME', theme });
  }



  return (
    <ThemeContext.Provider value={{handleToggleTheme, theme: state.theme }} >
      {children}
    </ThemeContext.Provider>
  )
}