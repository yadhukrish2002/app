// PincodeLookup.js

import React, { useState } from 'react';

const PincodeLookup = () => {
    const [pincode, setPincode] = useState("");
    const [details, setDetails] = useState({});
    const [error, setError] = useState("");
  
    const handlePincodeChange = (e) => {
      setPincode(e.target.value);
    };
  
    const fetchDetails = () => {
      if (!pincode) {
        setError("Please enter a pincode.");
        console.log('Please enter a pincode.');
        setDetails({});
        return;
      }
  
      // Send a GET request to the India Post API
      fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data[0].Status === "Error") {
            setError("Invalid pincode. Please try another one.");
            setDetails({});
          } else {
            setError("");
            setDetails({
              city: data[0].PostOffice[0].Block,
              district: data[0].PostOffice[0].District,
              state: data[0].PostOffice[0].State,
              postal: data[0].PostOffice[0].Pincode,
            });
          }
        })
        .catch((error) => {
          setError("An error occurred while fetching data.");
          setDetails({});
        });
    };
  
    return (
      <div className="con">
              <label htmlFor="pincode">Enter Pincode:</label><br /><br />
              <input
              type="text"
              id="pincode"
              value={pincode}
              onChange={handlePincodeChange}
              /><br /><br />
              <button onClick={fetchDetails}>Retrieve Details</button><br />
          {error && <p>{error}</p>}
          {details.city && <p>City: {details.city}</p>}
          {details.district && <p>District: {details.district}</p>}
          {details.state && <p>State: {details.state}</p>}
          {details.postal && <p>Postal Code: {details.postal}</p>}
      </div>
    );
  };

export default PincodeLookup;
