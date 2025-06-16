import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<div style={{padding: '2rem', textAlign: 'center', color: '#F5F5DC'}}>Explore page coming soon...</div>} />
          <Route path="/report" element={<div style={{padding: '2rem', textAlign: 'center', color: '#F5F5DC'}}>Report page coming soon...</div>} />
          <Route path="/about" element={<div style={{padding: '2rem', textAlign: 'center', color: '#F5F5DC'}}>About page coming soon...</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
