import React from 'react';
import { useEffect, useState } from 'react';

function ActivityList() {
  const [activities, setActivities] = useState([]);

  function loadActivities() {
    fetch('http://127.0.0.1:5555/activities')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch activities');
        return res.json();
      })
      .then((data) => setActivities(data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    loadActivities();
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:5555/activities/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete activity');
        loadActivities();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name} (Difficulty: {activity.difficulty})
            <button onClick={() => handleDelete(activity.id)}> Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityList;
