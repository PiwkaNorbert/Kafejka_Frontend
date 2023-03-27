import React from 'react';
import ReactDOM from 'react-dom/client';
import ToggleColorMode from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToggleColorMode />
  </React.StrictMode>
);
export default class PersonAdd extends React.Component {}
