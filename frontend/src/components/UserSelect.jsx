import { useState, useEffect } from "react";

const UserSelect = () => {
  const [users, setUsers] = useState([]);
  const [entities, setEntities] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  // ✅ Fetch Users for the Dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5004/api/mysql/users");
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Fetch Entities Based on Selected User
  useEffect(() => {
    if (!selectedUser) return;

    const fetchEntities = async () => {
      try {
        const res = await fetch(`http://localhost:5004/api/entities?created_by=${selectedUser}`);
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        const data = await res.json();
        setEntities(data);
      } catch (err) {
        console.error("Error fetching entities:", err);
      }
    };

    fetchEntities();
  }, [selectedUser]);

  const handleUserChange = (e) => {
    const selectedId = e.target.value;
    setSelectedUser(selectedId);
    setEntities([]); // Reset previous data when changing user
  };

  return (
    <div>
      <h2>Select User to View Reports</h2>
      <select onChange={handleUserChange} value={selectedUser}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <h3>Reports by Selected User</h3>
      {entities.length === 0 ? (
        <p>{selectedUser ? "No reports found for this user." : "Please select a user."}</p>
      ) : (
        <ul>
          {entities.map((entity) => (
            <li key={entity._id}>
              <h4>{entity.name}</h4>
              <p>{entity.description}</p>
              <p>
                Location: {entity.location?.latitude ?? "N/A"}, {entity.location?.longitude ?? "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSelect;
