import { useEffect, useState } from "react";
import "./App.css";
import PlaceCard from "./components/PlaceCard";
import Signup from "./components/Signup";
import AddEntity from "./components/AddEntity";  // Import AddEntity component

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showAddEntity, setShowAddEntity] = useState(false); // State for AddEntity modal
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/entities");
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  // Function to handle new entity addition
  const handleNewEntity = (newEntity) => {
    setPlaces([...places, newEntity]); // Update state dynamically
  };

  return (
    <div className="container">
      <header>
        <h1>Dirtiest Places Explorer</h1>
        <p>Identify, report, and track the most polluted places around you.</p>
      </header>
      <main>
        <section className="hero">
          <img 
            src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201602/varanasi-dirty-647_021616041758.jpg?VersionId=WkFfUsY9s8GPzmgupMW7YUVsDUBd5kyT" 
            alt="Polluted Area" 
            className="hero-image" 
          />
          <p>Join us in making the world a cleaner place.</p>
        </section>

        {/* Signup Section */}
        {showSignup ? (
          <Signup />
        ) : (
          <button className="signup-btn" onClick={() => setShowSignup(true)}>
            Signup to Report
          </button>
        )}

        {/* Display reported places dynamically */}
        <section className="places">
          <h2>Recently Reported Dirty Places</h2>
          {places.length > 0 ? (
            places.map((place) => (
              <PlaceCard key={place._id} place={place} />
            ))
          ) : (
            <p>No places reported yet.</p>
          )}
        </section>

        {/* Button to Show AddEntity Form */}
        <button className="report-btn" onClick={() => setShowAddEntity(true)}>
          Report a Dirty Place
        </button>

        {/* Show AddEntity Form When Button is Clicked */}
        {showAddEntity && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-btn" onClick={() => setShowAddEntity(false)}>✖</button>
              <AddEntity onNewEntity={handleNewEntity} />
            </div>
          </div>
        )}
      </main>
      <footer>
        <p>© 2025 Dirtiest Places Explorer | Built for civic awareness</p>
      </footer>
    </div>
  );
}

export default App;
