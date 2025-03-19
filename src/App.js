import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import WorkoutLog from './components/WorkoutLog';
import GoalsTracker from './components/GoalsTracker';
import './App.css'; // Import global styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/workout-log" element={<WorkoutLog />} />
            <Route path="/goals" element={<GoalsTracker />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



