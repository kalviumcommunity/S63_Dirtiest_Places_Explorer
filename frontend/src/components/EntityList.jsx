import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// EntityList Component
const EntityList = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Entities
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch('http://localhost:5004/api/entities');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setEntities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEntities();
  }, []);

  // Delete Entity with Confirmation
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Are you sure you want to delete this entity?")) return;

    try {
      const response = await fetch(`http://localhost:5004/api/entities/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setEntities((prevEntities) => prevEntities.filter((entity) => entity._id !== id));
      alert("Entity deleted successfully!");
    } catch (error) {
      console.error('Error deleting entity:', error);
      alert("Failed to delete entity. Please try again.");
    }
  }, []);

  // Loading State
  if (loading) {
    return <p>Loading entities...</p>;
  }

  // Error State
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render Entities
  return (
    <div>
      {entities.length === 0 ? (
        <p>No entities found. Add one using the form above!</p>
      ) : (
        entities.map((entity) => (
          <div key={entity._id} className="border p-4 mb-4">
            <h3 className="text-lg font-bold">{entity.name}</h3>
            <p>{entity.description}</p>
            <Link to={`/update/${entity._id}`} className="text-blue-500">Edit</Link>
            <button 
              onClick={() => handleDelete(entity._id)} 
              className="ml-4 delete-button"
              style={{ cursor: "pointer", padding: "8px 12px", backgroundColor: "red", color: "white", border: "none", borderRadius: "4px" }} // Inline styles for testing
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default EntityList;