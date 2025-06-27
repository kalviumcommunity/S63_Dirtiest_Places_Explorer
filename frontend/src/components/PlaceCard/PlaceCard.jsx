import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/PlaceCard.css";

function PlaceCard({ place, categoryColor }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!place) {
    return <div className="place-card">Loading...</div>;
  }

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "#e53e3e"; // Red for highly polluted
    if (rating >= 4) return "#ed8936"; // Orange
    if (rating >= 3) return "#ecc94b"; // Yellow
    return "#48bb78"; // Green
  };

  const formatRating = (rating) => {
    const numRating = Number(rating) || 0;
    return numRating.toFixed(1);
  };

  return (
    <div className="place-card">
      <div 
        className="place-card__image-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={
            (Array.isArray(place.images) && place.images.length > 0 && place.images[0]) ||
            place.image ||
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+"
          }
          alt={place.name || "Place"}
          className="place-card__image"
        />
        <div className="place-card__overlay">
          <div className="place-card__rating" style={{ color: getRatingColor(place.rating) }}>
            <span className="place-card__rating-value">{formatRating(place.rating)}</span>
            <span className="place-card__rating-max">/5</span>
            {place.rating >= 4.5 && <span className="place-card__hot">🔥</span>}
          </div>
        </div>
        <span className="place-card__category-badge" style={{ background: categoryColor }}>{place.category || "Unknown"}</span>
        {isHovered && (
          <div className="place-card__hover-info">
            <div className="place-card__hover-content">
              <h4>Quick Facts</h4>
              <ul>
                <li>Category: {place.category || "Unknown"}</li>
                <li>Rating: {formatRating(place.rating)}/5</li>
                <li>Comments: {place.commentsCount || 0}</li>
                <li>Reported: {place.reportedOn ? new Date(place.reportedOn).toLocaleDateString() : "Unknown date"}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="place-card__content">
        <h3 className="place-card__title">{place.name || "Unnamed Place"}</h3>
        <div className="place-card__location">
          <span className="place-card__location-icon">📍</span>
          {place.location || "Location not specified"}
        </div>
        <p className="place-card__description">{place.description || "No description available"}</p>
        <div className="place-card__meta">
          <span className="place-card__comments">💬 {place.commentsCount || 0} Comments</span>
          <span className="place-card__reported">🕒 {place.reportedOn ? new Date(place.reportedOn).toLocaleDateString() : "Unknown date"}</span>
        </div>
        <div className="place-card__actions">
          <Link 
            to={`/update-place/${place._id || place.id || 'unknown'}`} 
            className="place-card__edit"
          >
            Edit Details
          </Link>
          <Link 
            to={`/places/${place._id || place.id || 'unknown'}`} 
            className="place-card__view"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard; 