import { Link } from 'react-router-dom';
import '../styles/components/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">Dirtiest Places Explorer</h3>
            <p className="footer__description">
              Making our communities cleaner, one place at a time.
            </p>
            <div className="footer__social">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="footer__section">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/" className="footer__link">Home</Link></li>
              <li><Link to="/about" className="footer__link">About</Link></li>
              <li><Link to="/places" className="footer__link">Places</Link></li>
              <li><Link to="/contact" className="footer__link">Contact</Link></li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__heading">Resources</h4>
            <ul className="footer__links">
              <li><Link to="/how-it-works" className="footer__link">How It Works</Link></li>
              <li><Link to="/success-stories" className="footer__link">Success Stories</Link></li>
              <li><Link to="/community" className="footer__link">Community</Link></li>
              <li><Link to="/faq" className="footer__link">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Dirtiest Places Explorer. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link to="/privacy" className="footer__legal-link">Privacy Policy</Link>
            <Link to="/terms" className="footer__legal-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 