import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';

import './App.css';
import Headers from './pages/Header';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
