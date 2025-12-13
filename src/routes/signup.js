const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/login', authController.login);

router.post('/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

module.exports = router;