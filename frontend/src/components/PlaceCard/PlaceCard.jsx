import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/PlaceCard.css";

function PlaceCard({ place, categoryColor }) {
  const [isHovered, setIsHovered] = useState(false);

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "#e53e3e"; // Red for highly polluted
    if (rating >= 4) return "#ed8936"; // Orange
    if (rating >= 3) return "#ecc94b"; // Yellow
    return "#48bb78"; // Green
  };

  const formatRating = (rating) => rating.toFixed(1);

  return (
    <div 
      className="place-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="place-card__image-container">
        <img
          src={place.image || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={place.name}
          className="place-card__image"
        />
        <div className="place-card__overlay">
          <div className="place-card__rating" style={{ color: getRatingColor(place.rating) }}>
            <span className="place-card__rating-value">{formatRating(place.rating)}</span>
            <span className="place-card__rating-max">/5</span>
            {place.rating >= 4.5 && <span className="place-card__hot">🔥</span>}
          </div>
        </div>
        <span className="place-card__category-badge" style={{ background: categoryColor }}>{place.category}</span>
      </div>
      
      <div className="place-card__content">
        <h3 className="place-card__title">{place.name}</h3>
        <div className="place-card__location">
          <span className="place-card__location-icon">📍</span>
          {place.location}
        </div>
        <p className="place-card__description">{place.description}</p>
        <div className="place-card__meta">
          <span className="place-card__comments">💬 {place.commentsCount} Comments</span>
          <span className="place-card__reported">🕒 {new Date(place.reportedOn).toLocaleDateString()}</span>
        </div>
        <div className="place-card__actions">
          <Link 
            to={`/update-place/${place.id}`} 
            className="place-card__edit"
          >
            Edit Details
          </Link>
          <Link 
            to={`/places/${place.id}`} 
            className="place-card__view"
          >
            View Details
          </Link>
        </div>
        {isHovered && (
          <div className="place-card__hover-info">
            <div className="place-card__hover-content">
              <h4>Quick Facts</h4>
              <ul>
                <li>Category: {place.category}</li>
                <li>Rating: {formatRating(place.rating)}/5</li>
                <li>Comments: {place.commentsCount}</li>
                <li>Reported: {new Date(place.reportedOn).toLocaleDateString()}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaceCard; 