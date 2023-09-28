// App.js

import React from 'react';
import './App.css';
import Main from './components/main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PincodeLookup from './components/PincodeLookup';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/pincode" element={<PincodeLookup />} />
      </Routes>
    </Router>
  );
}

export default App;
