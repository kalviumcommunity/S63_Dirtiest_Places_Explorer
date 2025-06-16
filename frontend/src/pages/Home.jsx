import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaceCard from "../components/PlaceCard/PlaceCard";
import Signup from "../components/Signup/Signup";
import AddEntity from "../components/AddEntity/AddEntity";
import "../styles/pages/Home.css";


function Home() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5004/api/entities");
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-root">
      <section className="hero-section">
        <div className="hero-content">
          <img
            src="https://as2.ftcdn.net/jpg/05/69/10/07/1000_F_569100754_SeQldyRfBYuqEeFnpRJwRonVRd4NCtnR.jpg"
            alt="Eco Illustration"
            className="hero-img"
          />
          <h1>
            <span className="highlight">Dirtiest Places Explorer</span>
          </h1>
          <p className="subtitle">
            Identify, report, and track polluted places for a cleaner future.
          </p>
        </div>
        <div className="hero-animations">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5fd14a8ad4328f0b6168fcaa/8a3da05d-3982-4048-9bfa-dfe368187476/CCA+Photo.jpg?format=2500w"
            alt="Clean City"
            className="floating-img"
            style={{ animationDelay: "0s" }}
          />
          <img
            src="https://www.cityofeastdubuque.com/media/cms/volunteering_76d90288fecfa.jpeg"
            alt="Community Action"
            className="floating-img"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
      </section>

      <section className="features-section">
        <h2>How It Works</h2>
        <div className="features-cards">
          <div className="feature-card">
            <span role="img" aria-label="Community">🌱</span>
            <h3>Community Driven</h3>
            <p>Everyone can help spot and track pollution hotspots.</p>
          </div>
          <div className="feature-card">
            <span role="img" aria-label="Tracking">📊</span>
            <h3>Real-Time Tracking</h3>
            <p>See changes and improvements as they happen.</p>
          </div>
          <div className="feature-card">
            <span role="img" aria-label="Impact">💡</span>
            <h3>Impact Stories</h3>
            <p>Read about places transformed by community action.</p>

function Home({ entities }) {
  const [showSignup, setShowSignup] = useState(false);
  const [showAddEntity, setShowAddEntity] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="home-page">
      {notification && (
        <div className="home-page__notification">
          <div className="home-page__notification-content">
            <span className="home-page__notification-icon">ℹ️</span>
            <p>{notification}</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero__content">
          <h1 className="home-hero__title">🌿 Dirtiest Places Explorer</h1>
          <p className="home-hero__subtitle">Identify, report, and track polluted places for a cleaner future.</p>
          
          <div className="home-hero__actions">
            {!showSignup ? (
              <button 
                className="btn btn--primary home-hero__button"
                onClick={() => setShowSignup(true)}
              >
                Signup to Report
              </button>
            ) : (
              <Signup />
            )}
            <button 
              className="btn btn--secondary home-hero__button"
              onClick={() => setShowAddEntity(true)}
            >
              Report a Dirty Place
            </button>
          </div>
        </div>

        {entities.length > 0 && (
          <div className="home-hero__featured">
            <div className="home-hero__image-container">
              <img 
                src={entities[0]?.image || "/default-image.jpg"} 
                alt={entities[0]?.name || "Unknown Place"}
                className="home-hero__image"
              />
              <div className="home-hero__overlay">
                <h2 className="home-hero__featured-title">{entities[0]?.name}</h2>
                <p className="home-hero__featured-description">
                  {entities[0]?.description?.substring(0, 120) || "No description available"}...
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Places Section */}
      <section className="home-places">
        <div className="container">
          <h2 className="home-places__title">Reported Places</h2>
          
          {entities.length === 0 ? (
            <div className="home-places__empty">
              <p>No places have been reported yet.</p>
              <p>Be the first to report a dirty place!</p>
            </div>
          ) : (
            <div className="home-places__grid">
              {entities.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onEdit={() => navigate(`/update-place/${place.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <p>© 2025 Dirtiest Places Explorer | Promoting Environmental Awareness</p>
        </div>
      </footer>

      {/* Modal for Adding Entity */}
      {showAddEntity && (
        <div className="modal">
          <div className="modal__overlay" onClick={() => setShowAddEntity(false)}></div>
          <div className="modal__content">
            <button 
              className="modal__close"
              onClick={() => setShowAddEntity(false)}
            >
              ×
            </button>
            <AddEntity onAdd={() => {
              setShowAddEntity(false);
              showNotification("New place reported successfully!");
            }} />

          </div>
        </div>
      </section>

      <section className="gallery-section">
        <h2>Gallery</h2>
        <div className="gallery">
          <img src="https://www.thehindu.com/news/cities/chennai/6naqz6/article26359253.ece/ALTERNATES/LANDSCAPE_615/25THBEACH" alt="Before Cleanup" />
          <img src="https://www.re-thinkingthefuture.com/wp-content/uploads/2021/07/A4751-10-worlds-most-polluted-cities-in-2021.jpg" alt="Polluted Place" />
          <img src="https://cdn.zmescience.com/wp-content/uploads/2015/04/trsh.webp" alt="After Cleanup" />
        </div>
      </section>

      <section className="cta-section">
        <h2>Join the Movement</h2>
        <p>
          Explore the dirtiest places, get inspired by cleanups, and help make your city greener!
        </p>
      </section>
    </div>
  );
}

export default Home;
