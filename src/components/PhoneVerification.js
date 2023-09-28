import React, { useState } from 'react';
import axios from 'axios';
import { setphoneGV } from '../globelmodule';

function PhoneVerification() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');
    const [isPhoneOTPVisible, setIsPhoneOTPVisible] = useState(false);
  
    const sendVerificationCode = () => {
      // Send a POST request to the server to request a verification code via Twilio
      axios
        .post('http://localhost:3001/send-verification-code', { phoneNumber })
        .then((response) => {
          if (response.data.success) {
            setVerificationStatus('Verification code sent successfully!');
          } else {
            setVerificationStatus('Failed to send verification code. Please try again.');
          }
        })
        .catch((error) => {
          console.error('Error sending verification code:', error);
          setVerificationStatus('Error sending verification code.');
        });
        setIsPhoneOTPVisible(true);
    };
  
    const verifyPhoneNumber = () => {
      // Send a POST request to the server to verify the phone number using Twilio
      axios
        .post('http://localhost:3001/verify-phone-number', { phoneNumber, verificationCode })
        .then((response) => {
          if (response.data.success) {
            setphoneGV(true);
            setVerificationStatus('Phone number verified! You are now authenticated.');
          } else {
            setVerificationStatus('Invalid verification code. Please try again.');
          }
        })
        .catch((error) => {
          console.error('Error verifying phone number:', error);
          setVerificationStatus('Error verifying phone number.');
        });
    };
  
    return (
      <div className="App">
        <div>
          <label>Phone Number:</label><br />
          <input type="tel" placeholder='enter phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div><br />
        {isPhoneOTPVisible ? (
            <div>
            <label>Verification Code:</label><br />
            <input type="text" placeholder='enter code' value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} /><br />
            <button onClick={verifyPhoneNumber}>Verify Phone Number</button>
          </div>
        ) : (
            <button onClick={sendVerificationCode}>Send Verification Code</button>
        )}
        <div>
          <p>{verificationStatus}</p>
        </div>
      </div>
    );
}

export default PhoneVerification;
