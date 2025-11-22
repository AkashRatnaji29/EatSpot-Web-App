import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';

const router = express.Router();

// Route for creating a new user account
router.post('/register', registerUser);

// Route for logging in an existing user
router.post('/login', loginUser);

export default router;