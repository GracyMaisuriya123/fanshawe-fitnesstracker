importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyClotHcNyHo7WdjFrrRt5MKO0F4UYgTYPY",
    authDomain: "fanshawe-fitnesstracker.firebaseapp.com",
    projectId: "fanshawe-fitnesstracker",
    storageBucket: "fanshawe-fitnesstracker.appspot.com",
    messagingSenderId: "175762732656",
    appId: "1:175762732656:web:6b7ca13db5a1854394e6b5",
    measurementId: "G-MCSTMPLRDX"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
