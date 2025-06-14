import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/Login.css';

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, hardcoded credentials
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
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
            <img src="https://www.google.com/favicon.ico" alt="Google" />
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