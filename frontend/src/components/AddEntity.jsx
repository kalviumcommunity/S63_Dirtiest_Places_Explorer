import { useState, useEffect } from "react";

const AddEntityForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [places, setPlaces] = useState([]);

  // Fetch the updated list of places
  useEffect(() => {
    fetch("http://localhost:8000/api/entities")
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlace = { name, description, image, location };




    await fetch("http://localhost:8000/api/entities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlace),
    });

    // Refresh the list after submission
    fetch("http://localhost:8000/api/entities")
      .then((res) => res.json())
      .then((data) => setPlaces(data));

    // Clear form fields
    setName("");
    setDescription("");
    setImage("");
    setLocation("");
  };

  return (
    <div>
      <h2>Add a New Dirty Place</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>

      <h3>Reported Places</h3>
      <ul>
        {places.map((place) => (
          <li key={place._id}>
            <h4>{place.name}</h4>
            <p>{place.description}</p>
            <img src={place.image} alt={place.name} width="100" />
            <p><b>Location:</b> {place.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddEntityForm;
