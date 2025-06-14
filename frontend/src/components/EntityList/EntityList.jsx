import { useState } from "react";
import "../../styles/components/EntityList.css";
import PlaceCard from "../PlaceCard/PlaceCard";

function EntityList({ entities }) {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredEntities = entities.filter(entity =>
    entity.name.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEntities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntities = filteredEntities.slice(startIndex, endIndex);

  return (
    <div className="entity-list">
      <div className="entity-list__header">
        <h2 className="entity-list__title">Places</h2>
        <div className="entity-list__search">
          <input
            type="text"
            className="entity-list__search-input"
            placeholder="Search places..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <span className="entity-list__search-icon">🔍</span>
        </div>
      </div>

      {currentEntities.length === 0 ? (
        <div className="entity-list__empty">
          <p>No places found</p>
          <p className="entity-list__empty-subtitle">Try adjusting your search or add a new place</p>
        </div>
      ) : (
        <div className="entity-list__grid">
          {currentEntities.map((entity) => (
            <PlaceCard key={entity.id} place={entity} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="entity-list__pagination">
          <button
            className="entity-list__pagination-button"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`entity-list__pagination-button ${
                page === currentPage ? "entity-list__pagination-button--active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          
          <button
            className="entity-list__pagination-button"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default EntityList; 