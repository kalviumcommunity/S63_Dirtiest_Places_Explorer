import React, { useState } from "react";

const PlaceCard = ({ place }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Convert severity to color
  const getSeverityColor = (category) => {
    const categories = {
      "Littered Streets": "bg-yellow-500",
      "Industrial Waste": "bg-red-500",
      "Water Pollution": "bg-blue-500",
      "Air Pollution": "bg-purple-500",
      "Plastic Waste": "bg-orange-500",
      "Sewage Waste": "bg-green-500"
    };
    
    return categories[category] || "bg-emerald-500";
  };

  // Format date if available
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date) ? "" : date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div 
      className="bg-white shadow-lg rounded-xl overflow-hidden h-full card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with overlay on hover */}
      <div className="relative overflow-hidden h-48">
        <img
          src={place.image}
          alt={place.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-70'}`}></div>
        
        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-block px-3 py-1 text-xs font-medium text-white rounded-full ${getSeverityColor(place.category)}`}>
            {place.category}
          </span>
        </div>
        
        {/* Location info */}
        <div className="absolute bottom-3 left-3 text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm font-medium">{place.location}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{place.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">{place.description}</p>
        
        {/* Footer with metadata */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
          {/* Date if available */}
          <div className="text-xs text-gray-500">
            {place.date && formatDate(place.date)}
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-2">
            {/* Upvote button */}
            <button className="p-1 rounded-full text-gray-500 hover:text-emerald-500 hover:bg-emerald-50 transition-colors" title="Upvote">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            
            {/* Share button */}
            <button className="p-1 rounded-full text-gray-500 hover:text-emerald-500 hover:bg-emerald-50 transition-colors" title="Share">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            
            {/* More info button */}
            <button className="p-1 rounded-full text-gray-500 hover:text-emerald-500 hover:bg-emerald-50 transition-colors" title="More Info">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Status indicator - optional based on data */}
      {place.status && (
        <div className={`w-full h-1 ${
          place.status === 'Resolved' ? 'bg-green-500' : 
          place.status === 'In Progress' ? 'bg-yellow-500' : 'bg-red-500'
        }`}></div>
      )}
    </div>
  );
};

export default PlaceCard;