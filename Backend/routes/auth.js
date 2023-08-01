const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../Models/User');
const auth = require('../middleware/authmiddle'); 



// Create a User (POST /api/users)
router.post(
  '/createticket',auth,
  [
    body('name', 'Name is required').trim().isLength({ min: 1 }),
    body('age', 'Age is required and must be a number').isInt(),
    body('from', 'flight from is required').trim().isLength({ min: 1 }),
    body('to', 'flight to is required').trim().isLength({ min: 1 }),
    body('flightNumber', 'Flight number is required').trim().isLength({ min: 1 }),
    body('departureDate', 'Valid departure date is required').isDate(),
    body('sex', 'Sex must be one of [male, female, other]').isIn(['male', 'female', 'other']),
    body('phoneNumber', 'Valid phone number is required').trim().isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Extract user data from the request body
      const { name, age, flightNumber, from, to, departureDate, sex, phoneNumber } = req.body;

      // Get the user ID from the authenticated user (assuming it is present in req.user.id)
          
      // Create a new user using the User model and include the user ID
      const user = await User.create({
        user: req.user.id,
        name,
        age,
        flightNumber,
        from,
        to,
        departureDate,
        sex,
        phoneNumber,
        // Add any other relevant properties here
      });

      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error occurred' });
    }
  }
);



// Read All Users (GET /api/users)


// Read a Single User (GET /api/users)
router.get('/getuser', auth, async (req, res) => {
  try {
    const user = await User.find({user: req.user.id});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error occurred' });
  }
});


// Delete a User (DELETE /api/users/:userId)
router.delete('/delete/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error occurred' });
  }
});


module.exports = router;
