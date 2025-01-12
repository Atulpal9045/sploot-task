const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  console.log('jwt sceret--', JWT_SECRET)
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ statusCode: 400, message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ statusCode: 401, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ statusCode: 200, data: { token, user: { name: user.name, email: user.email } } });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error?.message || 'Internal Server Error!' });
  }
});


router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ statusCode: 400, message: 'Username, email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ statusCode: 409, message: 'User already exists!' });
    }
    const newUser = new User({name: username, email, password: await bcrypt.hash(password, 10)});
    await newUser.save();
    console.log(newUser)
    res.json({ statusCode: 200, data: { user: { name: user.name, email: user.email } } });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error?.message || 'Internal Server Error!'});
  }
});


router.get('/me', authMiddleware, async (req, res) => {
  const user = req.user;
  try {
    const userDetails = await User.findById(user.userId);
    if (!userDetails) {
      return res.status(403).json({ statusCode: 403, message: 'User not found, access forbidden' });
    }
    res.json({ statusCode: 200, data: { user: { name: userDetails.name, email: userDetails.email } } });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error?.message || 'Internal Server Error!'});
  }
});

module.exports = router;
