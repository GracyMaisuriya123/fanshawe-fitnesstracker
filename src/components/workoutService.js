import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Firebase config

export const saveScheduledWorkout = async (userId, workoutId, date) => {
    try {
        await setDoc(doc(db, "scheduledWorkouts", `${userId}_${workoutId}`), {
            workoutId,
            date: date.toISOString(),
        });
        alert("Workout scheduled successfully!");
    } catch (error) {
        console.error("Error scheduling workout: ", error);
    }
};

export const fetchScheduledWorkouts = async (userId) => {
    const docRef = doc(db, "scheduledWorkouts", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
};
