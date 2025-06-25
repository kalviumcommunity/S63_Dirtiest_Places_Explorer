import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/Login.css';
import { jwtDecode } from "jwt-decode";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form data
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5004/api/mongo/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        credentials: 'include' // This is important for cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store the token
      localStorage.setItem('token', data.token);
      // Decode token and store userId
      try {
        const decoded = jwtDecode(data.token);
        if (decoded.userId || decoded._id) {
          localStorage.setItem('userId', decoded.userId || decoded._id);
        }
      } catch (e) {
        // Optionally handle decode error
      }
      
      // Redirect to places page
      navigate('/places');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue exploring</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              <span className="login-error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="login-form-group">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="login-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="login-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-options">
            <label className="login-remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="login-forgot">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <span className="login-spinner"></span>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="login-divider">
            <span>or</span>
          </div>

          <button type="button" className="login-social-button">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyLjU2IDEyLjI1YzAgLS43OCAtLjA3IC0xLjUzIC0uMiAtMi4yNUgxMlYxNC43NWg1LjkyYy0uMjYgMS4zNyAtMS4wNCAyLjUzIC0yLjIxIDMuMzF2Mi43NmgzLjU3YzIuMDggLTEuOTIgMy4yOCAtNC43NCAzLjI4IC04LjA5eiIgZmlsbD0iIzQyODVGMyIvPgo8cGF0aCBkPSJNMTIgMjNjMi45NyAwIDUuNDYgLS45OCA2Ljg4IC0yLjY4bC0zLjU3IC0yLjc1Yy0uOTggLjY2IC0yLjIzIDEuMDYgLTMuMzEgMS4wNmMtMi41NCAwIC00LjY5IC0xLjcxIC01LjQ2IC00LjA2SDEuMDd2Mi44MkMyLjUzIDIwLjM4IDYuOTIgMjMgMTIgMjN6IiBmaWxsPSIjMzRBODUzIi8+CjxwYXRoIGQ9Ik01LjU0IDE0LjA5Yy0uMiAtLjY2IC0uMzEgLTEuMzYgLS4zMSAtMi4wOXMuMTEgLTEuNDMgLjMxIC0yLjA5VjYuMjlIMS4wN0MuMzYgNy45MiAwIDkuOTIgMCAxMnMuMzYgNC4wOCAxLjA3IDUuNzFsNC40NyAtMy42MnoiIGZpbGw9IiNGQkJDMDQiLz4KPHBhdGggZD0iTTEyIDQuNzVjMS43NyAwIDMuMzUuNjEgNC42IDEuNjl2My4xNkMxNS4yNCA5LjA5IDEzLjczIDguNSAxMiA4LjVjLTIuNTQgMCAtNC43OSAxLjcxIC01LjQ2IDQuMDZIMS4wN1Y2LjI5QzIuNTMgMy42MiA2LjkxIDEuMjUgMTIgMS4yNWMyLjk3IDAgNS40Ni45OCA2Ljg4IDIuNjhsLTMuNTcgMi43NUMxNC4wMiA0LjUgMTIuNzcgNC4xNSAxMS42OSA0LjE1SDExLjY5eiIgZmlsbD0iI0VBNDMzRiIvPgo8L3N2Zz4K" alt="Google" />
            Continue with Google
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{' '}
          <Link to="/signup" className="login-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login; 