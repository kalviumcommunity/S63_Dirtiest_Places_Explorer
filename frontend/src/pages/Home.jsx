import { useEffect, useState } from "react";
import "../styles/Home.css";

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
            src="https://cdn.pixabay.com/photo/2017/01/20/00/30/environmental-protection-1997437_1280.png"
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
            src="https://cdn.pixabay.com/photo/2016/03/31/19/56/clean-1293698_1280.png"
            alt="Clean City"
            className="floating-img"
            style={{ animationDelay: "0s" }}
          />
          <img
            src="https://cdn.pixabay.com/photo/2014/04/03/10/32/clean-312729_1280.png"
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
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <h2>Gallery</h2>
        <div className="gallery">
          <img src="https://cdn.pixabay.com/photo/2015/09/18/19/03/africa-942340_1280.jpg" alt="Before Cleanup" />
          <img src="https://cdn.pixabay.com/photo/2017/06/20/19/22/garbage-2421135_1280.jpg" alt="Polluted Place" />
          <img src="https://cdn.pixabay.com/photo/2017/01/20/00/30/environmental-protection-1997437_1280.png" alt="After Cleanup" />
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
