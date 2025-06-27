import { useParams, Link } from "react-router-dom";
import "../styles/components/PlaceDetails.css";

function PlaceDetails({ entities }) {
  const { id } = useParams();
  const place = entities.find(e => e._id === id || e.id === id);

  if (!place) {
    return (
      <div className="place-details">
        <h2>Place not found</h2>
        <Link to="/places">Back to Places</Link>
      </div>
    );
  }

  // Support multiple images if available
  const images = Array.isArray(place.images) && place.images.length > 0
    ? place.images
    : [];

  return (
    <div className="place-details">
      <div className="place-details__card">
        <div className="place-details__gallery">
          {images.length > 0 ? (
            images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={place.name || `Place Image ${idx+1}`}
                className="place-details__image"
              />
            ))
          ) : (
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+"
              alt="No Image"
              className="place-details__image"
            />
          )}
        </div>
        <div className="place-details__content">
          <h2 className="place-details__title">{place.name}</h2>
          <div className="place-details__meta">
            <span className="place-details__category">{place.category}</span>
            <span className="place-details__rating">⭐ {Number(place.rating).toFixed(1)} / 5</span>
          </div>
          <p className="place-details__location"><strong>Location:</strong> {place.location}</p>
          <p className="place-details__desc">{place.description}</p>
          <div className="place-details__info">
            <span><strong>Reported On:</strong> {place.reportedOn ? new Date(place.reportedOn).toLocaleDateString() : "Unknown date"}</span>
            <span><strong>Comments:</strong> {place.commentsCount || 0}</span>
          </div>
          <Link to="/places" className="place-details__back">← Back to Places</Link>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails; 