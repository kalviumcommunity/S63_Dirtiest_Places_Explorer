import { useState, useRef } from "react";
import "../../styles/components/AddEntity.css";

const CATEGORY_OPTIONS = [
  { label: "Industrial Waste", value: "Industrial Waste", color: "#718096" },
  { label: "Litter", value: "Litter", color: "#38b2ac" },
  { label: "Overflowing Sewage", value: "Sewage Overflow", color: "#e53e3e" },
  { label: "Air Pollution", value: "Air Pollution", color: "#805ad5" },
  { label: "Water Pollution", value: "Water Pollution", color: "#3182ce" },
];

function AddEntity({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: CATEGORY_OPTIONS[0].value,
    description: "",
    rating: "",
    images: [],
    reporter: "",
    date: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
    setError("");
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setFormData(prev => ({ ...prev, images: files }));
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).slice(0, 3);
    setFormData(prev => ({ ...prev, images: files }));
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setFormData({
      name: "",
      location: "",
      category: CATEGORY_OPTIONS[0].value,
      description: "",
      rating: "",
      images: [],
      reporter: "",
      date: ""
    });
    setImagePreviews([]);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    if (!formData.name.trim()) return "Place name is required.";
    if (!formData.location.trim()) return "Location is required.";
    if (!formData.category) return "Category is required.";
    if (!formData.description.trim()) return "Description is required.";
    if (!formData.rating) return "Severity rating is required.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setIsLoading(true);
    // Simulate upload
    setTimeout(() => {
      onAdd({
        id: Date.now().toString(),
        ...formData,
        rating: Number(formData.rating),
        image: imagePreviews[0] || "",
        commentsCount: 0,
        reportedOn: formData.date || new Date().toISOString().slice(0, 10)
      });
      setIsLoading(false);
      handleClear();
    }, 1200);
  };

  // Live preview card
  const preview = {
    ...formData,
    image: imagePreviews[0] || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QcmV2aWV3PC90ZXh0Pgo8L3N2Zz4=",
    rating: formData.rating ? Number(formData.rating) : 0,
    commentsCount: 0,
    reportedOn: formData.date || new Date().toISOString().slice(0, 10),
    categoryColor: CATEGORY_OPTIONS.find(c => c.value === formData.category)?.color
  };

  return (
    <div className="add-entity add-entity--modern">
      <div className="add-entity__header">
        <h1 className="add-entity__title">🧹 Report a Dirty or Polluted Place</h1>
        <p className="add-entity__subtitle">
          Help us keep the world cleaner. Share details of any polluted or unhygienic place you come across. Your contribution matters!
        </p>
      </div>
      <div className="add-entity__content">
        <form className="add-entity__form" onSubmit={handleSubmit}>
          {/* Place Name */}
          <div className="add-entity__form-group">
            <label htmlFor="name"><span role="img" aria-label="name">🏷️</span> Place Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="E.g., Ganga River, Kanpur"
              className={error && !formData.name ? "error" : ""}
              autoComplete="off"
              required
            />
          </div>
          {/* Location */}
          <div className="add-entity__form-group">
            <label htmlFor="location"><span role="img" aria-label="location">🌍</span> Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, area or landmark"
              className={error && !formData.location ? "error" : ""}
              required
            />
          </div>
          {/* Category */}
          <div className="add-entity__form-group">
            <label><span role="img" aria-label="category">🏭</span> Pollution Category</label>
            <div className="add-entity__categories">
              {CATEGORY_OPTIONS.map(opt => (
                <label key={opt.value} className="add-entity__category-radio" style={{ borderColor: formData.category === opt.value ? opt.color : '#e2e8f0', background: formData.category === opt.value ? opt.color : '#f7fafc', color: formData.category === opt.value ? '#fff' : '#2d3748' }}>
                  <input
                    type="radio"
                    name="category"
                    value={opt.value}
                    checked={formData.category === opt.value}
                    onChange={() => handleCategoryChange(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
          {/* Description */}
          <div className="add-entity__form-group">
            <label htmlFor="description"><span role="img" aria-label="desc">📝</span> Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue in detail..."
              className={error && !formData.description ? "error" : ""}
              required
            />
          </div>
          {/* Image Upload */}
          <div className="add-entity__form-group">
            <label><span role="img" aria-label="upload">📸</span> Upload Image(s)</label>
            <div
              className="add-entity__upload-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <span className="add-entity__upload-icon">＋</span>
              <span>Drag & drop or click to upload (max 3, .jpg/.png)</span>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                max={3}
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>
            <div className="add-entity__image-previews">
              {imagePreviews.map((src, i) => (
                <img key={i} src={src} alt="preview" className="add-entity__image-thumb" />
              ))}
            </div>
          </div>
          {/* Severity Rating */}
          <div className="add-entity__form-group">
            <label><span role="img" aria-label="star">⭐</span> Severity Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className={error && !formData.rating ? "error" : ""}
              required
            >
              <option value="">Select severity</option>
              {[1,2,3,4,5].map(val => (
                <option key={val} value={val}>{val} - {val === 1 ? "Mild" : val === 5 ? "Severe" : ""}</option>
              ))}
            </select>
          </div>
          {/* Reporter Name */}
          <div className="add-entity__form-group">
            <label htmlFor="reporter"><span role="img" aria-label="user">👤</span> Your Name <span className="add-entity__optional">(optional)</span></label>
            <input
              type="text"
              id="reporter"
              name="reporter"
              value={formData.reporter}
              onChange={handleChange}
              placeholder="Leave blank for anonymous"
            />
          </div>
          {/* Date Observed */}
          <div className="add-entity__form-group">
            <label htmlFor="date"><span role="img" aria-label="date">📅</span> Date Observed <span className="add-entity__optional">(optional)</span></label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().slice(0, 10)}
            />
          </div>
          {/* Error */}
          {error && <div className="add-entity__error">{error}</div>}
          {/* Submit & Clear */}
          <div className="add-entity__form-actions">
            <button type="submit" className="add-entity__submit" disabled={isLoading}>
              {isLoading ? <span className="add-entity__spinner"></span> : "+ Submit Report"}
            </button>
            <button type="button" className="add-entity__clear" onClick={handleClear} disabled={isLoading}>
              Clear All
            </button>
          </div>
          <div className="add-entity__note">
            <span role="img" aria-label="info">ℹ️</span> Your report will be reviewed and published soon. Thank you for contributing!
          </div>
        </form>
        {/* Live Preview Card */}
        <div className="add-entity__preview">
          <div className="add-entity__preview-title">Live Preview</div>
          <div className="add-entity__preview-card">
            <img src={preview.image} alt="preview" className="add-entity__preview-img" />
            <div className="add-entity__preview-content">
              <div className="add-entity__preview-category" style={{ background: preview.categoryColor }}>{preview.category}</div>
              <div className="add-entity__preview-name">{preview.name || "Place Name"}</div>
              <div className="add-entity__preview-location">{preview.location || "Location"}</div>
              <div className="add-entity__preview-rating">⭐ {preview.rating}/5</div>
              <div className="add-entity__preview-date">🕒 {preview.reportedOn}</div>
              <div className="add-entity__preview-desc">{preview.description || "Description will appear here."}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEntity; 