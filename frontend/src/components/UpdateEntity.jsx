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

    useEffect(() => {
        fetch(`http://localhost:5003/api/entities/${id}`)
            .then((res) => res.json())
            .then((data) => setFormData({
                name: data.name,
                description: data.description,
                image: data.image,
                location: data.location
            }))
            .catch((err) => console.error("Error fetching entity:", err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5003/api/entities/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        navigate("/");
    };

    return (
        <div>
            <h2>Update Place Information</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateEntity;
