import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// EntityList.jsx
const EntityList = () => {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        const fetchEntities = async () => {
            try {
                const response = await fetch('http://localhost:5002/api/entities');
                const data = await response.json();
                setEntities(data);
            } catch (error) {
                console.error('Error fetching entities:', error);
            }
        };
        fetchEntities();
    }, []);

    const handleDelete = useCallback(async (id) => {
        try {
            await fetch(`http://localhost:5002/api/entities/${id}`, { method: 'DELETE' });
            setEntities(prevEntities => prevEntities.filter(entity => entity._id !== id));
        } catch (error) {
            console.error('Error deleting entity:', error);
        }
    }, []);

    return (
        <div>
            {entities.map((place) => (
                <div key={place._id} className="border p-4 mb-4">
                    <h3 className="text-lg font-bold">{place.name}</h3>
                    <p>{place.description}</p>
                    <Link to={`/update/${place._id}`} className="text-blue-500">Edit</Link>
                    <button onClick={() => handleDelete(place._id)} className="ml-4 text-red-500">Delete</button>
                </div>
            ))}
        </div>
    );
};

export default EntityList;
