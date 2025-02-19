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
    "https://www.hindustantimes.com/ht-img/img/2023/06/15/1600x900/A-view-of-the-garbage-dump-site-in-Ludhiana-on-Thu_1686851049492.jpg",
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
