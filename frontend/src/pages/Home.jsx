import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import Signup from "../components/Signup";
import UpdateEntity from "../components/UpdateEntity";
import AddEntity from "../components/AddEntity";
import EntityList from "../components/EntityList";
import "../styles/Home.css";

function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const [showAddEntity, setShowAddEntity] = useState(false);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5002/api/entities");
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error("Error fetching places:", error);
      showNotification("Failed to load places. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleNewEntity = (newEntity) => {
    setPlaces([...places, newEntity]);
    setShowAddEntity(false);
    showNotification("New place reported successfully!");
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5002/api/entities/${id}`, { method: "DELETE" });
      setPlaces(places.filter(place => place._id !== id));
      showNotification("Place deleted successfully!");
    } catch (error) {
      console.error("Error deleting place:", error);
      showNotification("Failed to delete place. Try again.");
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 5002);
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
              <img src={places[0].image} alt={places[0].name} />
              <div className="hero-overlay">
                <h2>{places[0].name}</h2>
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
          {places.map((place) => (
            <PlaceCard
              key={place._id}
              place={place}
              onDelete={() => handleDelete(place._id)}
              onEdit={() => navigate(`/update/${place._id}`)}
            />
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
            <UpdateEntity />
            <EntityList />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
