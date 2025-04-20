import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Toggle between login/signup

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.endsWith("@fanshaweonline.ca")) {
      setMessage("❌ Only Fanshawe students can register/login!");
      return;
    }

    try {
      if (isSignup) {
        if (!name) {
          setMessage("❌ Name is required for signup!");
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = {
          name,
          email,
          fanshaweID: email.split("@")[0],
          lastLogin: new Date().toISOString(),
        };

        await setDoc(doc(db, "users", userCredential.user.uid), newUser);
        setMessage("✅ Account created successfully!");
        setUser(newUser);
        setUserData(newUser);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const loginData = {
          email: userCredential.user.email,
          lastLogin: new Date().toISOString(),
        };

        await setDoc(doc(db, "users", userCredential.user.uid), loginData, { merge: true });
        fetchUserData(userCredential.user.uid);
        setMessage("✅ Logged in successfully!");
      }

      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      let errorMessage = "❌ Error: " + error.message;
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "❌ Email already in use. Try logging in.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "❌ Incorrect password!";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "❌ Password should be at least 6 characters!";
      }
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
      <h1 style={{ textAlign: "center", fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
        Fanshawe Student {isSignup ? "Signup" : "Login"}
      </h1>

      {message && (
        <p style={{ color: message.startsWith("✅") ? "green" : "red", textAlign: "center" }}>{message}</p>
      )}

      {!user ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
            {isSignup && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "16px" }}
              />
            )}
            <input
              type="email"
              placeholder="Fanshawe Email"
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
                border: "none",
              }}
            >
              {isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>
          <p style={{ marginTop: "10px", cursor: "pointer", color: "#007bff" }} onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Already have an account? Log in" : "New here? Sign up"}
          </p>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>Welcome, {userData?.name || "Student"}</h2>
          <p>Email: {userData?.email}</p>
          <p>Fanshawe ID: {userData?.fanshaweID}</p>
          <p>Last Login: {userData?.lastLogin ? new Date(userData.lastLogin).toLocaleString() : "N/A"}</p>
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
              border: "none",
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




















