// src/frontend/components/Membership.js
import React, { useState } from 'react';
import axios from 'axios';

function Membership() {
  const [plan, setPlan] = useState('free');
  const [status, setStatus] = useState('');

  const handleSubscription = async () => {
    const userId = '123'; // Example user ID
    try {
      const response = await axios.post('/membership/subscribe', { plan, userId });
      setStatus(response.data.message);
    } catch (error) {
      setStatus('Error subscribing to the plan. Try again later.');
    }
  };

  return (
    <div>
      <h2>Select Membership Plan</h2>
      <select value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="free">Free Plan</option>
        <option value="basic">$5/month - 1 post per day</option>
        <option value="pro">$10/month - 2 posts per day</option>
        <option value="premium">$14/month - 3 posts per day</option>
      </select>
      <button onClick={handleSubscription}>Subscribe</button>
      <p>{status}</p>
    </div>
  );
}

export default Membership;
