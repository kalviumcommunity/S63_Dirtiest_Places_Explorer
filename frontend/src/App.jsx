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


function App() {
  const [entities, setEntities] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch places from backend
  const fetchPlaces = async () => {
    try {
      const res = await fetch("http://localhost:5004/api/mongo/places");
      const data = await res.json();
      setEntities(data.places || []);
    } catch (err) {
      // fallback: keep local state
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleAddEntity = async (newEntity) => {
    // Prepare FormData for image upload
    const formData = new FormData();
    Object.entries(newEntity).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        value.forEach((file, i) => formData.append("images", file));
      } else {
        formData.append(key, value);
      }
    });
    try {
      await fetch("http://localhost:5004/api/mongo/places", {
        method: "POST",
        body: formData
      });
      setNotification({
        type: "success",
        message: "Place added successfully!"
      });
      fetchPlaces();
    } catch (err) {
      setNotification({
        type: "error",
        message: "Failed to add place."
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
          <Route path="/update-place/:id" element={<UpdateEntity entities={entities} onUpdate={handleUpdateEntity} onDelete={handleDeleteEntity} />} />
          <Route path="/profile" element={<UserSelect users={[]} onSelect={handleSelectUser} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
