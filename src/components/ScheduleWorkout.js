import { useState } from "react";
import { View, Button, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const ScheduleWorkout = ({ onSchedule }) => {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    return (
        <View>
            <Button title="Pick a Date" onPress={() => setShowPicker(true)} />
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowPicker(false);
                        if (selectedDate) setDate(selectedDate);
                    }}
                />
            )}
            <Text>Selected Date: {date.toDateString()}</Text>
            <Button title="Schedule Workout" onPress={() => onSchedule(date)} />
        </View>
    );
};

export default ScheduleWorkout;
