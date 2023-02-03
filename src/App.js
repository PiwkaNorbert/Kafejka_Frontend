import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Headers from './pages/Header';
import LegimiAdmin from './pages/LegimiCodes';

// import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();
const SecurityKeyLink = window.location.pathname.split('/');
const securityKey = SecurityKeyLink[1];

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path={`${securityKey}`}
            exact
            element={<Headers securityKey={securityKey} />}
          />
          <Route
            path={`${securityKey}/:curFilia`}
            element={<Headers securityKey={securityKey} />}
          />
          <Route
            path={`${securityKey}/legimi_admin/`}
            element={<LegimiAdmin />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
