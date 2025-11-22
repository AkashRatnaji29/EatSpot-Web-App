import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx'; // Import the context hook
import '../App.css'; 

const LOGIN_URL = 'http://localhost:5000/api/auth/login';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      });

      const { token, username } = response.data;

      // 1. Update the global application state and local storage
      login(token, username); 
      
      // 2. Redirect the user back to the home page
      navigate('/'); 

    } catch (err: any) {
      // Handle server error messages (e.g., "Invalid credentials.")
      const errorMsg = err.response?.data?.error || 'Login failed. Please check your email and password.';
      setError(errorMsg);
    }
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <h2>Welcome Back to EatSpot</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="submit-button">Login</button>
        </form>

        {/* Display error message */}
        {error && <p className="error-message">{error}</p>}

        <p className="login-footer">
          Don't have an account? <Link to="/register" style={{color: '#a31d16'}}>Sign Up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;