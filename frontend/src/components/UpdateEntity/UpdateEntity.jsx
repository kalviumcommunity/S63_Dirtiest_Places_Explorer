import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/components/UpdateEntity.css";

function UpdateEntity({ entities, onUpdate, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    rating: "",
    image: ""
  });
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const entity = entities.find(e => e.id === id);
    if (entity) {
      setFormData({
        name: entity.name,
        location: entity.location,
        description: entity.description,
        rating: entity.rating.toString(),
        image: entity.image || ""
      });
    } else {
      setError("Place not found");
    }
  }, [id, entities]);

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

    // Update entity
    const updatedEntity = {
      id,
      ...formData,
      rating: rating
    };

    onUpdate(updatedEntity);
    navigate("/places");
  };

  const handleDelete = () => {
    onDelete(id);
    navigate("/places");
  };

  if (error) {
    return (
      <div className="update-entity">
        <div className="update-entity__error">{error}</div>
        <button
          className="update-entity__back"
          onClick={() => navigate("/places")}
        >
          Back to Places
        </button>
      </div>
    );
  }

  return (
    <div className="update-entity">
      <div className="update-entity__header">
        <h2 className="update-entity__title">Update Place</h2>
        <p className="update-entity__subtitle">Edit the details of this dirty place</p>
      </div>

      <form className="update-entity__form" onSubmit={handleSubmit}>
        {error && <div className="update-entity__error">{error}</div>}

        <div className="update-entity__form-group">
          <label htmlFor="name" className="update-entity__label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="update-entity__input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter place name"
            required
          />
        </div>

        <div className="update-entity__form-group">
          <label htmlFor="location" className="update-entity__label">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            className="update-entity__input"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>

        <div className="update-entity__form-group">
          <label htmlFor="description" className="update-entity__label">Description</label>
          <textarea
            id="description"
            name="description"
            className="update-entity__textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the place"
            required
          />
        </div>

        <div className="update-entity__form-group">
          <label htmlFor="rating" className="update-entity__label">Rating (0-5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            className="update-entity__input"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            placeholder="Enter rating"
            required
          />
        </div>

        <div className="update-entity__form-group">
          <label htmlFor="image" className="update-entity__label">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            className="update-entity__input"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <div className="update-entity__buttons">
          <button type="submit" className="update-entity__submit">
            Update Place
          </button>
          <button
            type="button"
            className="update-entity__delete"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Place
          </button>
          <button
            type="button"
            className="update-entity__cancel"
            onClick={() => navigate("/places")}
          >
            Cancel
          </button>
        </div>
      </form>

      {showDeleteConfirm && (
        <div className="update-entity__confirm">
          <div className="update-entity__confirm-content">
            <h3 className="update-entity__confirm-title">Delete Place</h3>
            <p className="update-entity__confirm-message">
              Are you sure you want to delete this place? This action cannot be undone.
            </p>
            <div className="update-entity__confirm-buttons">
              <button
                className="update-entity__confirm-delete"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="update-entity__confirm-cancel"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateEntity; 