import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import restaurantRouter from './routes/restaurant.routes'; 
import authRouter from './routes/auth.routes'; // <-- NEW IMPORT

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows the server to read JSON data from requests

// 1. DATABASE CONNECTION LOGIC
const uri = process.env.MONGO_URI || '';

if (uri) {
  mongoose.connect(uri)
    .then(() => {
      console.log("MongoDB connection successful!");
    })
    .catch(err => {
      console.error("MongoDB connection error:", err.message);
    });
} else {
  console.error("MONGO_URI not defined in .env file. Database connection skipped.");
}

// 2. APPLICATION ROUTES
// Route for Restaurant Listing, Search, and Filter
app.use('/api/restaurants', restaurantRouter);

// Route for User Authentication (Sign Up/Login)
app.use('/api/auth', authRouter); // <-- NEW ROUTER ADDED

// Basic Test Route 
app.get('/', (req: Request, res: Response) => {
  res.send('EatSpot Backend Server Running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});