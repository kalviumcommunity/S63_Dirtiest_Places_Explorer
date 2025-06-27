import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/EntityList.css";
import PlaceCard from "../PlaceCard/PlaceCard";

const CATEGORY_COLORS = {
  "Air Pollution": "#e53e3e",
  "Sewage Overflow": "#3182ce",
  "Industrial Waste": "#ed8936",
  "Marine Litter": "#38b2ac",
  "Mining Pollution": "#805ad5",
  "Radiation": "#718096",
};

const SORT_OPTIONS = [
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name" },
  { value: "comments", label: "Comments" },
];

function EntityList({ entities }) {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");
  const itemsPerPage = 6;

  // Ensure entities is an array
  const safeEntities = entities || [];

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const allCategories = [
    ...new Set(safeEntities.map(e => e.category).filter(Boolean))
  ];

  let filteredEntities = safeEntities
    .filter(entity =>
      (entity.name && entity.name.toLowerCase().includes(filter.toLowerCase()) ||
      entity.location && entity.location.toLowerCase().includes(filter.toLowerCase())) &&
      (!category || entity.category === category)
    );

  filteredEntities = filteredEntities.sort((a, b) => {
    if (sortBy === "rating") {
      return sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating;
    }
    if (sortBy === "name") {
      const nameA = a.name || '';
      const nameB = b.name || '';
      return sortOrder === "desc"
        ? nameB.localeCompare(nameA)
        : nameA.localeCompare(nameB);
    }
    if (sortBy === "newest") {
      const dateA = a.reportedOn ? new Date(a.reportedOn) : new Date(0);
      const dateB = b.reportedOn ? new Date(b.reportedOn) : new Date(0);
      return sortOrder === "desc"
        ? dateB - dateA
        : dateA - dateB;
    }
    if (sortBy === "comments") {
      return sortOrder === "desc" ? b.commentsCount - a.commentsCount : a.commentsCount - b.commentsCount;
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredEntities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntities = filteredEntities.slice(startIndex, endIndex);

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  return (
    <div className="entity-list">
      <div className="entity-list__hero">
        <h1 className="entity-list__hero-title">Browse the Most Reported Polluted Locations</h1>
        <p className="entity-list__hero-subtitle">
          Discover places reported for poor sanitation or pollution. Join the movement to make our world cleaner.
        </p>
      </div>

      <div className="entity-list__controls">
        <div className="entity-list__search-wrapper">
          <div className="entity-list__search">
            <input
              type="text"
              className="entity-list__search-input"
              placeholder="Search places or locations..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <span className="entity-list__search-icon">🔍</span>
          </div>
        </div>
        <div className="entity-list__sort">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`entity-list__sort-button ${sortBy === opt.value ? "active" : ""}`}
              onClick={() => handleSort(opt.value)}
            >
              {opt.label} {sortBy === opt.value && (sortOrder === "desc" ? "↓" : "↑")}
            </button>
          ))}
        </div>
        <div className="entity-list__category-filter">
          <select
            className="entity-list__category-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="entity-list__loading">
          <div className="entity-list__loading-spinner"></div>
          <p>Loading places...</p>
        </div>
      ) : currentEntities.length === 0 ? (
        <div className="entity-list__empty">
          <div className="entity-list__empty-icon">🔍</div>
          <h3>No places found</h3>
          <p>Try adjusting your search or add a new place</p>
          <Link to="/add-place" className="entity-list__add-button">
            Add New Place
          </Link>
        </div>
      ) : (
        <>
          <div className="entity-list__grid">
            {currentEntities.map((entity) => (
              <PlaceCard key={entity._id || entity.id} place={entity} categoryColor={CATEGORY_COLORS[entity.category] || "#718096"} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="entity-list__pagination">
              <button
                className="entity-list__pagination-button"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="entity-list__pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="entity-list__pagination-button"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <div className="entity-list__stats">
        <div className="entity-list__stat-card">
          <h3>Total Places</h3>
          <p>{safeEntities.length}</p>
        </div>
        <div className="entity-list__stat-card">
          <h3>Average Rating</h3>
          <p>
            {(() => {
              return safeEntities.length > 0 
                ? (safeEntities.reduce((acc, curr) => acc + (curr.rating || 0), 0) / safeEntities.length).toFixed(1)
                : '0.0';
            })()}
          </p>
        </div>
        <div className="entity-list__stat-card">
          <h3>Categories</h3>
          <p>{allCategories.length}</p>
        </div>
      </div>

      <div className="entity-list__cta-section">
        <div className="entity-list__cta-box entity-list__cta-box--report">
          <span role="img" aria-label="warning">⚠️</span> Found a Dirty Place?{' '}
          <Link to="/add-place" className="entity-list__cta-link">Add Report</Link>
        </div>
        <div className="entity-list__cta-box entity-list__cta-box--join">
          <span role="img" aria-label="chat">💬</span> Join the Discussion.{' '}
          <Link to="/signup" className="entity-list__cta-link">Sign Up</Link>
        </div>
        <div className="entity-list__cta-box entity-list__cta-box--share">
          <span role="img" aria-label="star">🌟</span> Rate & Share to Raise Awareness
        </div>
      </div>
    </div>
  );
}

export default EntityList; 