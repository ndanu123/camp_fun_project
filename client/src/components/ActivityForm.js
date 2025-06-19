import React from 'react'

import { useState } from 'react';

function ActivityForm() {
  const [camperId, setCamperId] = useState('');
  const [activityId, setActivityId] = useState('');
  const [time, setTime] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://127.0.0.1:5555/signups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        camper_id: parseInt(camperId),
        activity_id: parseInt(activityId),
        time: parseInt(time),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to sign up');
        }
        return res.json();
      })
      .then(() => {
        setCamperId('');
        setActivityId('');
        setTime('');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up for Activity</h2>
      <input placeholder="Camper ID" value={camperId} onChange={(e) => setCamperId(e.target.value)} required />
      <input placeholder="Activity ID" value={activityId} onChange={(e) => setActivityId(e.target.value)} required />
      <input type="number" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default ActivityForm;
