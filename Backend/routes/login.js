// routes/login.js

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthUser = require('../Models/AuthUser');

const jwtSecret = process.env.JWT_SECRET;

// ... rest of the code ...
 // Your JWT secret, make sure it matches the one used while signing the token

// Login Route: POST /api/login
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    let success=false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await AuthUser.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        success=false;
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Create and send a JWT token
      const payload = {
        user: {
          id: user.id,

        },
      };

      jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {

        if (err) throw err;
        
        success=true;
        res.json({success, token });
        

      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error occurred' });
    }
  }
);

router.post(
  '/register',
  [
    body('name', 'Enter a valid name').isLength({min:1}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 4 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password,name } = req.body;

    try {
      // Check if the user already exists with the same email
      const existingUser = await AuthUser.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Create a new user
      const newUser = new AuthUser({
        email,
        password,
        name,
      });

      // Save the user to the database
      await newUser.save();

      // Respond with a success message or JWT token if needed
      const payload = {
        user: {
          id: newUser.id,
        },
      };
      jwt.sign(payload, jwtSecret, { expiresIn: '7h' }, (err, token) => {
        if (err) throw err;
        res.json({ message: 'User registered successfully', authtoken: token });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error occurred' });
    }
  }
);


module.exports = router;
