import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Use the secret key defined in .env (Read from environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key'; 

// --- REGISTER (SIGN UP) LOGIC ---
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    // Hash the password securely
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      passwordHash,
    });

    await newUser.save();
    
    // Respond with success
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error: any) {
    // 11000 is the MongoDB error code for duplicate key (e.g., duplicate username)
    if (error.code === 11000) {
        return res.status(409).json({ error: 'Username or Email already in use.' });
    }
    res.status(500).json({ error: 'Server error during registration.' });
  }
};

// --- LOGIN LOGIC ---
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // 2. Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // 3. Generate a JSON Web Token (JWT) for the session
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // 4. Respond with the token and user info
    res.json({ 
        message: 'Login successful!', 
        token, 
        username: user.username 
    });

  } catch (error: any) {
    res.status(500).json({ error: 'Server error during login.' });
  }
};