import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import Signup from "../components/Signup";
import AddEntity from "../components/AddEntity";
import "../styles/Home.css";

function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const [showAddEntity, setShowAddEntity] = useState(false);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/entities");
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
        showNotification("Failed to load places. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleNewEntity = (newEntity) => {
    setPlaces([...places, newEntity]);
    setShowAddEntity(false);
    showNotification("New place reported successfully!");
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="home-container">
      {notification && <div className="notification">{notification}</div>}
      
      {/* Header */}
      <header className="home-header">
        <h1>Dirtiest Places Explorer</h1>
        <p>Identify, report, and track the most polluted places around you.</p>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Map</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="home-main">
        <section className="home-hero">
          {!loading && places.length > 0 ? (
            <div className="hero-image">
              <img src={places[0].image} alt={places[0].title} />
              <div className="hero-overlay">
                <h2>{places[0].title}</h2>
                <p>{places[0].description?.substring(0, 120)}...</p>
              </div>
            </div>
          ) : (
            <div className="loading-message">{loading ? "Loading..." : "No reported places yet"}</div>
          )}
          <div className="hero-actions">
            {!showSignup ? (
              <button onClick={() => setShowSignup(true)}>Signup to Report</button>
            ) : (
              <Signup />
            )}
            <button onClick={() => setShowAddEntity(true)}>Report a Dirty Place</button>
          </div>
        </section>

        {/* Places List */}
        <section className="home-places">
          {places.map((place, index) => (
            <PlaceCard key={index} place={place} />
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2025 Dirtiest Places Explorer | Built for civic awareness</p>
      </footer>

      {/* Modal for Adding Entity */}
      {showAddEntity && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setShowAddEntity(false)}>Close</button>
            <AddEntity onNewEntity={handleNewEntity} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
