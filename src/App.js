import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Headers from './pages/Header';
import LegimiAdmin from './pages/LegimiCodes';

// import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();

const verificationCode =
  '34004b40a0ce84853b64700605d9694fb11e898c10d48878cc8773f21e0edb97';
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
