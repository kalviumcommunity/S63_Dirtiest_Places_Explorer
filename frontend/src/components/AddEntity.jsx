import { useState } from "react";

const AddEntity = ({ onNewEntity }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/entities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
        });

        if (response.ok) {
            const newEntity = await response.json();
            onNewEntity(newEntity);  // Update App's state dynamically
            setName("");
            setDescription("");
        }
    };

    return (
        <div>
            <h2>Add New Entity</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <button type="submit">Add Entity</button>
            </form>
        </div>
    );
};

export default AddEntity;
