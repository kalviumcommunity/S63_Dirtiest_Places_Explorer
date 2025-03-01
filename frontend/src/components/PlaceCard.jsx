import React from "react";

const PlaceCard = ({ place }) => {
  return (
    <div className="place-card">
      <img
        src={place.image}
        alt={place.title}
        className="w-full h-36 object-cover rounded-md"
      />
      <h2>{place.title}</h2>
      <p>{place.description}</p>
      <p className="location">{place.location}</p>
      <span className="category">{place.category}</span>
    </div>
  );
};

// Example usage with dummy data
const dummyPlace = {
  title: "Garbage Dump at City Center",
  image:
    "https://thumbs.dreamstime.com/b/city-garbage-dump-official-village-86673675.jpg",
  description: "An overflowing garbage dump causing foul smell.",
  location: "Bengaluru, India",
  category: "Littered Streets",
};

export default function App() {
  return (
    <div className="app-container">
      <PlaceCard place={dummyPlace} />
    </div>
  );
}
