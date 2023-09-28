// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// In-memory data store for OTPs
const otpStore = new Map();
const verificationCodes = new Map();

// Generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

//email verification

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: 'yadhukrish2002@gmail.com', // mail from
    pass: 'axgiuilaaachidna', // password
  },
});

// Send OTP via email
function sendOTP(email, otp) {
  const mailOptions = {
    from: 'yadhukrish2002@gmail.com', // from email
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
    }
  });
}

// Generate and send OTP
app.post('/generate-and-send-otp', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const otp = generateOTP();
  otpStore.set(email, otp);

  // Send OTP via email
  sendOTP(email, otp);

  res.json({ success: true, message: 'OTP sent successfully' });
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }

  const storedOTP = otpStore.get(email);
  if (!storedOTP || parseInt(otp) !== storedOTP) {
    return res.json({ success: false, message: 'Invalid OTP' });
  }

  // Clear the OTP from the store after successful verification
  otpStore.delete(email);

  res.json({ success: true, message: 'OTP Verified' });
});



// Phone verification

// Twilio credentials (replace with your own)
const twilioAccountSid = 'AC5b19ae981bc7cd944f04f7492275008c';
const twilioAuthToken = 'e6ad5e877302143825a246decfc35a0c';
const twilioPhoneNumber = '+12564484928';

const client = twilio(twilioAccountSid, twilioAuthToken);

function generateVerificationCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

// Send verification code via SMS using Twilio
function sendVerificationCode(phoneNumber, code) {
  client.messages
    .create({
      body: `Your verification code is: ${code}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    })
    .then((message) => {
      console.log('Verification code sent');
    })
    .catch((error) => {
      console.error('Error sending verification code via Twilio:', error);
    });
}

// Send a verification code to the provided phone number
app.post('/send-verification-code', (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  const verificationCode = generateVerificationCode();
  verificationCodes.set(phoneNumber, verificationCode);

  // Send verification code via Twilio
  sendVerificationCode(phoneNumber, verificationCode);

  res.json({ success: true, message: 'Verification code sent successfully' });
});

// Verify the provided verification code
app.post('/verify-phone-number', (req, res) => {
  const { phoneNumber, verificationCode } = req.body;
  if (!phoneNumber || !verificationCode) {
    return res.status(400).json({ success: false, message: 'Phone number and verification code are required' });
  }

  const storedCode = verificationCodes.get(phoneNumber);
  if (!storedCode || parseInt(verificationCode) !== storedCode) {
    return res.json({ success: false, message: 'Invalid verification code' });
  }

  // Clear the verification code from the store after successful verification
  verificationCodes.delete(phoneNumber);

  res.json({ success: true, message: 'Phone number verified' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});