import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/components/UpdateEntity.css";

function UpdateEntity({ entities, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    rating: "",
    image: "",
    images: [],
    imagePreviews: []
  });
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const entity = entities.find(e => e._id === id || e.id === id);
    if (entity) {
      setFormData({
        name: entity.name,
        location: entity.location,
        description: entity.description,
        rating: entity.rating.toString(),
        image: entity.image || "",
        images: entity.images || [],
        imagePreviews: entity.images?.map(img => img) || []
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

  const handleSubmit = async (e) => {
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

    // Prepare FormData for API
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("rating", formData.rating);
    if (formData.category) formDataToSend.append("category", formData.category);
    if (formData.reportedOn) formDataToSend.append("reportedOn", formData.reportedOn);
    if (formData.commentsCount) formDataToSend.append("commentsCount", formData.commentsCount);
    if (formData.images && formData.images.length > 0 && typeof formData.images[0] !== 'string') {
      formData.images.forEach(file => {
        formDataToSend.append("images", file);
      });
    }

    try {
      const response = await fetch(`http://localhost:5004/api/places/${id}`, {
        method: "PUT",
        body: formDataToSend,
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update place");
      navigate("/places");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5004/api/places/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!response.ok) throw new Error("Failed to delete place");
      navigate("/places");
    } catch (err) {
      setError(err.message);
    }
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
          <label className="update-entity__label">Images</label>
          {Array.isArray(formData.images) && formData.images.length > 0 && formData.images.every(img => typeof img === 'string') && (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {formData.images.map((img, idx) => (
                <img key={idx} src={img} alt={`Current ${idx+1}`} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '0.5rem', border: '1.5px solid #e2e8f0' }} />
              ))}
            </div>
          )}
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="update-entity__input"
            multiple
            onChange={e => {
              const files = Array.from(e.target.files);
              setFormData(prev => ({
                ...prev,
                images: files,
                imagePreviews: files.map(file => URL.createObjectURL(file))
              }));
            }}
          />
          {formData.imagePreviews && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {formData.imagePreviews.map((src, idx) => (
                <img key={idx} src={src} alt={`Preview ${idx+1}`} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '0.5rem', border: '1.5px solid #e2e8f0' }} />
              ))}
            </div>
          )}
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