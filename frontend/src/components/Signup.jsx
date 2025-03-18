import { useState } from "react";

function Signup() {
  const [formData, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setSuccess(true);
    setState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="container"> {/* Center container */}
      <h2 className="signup-title">Join the Movement</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {error && <div className="error">{error}</div>}
        <div>
          <label htmlFor="name" className="label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            placeholder="Create a strong password"
            required
          />
          <p className="note">Must be at least 8 characters long</p>
        </div>
        <div>
          <label htmlFor="confirmPassword" className="label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input"
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Account</button>
      </form>
      {success && <div className="success-message">Registration Successful!</div>}
    </div>
  );
}

export default Signup;