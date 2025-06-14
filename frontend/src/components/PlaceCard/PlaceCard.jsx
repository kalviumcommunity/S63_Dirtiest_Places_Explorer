import { Link } from "react-router-dom";
import "../../styles/components/PlaceCard.css";

function PlaceCard({ place }) {
  return (
    <div className="place-card">
      <div className="place-card__image-container">
        <img
          src={place.image || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={place.name}
          className="place-card__image"
        />
      </div>
      <div className="place-card__content">
        <h3 className="place-card__title">{place.name}</h3>
        <p className="place-card__location">{place.location}</p>
        <p className="place-card__description">{place.description}</p>
        <div className="place-card__rating">
          <span className="place-card__rating-label">Rating:</span>
          <span className="place-card__rating-value">{place.rating}/5</span>
        </div>
        <Link to={`/update-place/${place.id}`} className="place-card__edit">
          Edit
        </Link>
      </div>
    </div>
  );
}

export default PlaceCard; 