import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to authenticate the user
      console.log("User logged in:", formData);
      
      // Show success message
      setError("");
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__header">
        <h2 className="login__title">Welcome Back</h2>
        <p className="login__subtitle">Sign in to continue exploring dirty places</p>
      </div>

      <form className="login__form" onSubmit={handleSubmit}>
        {error && <div className="login__error">{error}</div>}

        <div className="login__form-group">
          <label htmlFor="email" className="login__label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="login__input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>

        <div className="login__form-group">
          <label htmlFor="password" className="login__label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="login__input"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
        </div>

        <div className="login__options">
          <label className="login__remember">
            <input type="checkbox" className="login__checkbox" />
            <span className="login__checkmark"></span>
            Remember me
          </label>
          <button
            type="button"
            className="login__forgot"
            onClick={() => alert("Forgot password functionality coming soon!")}
          >
            Forgot Password?
          </button>
        </div>

        <button 
          type="submit" 
          className={`login__submit ${isLoading ? 'login__submit--loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="login__signup">
          Don't have an account?{" "}
          <button
            type="button"
            className="login__signup-link"
            onClick={() => navigate("/signup")}
            disabled={isLoading}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;