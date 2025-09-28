import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Mock authentication
    const mockAuth = {
      student: { email: 'student@example.com', password: 'student123' },
      ta: { email: 'ta@example.com', password: 'ta123' },
      teacher: { email: 'teacher@example.com', password: 'teacher123' }
    };

    const roleAuth = mockAuth[formData.role];
    if (formData.email === roleAuth.email && formData.password === roleAuth.password) {
      login({
        email: formData.email,
        role: formData.role,
        isAuthenticated: true
      });

      const redirectPath = formData.role === 'student' ? '/' : `/${formData.role}`;
      navigate(redirectPath, { replace: true });
    } else {
      setError('Invalid credentials');
    }
  };
 
  const loginverify = async () => {
    try {
       // backend URL
       console.log("I am here");
      const response = await axios.get(`http://localhost:5000/api/login`);
      const data = await response.json();
      console.log(response); // logs in browser console
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>VidhyaVichaar Login</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <div className="role-selection">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === 'student'}
                  onChange={handleInputChange}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="ta"
                  checked={formData.role === 'ta'}
                  onChange={handleInputChange}
                />
                TA
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={formData.role === 'teacher'}
                  onChange={handleInputChange}
                />
                Teacher
              </label>
            </div>
          </div>

          <button type="submit" className="login-button" onClick={loginverify}>
            Login
          </button>
        </form>

        <div className="demo-credentials">
          <strong>Demo Credentials:</strong><br />
          Student: student@example.com / student123<br />
          TA: ta@example.com / ta123<br />
          Teacher: teacher@example.com / teacher123
        </div>
      </div>
    </div>
  );
};

export default Login;
