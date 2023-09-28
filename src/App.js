// App.js

import React, { useState } from 'react';
import './App.css';
import EmailVerification from './components/EmailVerification';
import PhoneVerification from './components/PhoneVerification';
import PincodeLookup from './components/PincodeLookup';

function App() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = () => {
    // Check if all fields are filled and OTPs are verified
    if (name && dob) {
      alert(`Welcome, ${name}`);
    } else {
      alert('Please fill in all fields and verify OTPs.');
    }
  };

  return (
    <div className="App">
      <h1>User Registration</h1>
      <div className="registration-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <PhoneVerification  /><br />
        <EmailVerification  /><br />
        <PincodeLookup /><br />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        /><br /><br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
