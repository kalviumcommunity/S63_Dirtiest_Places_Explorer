import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-root">
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            <span className="highlight">Dirtiest Places Explorer</span>
          </h1>
          <p className="subtitle">
            Join us in identifying and tracking polluted places for a cleaner, healthier future.
          </p>
          <div className="hero-buttons">
            <button className="primary-button" onClick={handleExploreClick}>Explore Places</button>
          </div>
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

      <section className="impact-section">
        <h2>Our Impact</h2>
        <div className="impact-cards">
          <div className="impact-card">
            <h3>1000+</h3>
            <p>Places Tracked</p>
          </div>
          <div className="impact-card">
            <h3>500+</h3>
            <p>Active Volunteers</p>
          </div>
          <div className="impact-card">
            <h3>50+</h3>
            <p>Cities Covered</p>
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
        <h2>Ready to Make a Difference?</h2>
        <p>Join our community of environmental activists and help create a cleaner world.</p>
        <button className="primary-button" onClick={handleExploreClick}>Get Started</button>
      </section>
    </div>
  );
};

export default Home;