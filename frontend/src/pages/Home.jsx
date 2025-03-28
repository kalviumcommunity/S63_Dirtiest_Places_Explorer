import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import Signup from "../components/Signup";
import UpdateEntity from "../components/UpdateEntity";
import AddEntity from "../components/AddEntity";
import EntityList from "../components/EntityList";
import UserSelect from "../components/UserSelect";
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
      const response = await fetch("http://localhost:5004/api/entities");
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      
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
      const response = await fetch(`http://localhost:5004/api/entities/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      
      setPlaces(places.filter(place => place._id !== id));
      showNotification("Place deleted successfully!");
    } catch (error) {
      console.error("Error deleting place:", error);
      showNotification("Failed to delete place. Try again.");
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="home-container fade-in">
      {notification && <div className="notification slide-in">{notification}</div>}

      {/* Header */}
      <header className="home-header">
        <h1>🌿 Dirtiest Places Explorer</h1>
        <p>Identify, report, and track polluted places for a cleaner future.</p>
        {/* <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Map</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav> */}
      </header>

      {/* Main Content */}
      <main className="home-main">
        <section className="home-hero">
          {!loading && places.length > 0 ? (
            <div className="hero-image zoom-in">
              <img src={places[0]?.image || "/default-image.jpg"} alt={places[0]?.name || "Unknown Place"} />
              <div className="hero-overlay">
                <h2>{places[0]?.name}</h2>
                <p>{places[0]?.description?.substring(0, 120) || "No description available"}...</p>
              </div>
            </div>
          ) : (
            <div className="loading-message bounce">{loading ? "Loading..." : "No reported places yet"}</div>
          )}
          <div className="hero-actions">
            {!showSignup ? (
              <button className="green-button" onClick={() => setShowSignup(true)}>Signup to Report</button>
            ) : (
              <Signup />
            )}
            <button className="blue-button" onClick={() => setShowAddEntity(true)}>Report a Dirty Place</button>
          </div>
        </section>

        {/* Places List */}
        <section className="home-places fade-in">
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
      <footer className="home-footer slide-up">
        <p>© 2025 Dirtiest Places Explorer | Promoting Environmental Awareness</p>
      </footer>

      {/* Modal for Adding Entity */}
      {showAddEntity && (
        <div className="modal fade-in">
          <div className="modal-content">
            <button onClick={() => setShowAddEntity(false)}>Close</button>
            <AddEntity onNewEntity={handleNewEntity} />
            <EntityList/>
            <UserSelect/>
            <UpdateEntity/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;