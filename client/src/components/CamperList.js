import React from 'react';
import  { useEffect, useState } from 'react';

function CamperList() {
  const [campers, setCampers] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch campers');
        return res.json();
      })
      .then((data) => setCampers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Campers</h2>
      <ul>
        {campers.map((camper) => (
          <li key={camper.id}>
            {camper.name} (Age {camper.age})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CamperList;
