const User = require('../models/user');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');

  exports.login = async (req, res) => {
    try {
      const { role, email, password } = req.body;

      const user = await User.findOne({
        email: { $regex: new RegExp(`^${email}$`, 'i') },
        role: { $regex: new RegExp(`^${role}$`, 'i') },
      });
      if (!user) {
        return res.status(401).json({ message: 'Invalid role or email' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        success: true,
        message: 'Login successful',
        role: user.role,
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };