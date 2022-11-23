import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Headers from './pages/Header';
import LegimiAdmin from './pages/LegimiCodes';

// import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path={`${verificationCode}`}
            exact
            element={<Headers verificationCode={verificationCode} />}
          />
          <Route
            path={`${verificationCode}/:curFilia`}
            element={<Headers verificationCode={verificationCode} />}
          />
          <Route
            path={`${verificationCode}/legimi_admin/`}
            element={<LegimiAdmin verificationCode={verificationCode} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
