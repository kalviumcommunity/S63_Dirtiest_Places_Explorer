import { Link } from 'react-router-dom';
import '../../styles/components/Navbar.css';

function Navbar({ selectedUser }) {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand">
          🌿 Dirtiest Places Explorer
        </Link>
        
        <div className="navbar__menu">
          <Link to="/" className="navbar__link">
            Home
          </Link>
          <Link to="/places" className="navbar__link">
            Places
          </Link>
          <Link to="/add-place" className="navbar__link">
            Add Place
          </Link>
          {selectedUser ? (
            <Link to="/profile" className="navbar__link">
              Profile
            </Link>
          ) : (
            <div className="navbar__auth">
              <Link to="/login" className="navbar__button navbar__button--login">
                Login
              </Link>
              <Link to="/signup" className="navbar__button navbar__button--signup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 