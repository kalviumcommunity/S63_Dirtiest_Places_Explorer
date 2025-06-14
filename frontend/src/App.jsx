import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import EntityList from "./components/EntityList/EntityList";
import AddEntity from "./components/AddEntity/AddEntity";
import UpdateEntity from "./components/UpdateEntity/UpdateEntity";
import UserSelect from "./components/UserSelect/UserSelect";
import Login from "./pages/Login";
import Signup from "./components/Signup/Signup";
import "./styles/components/App.css";

function App() {
  const [entities, setEntities] = useState([
    {
      id: "1",
      name: "Chernobyl Exclusion Zone",
      location: "Ukraine",
      description: "Site of the 1986 nuclear disaster, still highly contaminated with radiation.",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?w=800&auto=format&fit=crop"
    },
    {
      id: "2",
      name: "Great Pacific Garbage Patch",
      location: "Pacific Ocean",
      description: "A massive collection of marine debris in the North Pacific Ocean.",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop"
    },
    {
      id: "3",
      name: "Yamuna River",
      location: "India",
      description: "One of the most polluted rivers in the world, heavily contaminated with industrial waste.",
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop"
    }
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleAddEntity = (newEntity) => {
    setEntities(prev => [...prev, newEntity]);
    setNotification({
      type: "success",
      message: "Place added successfully!"
    });
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
    </div>
  );
}

export default App;
