import React, { useState } from 'react';
import axios from 'axios';

function EmailVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [isEmailOTPVisible, setIsEmailOTPVisible] = useState(false);

  const sendOTP = () => {
    // Send a POST request to the server to request OTP
    axios
      .post('http://localhost:3001/generate-and-send-otp', { email }) // Use the complete URL
      .then((response) => {
        if (response.data.success) {
          setVerificationStatus('OTP sent successfully!');
        } else {
          setVerificationStatus('Failed to send OTP. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        setVerificationStatus('Error sending OTP.');
      });
      setIsEmailOTPVisible(true);
  };

  const verifyOTP = () => {
    // Send a POST request to the server to verify OTP
    axios
      .post('http://localhost:3001/verify-otp', { email, otp }) // Use the complete URL
      .then((response) => {
        if (response.data.success) {
          setVerificationStatus('OTP Verified! You are now authenticated.');
        } else {
          setVerificationStatus('Invalid OTP. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error verifying OTP:', error);
        setVerificationStatus('Error verifying OTP.');
      });
  };

  return (
    <div className="App">
      <div>
        <label>Email:</label><br />
        <input type="email" placeholder='enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div><br />
      {isEmailOTPVisible ? (
        <div><label>OTP:</label><br />
        <input type="text" placeholder='enter otp' value={otp} onChange={(e) => setOtp(e.target.value)} /><br />
        <button onClick={verifyOTP}>Verify OTP</button>
        <br /></div>
      ):(
        <button onClick={sendOTP}>Send OTP</button>
      )}
      <div>
        <p>{verificationStatus}</p>
      </div>
    </div>
  );
}

export default EmailVerification;
