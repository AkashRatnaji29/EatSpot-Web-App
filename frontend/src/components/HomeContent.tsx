import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Restaurant } from '../types/restaurant';
import '../App.css'; 

const HomeContent = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [error, setError] = useState<string | null>(null); // <-- NEW STATE

  const API_URL = 'http://localhost:5000/api/restaurants';

  const fetchRestaurants = async () => {
    setError(null); // Clear previous errors
    try {
      const url = `${API_URL}?search=${searchTerm}&cuisine=${selectedCuisine}`;
      const response = await axios.get<Restaurant[]>(url);
      setRestaurants(response.data);
    } catch (err) {
      console.error("Failed to fetch restaurants:", err);
      setError('Could not connect to the server or database. Please check the backend.'); // <-- SET ERROR
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [searchTerm, selectedCuisine]);

  const isSearchActive = searchTerm.length > 0 || selectedCuisine.length > 0;

  // --- PRIORITY RENDERING LOGIC ---
  return (
    <>
      <div className="banner-container">
        <div className="promo-banner">
          🔥 New Today: Discover the best local deals with EatSpot Pro!
        </div>
      </div>
      <div className="App">
        <h1>Find Your Next Favorite Meal</h1>
        
        {/* Search and Filter Controls */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search by restaurant name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="filter-select"
          >
            <option value="">All Cuisines</option>
            <option value="Italian">Italian</option>
            <option value="Indian">Indian</option>
            <option value="Mexican">Mexican</option>
            <option value="Japanese">Japanese</option>
            <option value="American">American</option>
          </select>
        </div>

        {/* 1. ERROR MESSAGE (Highest Priority) */}
        {error ? (
          <h2 className="error-message">{error}</h2>
        ) : (
          /* 2. MATCH COUNT OR FEATURED HEADING */
          <h2 className="match-count">
            {isSearchActive ? `Total Matches: ${restaurants.length}` : 'Featured Restaurants'}
          </h2>
        )}
        
        {/* 3. RESTAURANT LIST */}
        <div className="restaurant-list">
          {!error && restaurants.length === 0 && isSearchActive ? (
            <p>No restaurants found matching your criteria.</p>
          ) : (
            restaurants.map((restaurant) => (
              <div key={restaurant._id} className="restaurant-card">
                {/* Image */}
                <div className="card-image-container">
                  <img src={restaurant.imageUrl} alt={restaurant.name} className="restaurant-image" />
                </div>

                {/* Content */}
                <div className="card-content"> 
                  <h3>{restaurant.name}</h3>

                  {/* Rating */}
                  {restaurant.rating && (
                    <div className="rating-bar">
                        ⭐ {restaurant.rating.toFixed(1)}
                    </div>
                  )}
                  
                  <p className="cuisine-tag">Cuisine: {restaurant.cuisine}</p>
                  <p>{restaurant.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HomeContent;