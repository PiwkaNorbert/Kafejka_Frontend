import React from 'react';
import { Box } from '@mui/system';
const ErrorCallback = ({ errorMsg }) => {
  const nav = document.querySelector('.css-4nt3dv');
  const navHeight = nav?.getBoundingClientRect()?.height;
  console.error(`Błąd: ${errorMsg}`);
  return (
    <Box
      className="error"
      sx={{
        height: '100vh',
        overflow: 'hidden',
        width: '100%',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: `${-navHeight}px `,
      }}
    >
      <div className="error__container">
        <h1 className="error__text--1">Nastąpił Błąd</h1>
        <p className="error__text--2">
          {errorMsg
            ? 'Błąd: ' + errorMsg
            : 'Proszę poczekać cierpliwie, próbujemy naprawić problem.'}
        </p>
      </div>
    </Box>
  );
};

export default ErrorCallback;
