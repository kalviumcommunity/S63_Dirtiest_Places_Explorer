import "./App.css";
import PlaceCard from "./components/PlaceCard"; // Importing the component

function App() {
  const dummyPlace = {
    title: "Garbage Dump at City Center",
    image: "https://via.placeholder.com/300", 
    description: "An overflowing garbage dump causing foul smell.",
    location: "Bengaluru, India",
    category: "Littered Streets"
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
        
        {/* Render PlaceCard component */}
        <section className="places">
          <h2>Recently Reported Dirty Places</h2>
          <PlaceCard place={dummyPlace} />
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
