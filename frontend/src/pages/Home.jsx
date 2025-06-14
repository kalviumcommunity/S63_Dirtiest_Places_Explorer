import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaceCard from "../components/PlaceCard/PlaceCard";
import Signup from "../components/Signup/Signup";
import AddEntity from "../components/AddEntity/AddEntity";
import "../styles/pages/Home.css";

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
      )}
    </div>
  );
}

export default Home;