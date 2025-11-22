import express, { Request, Response } from 'express';
import Restaurant, { IRestaurant } from '../models/restaurant.model';

const router = express.Router();

// GET restaurants with optional search and filter parameters
router.get('/', async (req: Request, res: Response) => {
  try {
    // 1. Get search and filter terms from the request query (URL parameters)
    const { search, cuisine } = req.query;

    // 2. Build the query object for MongoDB
    const query: any = {};

    // Filter by Cuisine
    if (cuisine && typeof cuisine === 'string') {
      // Use case-insensitive matching for filtering
      query.cuisine = { $regex: new RegExp(cuisine, 'i') };
    }

    // Search by Name
    if (search && typeof search === 'string') {
      // FIX: Use the caret (^) to ensure the search term matches the START of the name
      query.name = { $regex: new RegExp('^' + search, 'i') };
    }

    // 3. Execute the search and filtering using the built query
    const restaurants: IRestaurant[] = await Restaurant.find(query);

    // 4. Send the filtered list back
    res.json(restaurants);
    
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;