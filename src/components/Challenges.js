import React, { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig'; // Import Firebase auth and db
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import gym from '../image/gym.jpg';
import gymvideo from './videos/gym.mp4';

const badgeLevels = [
    "🏅 Rookie Warrior",
    "🔥 Fitness Enthusiast",
    "💪 Strength Seeker",
    "🏆 Champion Beast",
    "🎖️ Ultimate Legend"
];

const Challenges = () => {
    const [user, setUser ] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [streak, setStreak] = useState(0);
    const [badges, setBadges] = useState([]);
    const [reward, setReward] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser (user);
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setStreak(userData.streak || 0);
                    setBadges(userData.badges || []);
                    setProgress(userData.progress || 0);
                    setReward(userData.reward || false);
                    setCompleted(userData.progress >= 5); // Check if challenge is completed
                }
            } else {
                setUser (null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleProgress = async () => {
        if (progress < 5) {
            const newProgress = progress + 1;
            setProgress(newProgress);
            if (newProgress === 5) {
                setCompleted(true);
                const newStreak = streak + 1;
                setStreak(newStreak);

                // Add new badge
                const newBadge = badgeLevels[Math.min(newStreak - 1, badgeLevels.length - 1)];
                const newBadges = [...badges, newBadge];
                setBadges(newBadges); // Update badges state

                if (newStreak >= 5) setReward(true);
            }

            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    streak,
                    badges: [...badges, badgeLevels[Math.min(streak, badgeLevels.length - 1)]], // Save updated badges
                    progress: newProgress,
                    reward: reward,
                }, { merge: true });
            }
        }
    };

    const handleNewWorkout = async () => {
        setCompleted(false); // Reset challenge completion
        setProgress(0); // Reset progress

        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                progress: 0,
                streak: streak, // Keep the streak intact
                badges: badges, // Keep the badges earned
                reward: reward, // Keep reward status
            }, { merge: true });
        }
    };

    if (!user) {
        return <h2 style={{ textAlign: 'center', color: '#ff6347' }}>Please log in to access Weekly Challenges</h2>;
    }

    return (
        <div style={{
            textAlign: 'center',
            borderRadius: '15px',
            backgroundColor: '#f4f4f9',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            maxWidth: '900px',
            margin: 'auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            transition: 'all 0.3s ease-in-out'
        }}>
            <h2 style={{
                fontSize: '36px',
                backgroundColor: "#2E3A59",
                color: "#fff",
                textTransform: 'uppercase',
                fontWeight: '700',
                letterSpacing: '2px',
                marginBottom: '20px',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
            }}>🔥 Weekly Challenge</h2>
            <p style={{
                fontSize: '18px',
                color: '#333',
                marginBottom: '30px',
                fontWeight: '600'
            }}>Complete 5 workouts this week to earn a reward badge!</p>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '20px'
            }}>
                <img src={gym} alt="Motivation" style={{
                    borderRadius: '15px',
                    maxWidth: '100%',
                    maxHeight: '300px',
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s ease-in-out',
                    cursor: 'pointer'
                }} />
            </div>
            <progress value={progress} max="5" style={{
                width: '100%',
                height: '20px',
                marginBottom: '20px',
                borderRadius: '10px',
                backgroundColor: '#ddd',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}></progress>
            <p style={{
                fontSize: '20px',
                color: '#007bff',
                fontWeight: '700'
            }}>{progress} / 5 Workouts Completed</p>
            <button
                onClick={handleProgress}
                disabled={completed}
                style={{
                    padding: '15px 30px',
                    marginTop: '20px',
                    cursor: 'pointer',
                    backgroundColor: completed ? '#4CAF50' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                    width: '312px',
                    outline: 'none'
                }}>
                {completed ? '🏆 Challenge Completed!' : 'Log a Workout'}
            </button>
            {completed && <>
                <p style={{
                    fontSize: '22px',
                    color: '#28a745',
                    marginTop: '20px',
                    fontWeight: '700'
                }}>🎉 Congratulations! You've completed this week's challenge!</p>
                <p style={{ fontSize: '20px', color: '#007bff' }}>Your new badge:</p>
                <h3 style={{
                    fontSize: '26px',
                    color: '#007bff',
                    fontWeight: '700',
                    marginTop: '10px'
                }}>{badgeLevels[Math.min(streak, badgeLevels.length - 1)]}</h3>
                <div style={{
                    marginTop: '30px',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                    backgroundColor: '#fff',
                    padding: '10px',
                }}>
                    <iframe
                        width="100%"
                        height="500"
                        src={gymvideo}
                        title="Workout Motivation"
                        frameBorder="0"
                        allowFullScreen
                        style={{
                            borderRadius: '15px',
                            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)'
                        }}></iframe>
                </div>
            </>}
            <h3 style={{
                fontSize: '24px',
                color: '#333',
                marginTop: '30px',
                fontWeight: '700'
            }}>🔥 Streak: {streak} Weeks</h3>
            <h3 style={{
                fontSize: '24px',
                color: '#333',
                fontWeight: '700'
            }}>🏅 Badges Earned:</h3>
            <ul style={{
                listStyleType: 'none',
                padding: '0',
                fontSize: '20px',
                color: '#555',
                marginBottom: '30px',
                fontWeight: '600'
            }}>
                {badges.map((badge, index) => (
                    <li key={index} style={{
                        margin: '5px 0',
                        padding: '10px',
                        borderRadius: '8px',
                        backgroundColor: '#e9ecef',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        fontWeight: '600'
                    }}>{badge}</li>
                ))}
            </ul>
            {reward && <>
                <h2 style={{
                    fontSize: '28px',
                    color: '#28a745',
                    fontWeight: '700'
                }}>🎁 Reward Unlocked!</h2>
                <p style={{
                    fontSize: '20px',
                    color: '#333',
                    marginTop: '10px',
                    fontWeight: '600'
                }}>You've earned a **50% discount on Oasis**! Redeem it at the campus gym.</p>
            </>}
            {completed && <button
                onClick={handleNewWorkout}
                style={{
                    padding: '15px 30px',
                    marginTop: '20px',
                    cursor: 'pointer',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    width: '371px',
                    outline: 'none'
                }}>
                Start a New Challenge
            </button>}
            {/* Footer */}
            <footer style={{ padding: "20px", textAlign: "center", backgroundColor: "#2E3A59", color: "#fff", fontSize: "16px", marginTop: "20px" }}>
        <p>&copy; 2025 Fanshawe Fitness. All Rights Reserved.</p>
        <p style={{ fontSize: "14px", opacity: 0.8 }}>Built with ❤️ by Gracy Maisuriya</p>
      </footer>
        </div>
    );
};

export default Challenges;













