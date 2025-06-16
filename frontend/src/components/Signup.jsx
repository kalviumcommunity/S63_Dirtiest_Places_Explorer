import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate form data
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to register the user
      console.log("User registered:", formData);
      
      // Show success message
      setError("");
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      setError("An error occurred during signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup__header">
        <h2 className="signup__title">Create Account</h2>
        <p className="signup__subtitle">Join our community of dirty place explorers</p>
      </div>

      <form className="signup__form" onSubmit={handleSubmit}>
        {error && <div className="signup__error">{error}</div>}

        <div className="signup__form-group">
          <label htmlFor="username" className="signup__label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="signup__input"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            required
            disabled={isLoading}
          />
        </div>

        <div className="signup__form-group">
          <label htmlFor="email" className="signup__label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="signup__input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>

        <div className="signup__form-group">
          <label htmlFor="password" className="signup__label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="signup__input"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
            disabled={isLoading}
          />
        </div>

        <div className="signup__form-group">
          <label htmlFor="confirmPassword" className="signup__label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="signup__input"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className={`signup__submit ${isLoading ? 'signup__submit--loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <p className="signup__login">
          Already have an account?{" "}
          <button
            type="button"
            className="signup__login-link"
            onClick={() => navigate("/login")}
            disabled={isLoading}
          >
            Log In
          </button>
        </p>
      </form>
    </div>
  );
}

export default Signup;