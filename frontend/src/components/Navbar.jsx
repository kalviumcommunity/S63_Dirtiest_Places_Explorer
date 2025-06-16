import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/components/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-root">
      <div className="navbar-logo" onClick={() => handleNavigation("/")}>
        <span className="logo-icon">🌿</span>
        <span className="logo-text">Dirty Places Explorer</span>
      </div>
      <div
        className={`navbar-links ${isMobileMenuOpen ? "open" : ""}`}
      >
        <button
          className={`nav-link ${isActive("/") ? "active" : ""}`}
          onClick={() => handleNavigation("/")}
        >
          Home
        </button>
        <button
          className={`nav-link ${isActive("/explore") ? "active" : ""}`}
          onClick={() => handleNavigation("/explore")}
        >
          Explore
        </button>
        <button
          className={`nav-link ${isActive("/report") ? "active" : ""}`}
          onClick={() => handleNavigation("/report")}
        >
          Report
        </button>
        <button
          className={`nav-link ${isActive("/about") ? "active" : ""}`}
          onClick={() => handleNavigation("/about")}
        >
          About
        </button>
        <button
          className="nav-btn login-btn"
          onClick={() => handleNavigation("/login")}
        >
          Log In
        </button>
      </div>
      <div
        className={`navbar-burger ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </div>
    </nav>
  );
}

export default Navbar;
