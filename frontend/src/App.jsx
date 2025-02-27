import { useEffect, useState } from "react";
import "./App.css";
import PlaceCard from "./components/PlaceCard";
import Signup from "./components/Signup";

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("https://s63-dirtiest-places-explorer-1.onrender.com/api/reports");
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

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

        <button className="report-btn">Report a Dirty Place</button>
      </main>
      <footer>
        <p>© 2025 Dirtiest Places Explorer | Built for civic awareness</p>
      </footer>
    </div>
  );
}

export default App;
