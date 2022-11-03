import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";

import "./App.css";
import Headers from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Headers />} />
          <Route path="/:compId" element={<Headers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
