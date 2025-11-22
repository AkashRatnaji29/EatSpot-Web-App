import React from 'react';
import './App.css'; 

const About: React.FC = () => {
  return (
    <div className="App">
      <div className="about-container">
        <h1>Our Mission at EatSpot</h1>
        
        <p>Welcome to EatSpot — your favorite new destination for discovering the perfect meal. We believe finding a great local restaurant should be simple, fast, and inspiring.</p>

        <h2>Why Choose EatSpot?</h2>
        
        <div className="features-grid">
            <div className="feature-item">
                <h3>🔍 Instant Discovery</h3>
                <p>Our powerful, live search and filter tools cut through the clutter, allowing you to find exactly what you're craving—whether it's Italian, Mexican, or a great burger—in seconds.</p>
            </div>
            <div className="feature-item">
                <h3>🍽️ Curated Listings</h3>
                <p>We focus on quality. Every restaurant listing is clearly presented with key details, making your decision effortless and guaranteeing a great dining experience.</p>
            </div>
            <div className="feature-item">
                <h3>✨ Effortless Experience</h3>
                <p>Built with modern technology, our website is lightning-fast and easy to navigate on any device, ensuring a smooth and enjoyable experience from the first click to the final order.</p>
            </div>
        </div>

        <p style={{marginTop: '30px', textAlign: 'center', fontSize: '1.1em', color: '#555'}}>Start exploring today and find your next favorite meal!</p>
      </div>
    </div>
  );
};

export default About;