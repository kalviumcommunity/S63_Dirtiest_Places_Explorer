import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/AddEntity.css";

function AddEntity({ onAdd }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    rating: "",
    image: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate form data
    if (!formData.name || !formData.location || !formData.description || !formData.rating) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate rating
    const rating = parseFloat(formData.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      setError("Rating must be a number between 0 and 5");
      return;
    }

    // Create new entity
    const newEntity = {
      id: Date.now().toString(),
      ...formData,
      rating: rating
    };

    // Add entity
    onAdd(newEntity);
    navigate("/places");
  };

  return (
    <div className="add-entity">
      <div className="add-entity__header">
        <h2 className="add-entity__title">Add New Place</h2>
        <p className="add-entity__subtitle">Share your experience with a new dirty place</p>
      </div>

      <form className="add-entity__form" onSubmit={handleSubmit}>
        {error && <div className="add-entity__error">{error}</div>}

        <div className="add-entity__form-group">
          <label htmlFor="name" className="add-entity__label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="add-entity__input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter place name"
            required
          />
        </div>

        <div className="add-entity__form-group">
          <label htmlFor="location" className="add-entity__label">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            className="add-entity__input"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>

        <div className="add-entity__form-group">
          <label htmlFor="description" className="add-entity__label">Description</label>
          <textarea
            id="description"
            name="description"
            className="add-entity__textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the place"
            required
          />
        </div>

        <div className="add-entity__form-group">
          <label htmlFor="rating" className="add-entity__label">Rating (0-5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            className="add-entity__input"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            placeholder="Enter rating"
            required
          />
        </div>

        <div className="add-entity__form-group">
          <label htmlFor="image" className="add-entity__label">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            className="add-entity__input"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <div className="add-entity__buttons">
          <button type="submit" className="add-entity__submit">
            Add Place
          </button>
          <button
            type="button"
            className="add-entity__cancel"
            onClick={() => navigate("/places")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEntity; 