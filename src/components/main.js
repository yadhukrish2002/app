// Main.js

import React, { useState } from 'react';
import EmailVerification from './EmailVerification';
import PhoneVerification from './PhoneVerification';
import { useNavigate } from 'react-router-dom';
import { getemailGV,getphoneGV } from '../globelmodule';


function Main() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    // Check if all fields are filled and OTPs are verified
    if (name && dob && getemailGV() && getphoneGV()) {
        navigate('/pincode');
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

export default Main;
