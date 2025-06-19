import React from 'react';
import './App.css';
import CamperForm from './components/CamperForm';
import CamperList from './components/CamperList';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';

function App() {
  return (
    <div className="App">
      <h1>Camp Activity Manager</h1>
      <CamperForm />
      <CamperList />
      <ActivityForm />
      <ActivityList />
    </div>
  );
}

export default App;
