import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Profile() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Store student's name
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  // Fetch user data from Firestore
  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        setMessage("❌ No user data found!");
      }
    } catch (error) {
      setMessage("❌ Error fetching user data: " + error.message);
    }
  };

  // Handle Login or Signup
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    if (!email.endsWith("@fanshaweonline.ca")) {
      setMessage("❌ Only Fanshawe students can log in!");
      return;
    }

    try {
      let userCredential;
      try {
        // Attempt to login the user
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        setMessage("✅ Login successful!");
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          // If user doesn't exist, prompt for name and create a new user
          const userName = prompt("Please enter your name: ");
          if (!userName) {
            setMessage("❌ Name is required to create an account!");
            return;
          }

          try {
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = {
              name: userName,  // Store the user's name
              email: email,
              fanshaweID: email.split("@")[0], // Use part of the email as ID
              lastLogin: new Date().toISOString(),
            };

            // Save new user to Firestore
            const userRef = doc(db, "users", userCredential.user.uid);
            await setDoc(userRef, newUser);
            setMessage("✅ New account created & logged in!");

            // Set user data after creation
            setUser(newUser);
            setUserData(newUser);
            return;
          } catch (createError) {
            setMessage("❌ Error creating user: " + createError.message);
            return;
          }
        } else {
          throw error; // Rethrow if error is not 'user-not-found'
        }
      }

      // After successful login, update user data in Firestore
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name: user.displayName || "Student",
        email: user.email,
        fanshaweID: user.uid,
        lastLogin: new Date().toISOString(),
      }, { merge: true });

      setEmail("");
      setPassword("");
      fetchUserData(user.uid);
    } catch (error) {
      let errorMessage = "❌ Error: " + error.message;
      if (error.code === "auth/wrong-password") errorMessage = "❌ Incorrect password!";
      else if (error.code === "auth/weak-password") errorMessage = "❌ Password should be at least 6 characters!";
      setMessage(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMessage("✅ Logged out successfully.");
    } catch (error) {
      setMessage(`❌ Error logging out: ${error.message}`);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>Fanshawe Student Login</h1>
      {message && <p style={{ color: message.startsWith("✅") ? "green" : "red", textAlign: "center" }}>{message}</p>}

      {!user ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
            <input
              type="email"
              placeholder="Fanshawe Email (e.g. student@fanshaweonline.ca)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "16px" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "16px" }}
            />
            <button 
              type="submit"
              style={{
                padding: "12px", 
                backgroundColor: "#FF6347", 
                color: "#fff", 
                borderRadius: "5px", 
                fontSize: "16px",
                fontWeight: "bold",
                border: "none"
              }}
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>Welcome, {userData?.name || "Student"}</h2>
          <p style={{ fontSize: "18px", marginTop: "20px" }}>
            Email: {userData?.email || user.email}
          </p>
          <p style={{ fontSize: "18px" }}>
            Fanshawe ID: {userData?.fanshaweID || "N/A"}
          </p>
          <p style={{ fontSize: "18px" }}>
            Last Login: {userData?.lastLogin ? new Date(userData.lastLogin).toLocaleString() : "N/A"}
          </p>
          <button 
            onClick={handleLogout}
            style={{
              marginTop: "20px", 
              padding: "12px", 
              backgroundColor: "#FF6347", 
              color: "#fff", 
              borderRadius: "5px", 
              fontSize: "16px",
              fontWeight: "bold",
              border: "none"
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;



















