import { View } from "react-native";
import ScheduleWorkout from "./ScheduleWorkout";
import WorkoutList from "./WorkoutList";
import { saveScheduledWorkout } from "./workoutService";

const userId = "user123"; // Replace with actual user ID

const ScheduleScreen = () => {
    const handleSchedule = async (date) => {
        await saveScheduledWorkout(userId, "workout_001", date);
    };

    return (
        <View>
            <ScheduleWorkout onSchedule={handleSchedule} />
            <WorkoutList userId={userId} />
        </View>
    );
};

export default ScheduleScreen;
