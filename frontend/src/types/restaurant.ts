export interface Restaurant {
  _id: string; 
  name: string;
  cuisine: string;
  description: string;
  rating: number; // <-- NEW
  imageUrl: string; // <-- NEW
}