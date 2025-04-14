// import React, { useState } from 'react';
// import axios from 'axios';

// function Register() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [error, setError] = useState(null);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
//         email,
//         password,
//         username,
//       });

//       // Store token in localStorage upon successful registration
//       localStorage.setItem('authToken', response.data.token);
//       window.location.href = '/profile'; // Redirect to profile page after registration
//     } catch (error) {
//       setError('Registration failed. Try again.');
//       console.error('Error during registration', error);
//     }
//   };

//   return (
//     <div>
//       {error && <p>{error}</p>}
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br />
//         <label>Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <br />
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;
