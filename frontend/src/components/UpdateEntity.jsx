import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEntity = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        location: ""
    });

    // Fetch Entity Data
    useEffect(() => {
        fetch(`http://localhost:5004/api/entities/${id}`)
            .then((res) => res.json())
            .then((data) => setFormData({
                name: data.name,
                description: data.description,
                image: data.image,
                location: data.location
            }))
            .catch((err) => console.error("Error fetching entity:", err));
    }, [id]);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Update Entity
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5004/api/entities/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        alert("Entity updated successfully!");
        navigate("/");
    };

    // Delete Entity
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this entity?")) {
            await fetch(`http://localhost:5004/api/entities/${id}`, {
                method: "DELETE"
            });
            alert("Entity deleted successfully!");
            navigate("/");
        }
    };

    return (
        <div className="container">
            <h2 className="add-entity-title">Update Place Information</h2>
            <form onSubmit={handleSubmit} className="add-entity-form">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="input" />
                <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="input" />
                <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required className="input" />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="input" />
                <button type="submit" className="submit-button">Update</button>
                <button type="button" onClick={handleDelete} className="delete-button">Delete</button>
            </form>
        </div>
    );
};

export default UpdateEntity;
