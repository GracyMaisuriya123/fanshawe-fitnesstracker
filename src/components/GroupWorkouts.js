import React, { useState } from 'react';
import coachLisa from '../image/coach-lisa.jpg';
import coachMike from '../image/coachMike.jpeg';
import coachEmma from '../image/coach-emma.jpg';
import coachJohn from '../image/coach-john.jpg';
import coachSophia from '../image/coach-sophia.jpg';
import coachDaniel from '../image/coach-daniel.jpg';
import coachOlivia from '../image/coach-olivia.jpeg';
import coachJames from '../image/coach-james.jpg';
import coachAva from '../image/coach-ava.jpg';
import coachEthan from '../image/coach-ethan.jpg';

const GroupWorkouts = () => {
    const [scheduledWorkout, setScheduledWorkout] = useState(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [selectedCoach, setSelectedCoach] = useState(null);
    const [bookedCoaches, setBookedCoaches] = useState([]);

    const coaches = [
        { name: 'Coach Lisa', bio: 'Expert in strength training and fitness motivation.', workout: 'Strength Training', day: 'Monday', time: '5:00 PM', image: coachLisa },
        { name: 'Coach Mike', bio: 'Specialist in high-intensity interval training (HIIT).', workout: 'HIIT Workout', day: 'Wednesday', time: '6:00 PM', image: coachMike },
        { name: 'Coach Emma', bio: 'Yoga instructor, focusing on flexibility and mindfulness.', workout: 'Yoga Flow', day: 'Friday', time: '7:00 AM', image: coachEmma },
        { name: 'Coach John', bio: 'Endurance training expert and marathon coach.', workout: 'Endurance Training', day: 'Tuesday', time: '8:00 AM', image: coachJohn },
        { name: 'Coach Sophia', bio: 'Certified Pilates instructor with a passion for core strength.', workout: 'Pilates', day: 'Thursday', time: '10:00 AM', image: coachSophia },
        { name: 'Coach Daniel', bio: 'Strength and conditioning coach for all fitness levels.', workout: 'Weight Training', day: 'Saturday', time: '3:00 PM', image: coachDaniel },
        { name: 'Coach Olivia', bio: 'Zumba enthusiast and dance fitness instructor.', workout: 'Zumba', day: 'Monday', time: '7:30 PM', image: coachOlivia },
        { name: 'Coach James', bio: 'Kickboxing expert, helping you build power and endurance.', workout: 'Kickboxing', day: 'Wednesday', time: '5:30 PM', image: coachJames },
        { name: 'Coach Ava', bio: 'Cardio and endurance specialist, keeping workouts fun.', workout: 'Cardio Blast', day: 'Sunday', time: '9:00 AM', image: coachAva },
        { name: 'Coach Ethan', bio: 'CrossFit trainer, pushing you to your limits safely.', workout: 'CrossFit', day: 'Friday', time: '6:30 PM', image: coachEthan },
    ];

    const handleScheduleWorkout = (coach) => {
        setSelectedCoach(coach);
        setIsConfirming(true);
    };

    const handleConfirmBooking = () => {
        // Add selected coach to booked list
        setBookedCoaches((prevBookedCoaches) => [...prevBookedCoaches, selectedCoach]);
        setScheduledWorkout(`You have scheduled a workout with ${selectedCoach.name} on ${selectedCoach.day} at ${selectedCoach.time}.`);
        setIsConfirming(false);
    };

    const handleCancelBooking = () => {
        setIsConfirming(false);
    };

    const handleCancelConfirmedBooking = (coachName) => {
        // Remove coach from booked list based on the coach's name
        setBookedCoaches((prevBookedCoaches) => 
            prevBookedCoaches.filter(coach => coach.name !== coachName)
        );
        setScheduledWorkout(`${coachName}'s workout has been canceled.`);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Group Workouts</h2>
            {scheduledWorkout && <p style={styles.scheduleMessage}>{scheduledWorkout}</p>}

            <div style={styles.coachList}>
                {coaches.map((coach, index) => (
                    <div key={index} style={styles.coachCard}>
                        <img src={coach.image} alt={coach.name} style={styles.coachImage} />
                        <div style={styles.coachDetails}>
                            <h3 style={styles.coachName}>{coach.name}</h3>
                            <p style={styles.coachBio}>{coach.bio}</p>
                            <p><strong>Workout:</strong> {coach.workout}</p>
                            <p><strong>Schedule:</strong> {coach.day} at {coach.time}</p>
                            <button
                                onClick={() => handleScheduleWorkout(coach)}
                                style={styles.scheduleButton}
                            >
                                Schedule Workout
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isConfirming && (
                <div style={styles.confirmationModal}>
                    <h3>Confirm your booking</h3>
                    <p>Do you want to schedule the workout with {selectedCoach.name} on {selectedCoach.day} at {selectedCoach.time}?</p>
                    <button onClick={handleConfirmBooking} style={styles.confirmButton}>Confirm</button>
                    <button onClick={handleCancelBooking} style={styles.cancelButton}>Cancel</button>
                </div>
            )}

            <div style={styles.bookedList}>
                <h3>Your Booked Workouts</h3>
                {bookedCoaches.length === 0 ? (
                    <p>No workouts booked yet.</p>
                ) : (
                    bookedCoaches.map((coach, index) => (
                        <div key={index} style={styles.bookedCard}>
                            <p><strong>{coach.name}</strong> - {coach.workout}</p>
                            <p>{coach.day} at {coach.time}</p>
                            <button
                                onClick={() => handleCancelConfirmedBooking(coach.name)}
                                style={styles.cancelBookingButton}
                            >
                                Cancel Booking
                            </button>
                        </div>
                        
                    ))
                )}
            </div>
            <footer style={{ padding: "20px", textAlign: "center", backgroundColor: "#2E3A59", color: "#fff", fontSize: "16px", marginTop: "20px" }}>
        <p>&copy; 2025 Fanshawe Fitness. All Rights Reserved.</p>
        <p style={{ fontSize: "14px", opacity: 0.8 }}>Built with ❤️ by Gracy Maisuriya</p>
      </footer>
        </div>
        
    );
    
};


const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
        width: '80%',
        maxWidth: '1200px',
    },
    title: {
        textAlign: 'center',
        fontSize: '36px',
        color: '#e53935', // Red color for title
        marginBottom: '20px',
    },
    scheduleMessage: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#4CAF50',
        marginBottom: '20px',
    },
    coachList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    coachCard: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
    },
    coachImage: {
        width: '100%',
        height: '240px', // Rectangular shape for the image
        borderRadius: '8px',
        marginBottom: '3px',
        objectFit: 'cover',
    },
    coachDetails: {
        fontSize: '14px',
        color: '#333',
    },
    coachName: {
        fontSize: '20px',
        color: '#e53935', // Red color for coach name
        fontWeight: 'bold',
        margin: '10px 0',
    },
    coachBio: {
        fontStyle: 'italic',
        color: '#555',
        marginBottom: '10px',
    },
    scheduleButton: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#e53935', // Red button color
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    confirmationModal: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    confirmButton: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '10px',
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: '#FF6347', // Tomato red for cancel button
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '10px',
    },
    bookedList: {
        marginTop: '20px',
    },
    bookedCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '10px',
    },
    cancelBookingButton: {
        padding: '8px 16px',
        backgroundColor: '#FF6347', // Tomato red for cancel button
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        marginTop: '10px',
    },
};

export default GroupWorkouts;









