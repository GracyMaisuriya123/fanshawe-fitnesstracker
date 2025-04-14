import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyClotHcNyHo7WdjFrrRt5MKO0F4UYgTYPY",
    authDomain: "fanshawe-fitnesstracker.firebaseapp.com",
    projectId: "fanshawe-fitnesstracker",
    storageBucket: "fanshawe-fitnesstracker.appspot.com",
    messagingSenderId: "175762732656",
    appId: "1:175762732656:web:6b7ca13db5a1854394e6b5",
    measurementId: "G-MCSTMPLRDX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

// Register service worker for notifications
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw')
        .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((err) => {
            console.error("Service Worker registration failed:", err);
        });
}

// Request notification permission and token
export const requestPermission = async () => {
    try {
      await Notification.requestPermission();
      const token = await getToken(messaging, {
        vapidKey: 'BP83vOyPGo_a1OcfvBS4ADhV9qnt2smQqjvGsJFqIQHEt-EDOO52Ey3XGnIkIyl-POXxIVCgB9efAyqNBCaOeJk'
      });
      console.log('Notification token:', token);
      return token;
    } catch (error) {
      console.error('Error getting notification token:', error);
    }
  };
  
  export { auth, db, messaging };

