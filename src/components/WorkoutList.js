import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { fetchScheduledWorkouts } from "./workoutService";

const WorkoutList = ({ userId }) => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const getWorkouts = async () => {
            const data = await fetchScheduledWorkouts(userId);
            if (data) {
                setWorkouts([data]); // Store in state
            }
        };
        getWorkouts();
    }, []);

    return (
        <View>
            <Text>Scheduled Workouts:</Text>
            <FlatList
                data={workouts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text>{`Workout ID: ${item.workoutId}, Date: ${new Date(item.date).toDateString()}`}</Text>
                )}
            />
        </View>
    );
};

export default WorkoutList;
