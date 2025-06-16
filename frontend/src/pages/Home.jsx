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