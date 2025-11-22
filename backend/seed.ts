import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Restaurant, { IRestaurant } from './models/restaurant.model';

dotenv.config();

const uri = process.env.MONGO_URI || '';

// Data structure updated with working image URLs from Unsplash CDN
const seedData: { name: string; cuisine: string; description: string; rating: number; imageUrl: string }[] = [
  // Pasta Palace (Italian)
  { name: 'Pasta Palace', cuisine: 'Italian', description: 'Classic Italian dishes in a cozy setting.', rating: 4.5, imageUrl: '/images/pasta-palace.jpg' },
  
  // Spice Route (Indian)
  { name: 'Spice Route', cuisine: 'Indian', description: 'Authentic flavors of North India.', rating: 4.8, imageUrl: '/images/spice-route.png' },
  
  // Taco Fiesta (Mexican)
  { name: 'Taco Fiesta', cuisine: 'Mexican', description: 'The best tacos and margaritas in town.', rating: 4.2, imageUrl: '/images/TacoFiesta.jpg' },
  
  // Sushi Zen (Japanese)
  { name: 'Sushi Zen', cuisine: 'Japanese', description: 'Fresh, expertly prepared sushi and sashimi.', rating: 4.7, imageUrl: 'images/Sushi Zen.jpg' },
  
  // Burger Bliss (American)
  { name: 'Burger Bliss', cuisine: 'American', description: 'Gourmet burgers and thick milkshakes.', rating: 3.9, imageUrl: 'images/burger-bliss.jpg' },
];

const seedDatabase = async () => {
  if (!uri) {
    console.error("MONGO_URI is not defined.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("Database connection established for seeding.");
    await Restaurant.deleteMany({});
    console.log("Existing restaurants cleared.");
    await Restaurant.insertMany(seedData);
    console.log(`Successfully added ${seedData.length} restaurant records with images and ratings.`);

  } catch (err: any) {
    console.error("Seeding error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Database connection closed.");
  }
};

seedDatabase();