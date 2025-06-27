import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EntityList from "./components/EntityList/EntityList";
import AddEntity from "./components/AddEntity/AddEntity";
import UpdateEntity from "./components/UpdateEntity/UpdateEntity";
import UserSelect from "./components/UserSelect/UserSelect";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from './components/Footer';
import PlaceDetails from "./components/PlaceDetails";


function App() {
  const [entities, setEntities] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch places from backend
  const fetchPlaces = async () => {
    try {
      const res = await fetch("http://localhost:5004/api/places", {
        credentials: 'include'
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched places:", data); // <-- ADD THIS LINE
      setEntities(data.places || []);
    } catch (err) {
      console.error("Error fetching places:", err);
      setEntities([]);
    }
  };
  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleAddEntity = async (newEntity) => {
    // Get the logged-in user's ID from localStorage
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      setNotification({
        type: "error",
        message: "Please log in to add a place."
      });
      return;
    }

    // Prepare FormData for image upload
    const formData = new FormData();
    Object.entries(newEntity).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value) && value.length > 0) {
        // Only send the first image as 'image'
        formData.append("image", value[0]);
      } else if (key !== "images") {
        formData.append(key, value);
      }
    });
    
    try {
      const response = await fetch("http://localhost:5004/api/places", {
        method: "POST",
        body: formData,
        credentials: 'include' // Include cookies for authentication
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      setNotification({
        type: "success",
        message: "Place added successfully!"
      });
      fetchPlaces();
    } catch (err) {
      console.error("Error adding place:", err);
      setNotification({
        type: "error",
        message: err.message || "Failed to add place."
      });
    }
  };

  const handleUpdateEntity = (updatedEntity) => {
    setEntities(prev =>
      prev.map(entity =>
        entity.id === updatedEntity.id ? updatedEntity : entity
      )
    );
    setNotification({
      type: "success",
      message: "Place updated successfully!"
    });
  };

  const handleDeleteEntity = (id) => {
    setEntities(prev => prev.filter(entity => entity.id !== id));
    setNotification({
      type: "success",
      message: "Place deleted successfully!"
    });
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="app">
      <Navbar selectedUser={selectedUser} />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home entities={entities} />} />
          <Route path="/places" element={<EntityList entities={entities} />} />
          <Route path="/add-place" element={<AddEntity onAdd={handleAddEntity} />} />
          <Route path="/update-place/:id" element={<UpdateEntity entities={entities} onDelete={handleDeleteEntity} />} />
          <Route path="/profile" element={<UserSelect users={[]} onSelect={handleSelectUser} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/places/:id" element={<PlaceDetails entities={entities} />} />
        </Routes>
      </main>
      {notification && (
        <div className={`notification notification--${notification.type}`}>
          {notification.message}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
