import mongoose, { Schema, Document } from 'mongoose';

// Define the structure (Interface) for a Restaurant document in TypeScript
export interface IRestaurant {
  name: string;
  cuisine: string; // e.g., 'Italian', 'Indian', 'Mexican'
  description: string;
  rating: number; // <-- NEW: 1.0 to 5.0
  imageUrl: string; // <-- NEW: URL for the image
}

// Define the structure (Schema) for the database
const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  cuisine: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true }, // <-- NEW
  imageUrl: { type: String, required: true }, // <-- NEW
}, {
  timestamps: true, 
});

// Export the Mongoose Model
const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);

export default Restaurant;