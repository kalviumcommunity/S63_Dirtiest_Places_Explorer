import React from "react";

const PlaceCard = ({ place, onDelete, onEdit }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden h-full">
      <img 
        src={place.image}
        alt={place.name}
        className="w-full h-48 object-cover"
      />
      <h2>{place.name}</h2>
      <p>{place.description}</p>
      <button className="text-blue-500" onClick={onEdit}>Edit</button>
      <button className="delete-button" onClick={onDelete}>Delete</button>
    </div>
  );
};

export default PlaceCard;