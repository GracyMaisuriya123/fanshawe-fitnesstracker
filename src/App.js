import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import WorkoutRoutines from "./components/WorkoutRoutines";
import MessageBoard from "./components/MessageBoard";
import Insights from "./components/Insights";
import { auth } from './components/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import Challenges from './components/Challenges';
import GroupWorkouts from './components/GroupWorkouts';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Protected Route: Only allow access if user is logged in */}
        <Route
          path="/workout-routines"
          element={user ? <WorkoutRoutines user={user} /> : <h2>Please log in to access Workout Routines</h2>}
        />
        
        <Route path="/message-board" element={<MessageBoard />} />
        
        {/* New Routes for Social & Community Features */}
        
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/group-workouts" element={<GroupWorkouts />} />
        
        {/* Default route */}
        <Route path="*" element={<h2>Welcome to Fanshawe Fitness Tracker</h2>} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
      
    </Router>
  );
}

export default App;







