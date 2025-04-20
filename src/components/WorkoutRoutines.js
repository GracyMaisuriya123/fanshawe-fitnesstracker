import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import workout1 from "./videos/workout-1.mp4";
import workout2 from "./videos/workout-2.mp4";
import workout3 from "./videos/workout-3.mp4";
import workout4 from "./videos/workout-4.mp4";
import workout5 from "./videos/workout-5.mp4";

const WorkoutRoutines = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filterLevel, setFilterLevel] = useState("Beginner");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [scheduledWorkouts, setScheduledWorkouts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const q = query(collection(db, "workoutRoutines"), where("level", "==", filterLevel));
        const querySnapshot = await getDocs(q);
        const workoutsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWorkouts(workoutsList);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [filterLevel]);

  useEffect(() => {
    if (user) {
      const fetchScheduledWorkouts = async () => {
        try {
          const q = query(collection(db, "schedules"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const scheduledList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setScheduledWorkouts(scheduledList);
        } catch (error) {
          console.error("Error fetching scheduled workouts:", error);
        }
      };

      fetchScheduledWorkouts();
    }
  }, [user]);

  const handleScheduleWorkout = async (workout) => {
    if (!user) {
      alert("You must be logged in to schedule a workout.");
      return;
    }

    if (!selectedDateTime) {
      alert("Please select a date and time for scheduling.");
      return;
    }

    const confirmScheduling = window.confirm(`Do you want to schedule the workout for ${selectedDateTime}?`);

    if (confirmScheduling) {
      try {
        const scheduleDate = new Date(selectedDateTime);
        const scheduleData = {
          workoutId: workout.id,
          name: workout.name,
          date: Timestamp.fromDate(scheduleDate),
          level: workout.level,
          userId: user.uid,
        };

        // Check if the same workout is already scheduled for the user
        const existingScheduleQuery = query(
          collection(db, "schedules"),
          where("userId", "==", user.uid),
          where("workoutId", "==", workout.id),
          where("date", "==", Timestamp.fromDate(scheduleDate))
        );
        const existingScheduleSnapshot = await getDocs(existingScheduleQuery);
        
        if (!existingScheduleSnapshot.empty) {
          alert("You already have this workout scheduled for this time.");
          return;
        }

        await addDoc(collection(db, "schedules"), scheduleData);
        alert("Workout scheduled successfully!");
      } catch (error) {
        console.error("Error scheduling workout:", error);
        alert("There was an error scheduling your workout.");
      }
    } else {
      alert("Scheduling canceled!");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ padding: "20px", backgroundColor: "#2E3A59", color: "#fff", textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "bold" }}>Workout Routines</h2>
        <label style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px", display: "block" }}>Filter by Level:</label>
        <select
          onChange={(e) => setFilterLevel(e.target.value)}
          value={filterLevel}
          style={{ padding: "10px", borderRadius: "5px", width: "200px", fontSize: "16px" }}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Workout Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", padding: "20px", maxWidth: "1600px", margin: "0 auto" }}>
        {workouts.map((workout) => (
          <div key={workout.id} style={{ background: "#FF6347", padding: "25px", borderRadius: "12px", boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)", width: "500px", color: "#fff", textAlign: "center" }}>
            <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "15px" }}>{workout.name}</h3>
            <p>{workout.description}</p>
            <p style={{ fontWeight: "bold" }}>Duration: {workout.duration}</p>
            {workout.exercises && Object.keys(workout.exercises).length > 0 ? (
              <div>
                {Object.keys(workout.exercises).map((key, index) => {
                  const exercise = workout.exercises[key];
                  return (
                    <div key={index} style={{ background: "#fff", padding: "15px", marginBottom: "10px", borderRadius: "8px", color: "#FF6347" }}>
                      <h4>{exercise.name}</h4>
                      <p>{exercise.description}</p>
                      <p><strong>Sets:</strong> {exercise.sets} <strong>Reps:</strong> {exercise.reps}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No exercises available</p>
            )}
            <input type="datetime-local" value={selectedDateTime} onChange={(e) => setSelectedDateTime(e.target.value)} style={{ width: "100%", padding: "10px", marginTop: "10px" }} />
            <button onClick={() => handleScheduleWorkout(workout)} style={{ marginTop: "10px", padding: "12px", background: "#fff", color: "#FF6347", borderRadius: "5px", width: "100%", fontWeight: "bold" }}>
              Schedule Workout
            </button>
          </div>
        ))}
      </div>

      {/* Workout Tutorials */}
      <h4 style={{ marginTop: "40px", textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>Workout Tutorials</h4>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        {[workout1, workout2, workout3, workout4, workout5].map((video, index) => (
          <video key={index} width="400" height="220" controls>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ padding: "20px", textAlign: "center", backgroundColor: "#2E3A59", color: "#fff", fontSize: "16px", marginTop: "20px" }}>
        <p>&copy; 2025 Fanshawe Fitness. All Rights Reserved.</p>
        <p style={{ fontSize: "14px", opacity: 0.8 }}>Built with ❤️ by Gracy Maisuriya</p>
      </footer>
    </div>
  );
};

export default WorkoutRoutines;






















