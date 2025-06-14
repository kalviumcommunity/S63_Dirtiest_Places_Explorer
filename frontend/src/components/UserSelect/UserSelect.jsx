import { useState } from "react";
import "../../styles/components/UserSelect.css";

function UserSelect({ users, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (user) => {
    setSelectedUser(user);
    onSelect(user);
    setIsOpen(false);
  };

  return (
    <div className="user-select">
      <div className="user-select__header">
        <h2 className="user-select__title">Select User</h2>
        <p className="user-select__subtitle">Choose a user to view their places</p>
      </div>

      <div className="user-select__dropdown">
        <button
          className="user-select__button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedUser ? selectedUser.name : "Select a user"}
        </button>

        {isOpen && (
          <div className="user-select__menu">
            <input
              type="text"
              className="user-select__search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {filteredUsers.length === 0 ? (
              <div className="user-select__empty">
                No users found
              </div>
            ) : (
              <div className="user-select__list">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    className="user-select__item"
                    onClick={() => handleSelect(user)}
                  >
                    {user.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSelect; 