const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const User = require('../../models/User');
const passport = require('passport');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const {name, email, password} = req.body;
  const user = await User.findOne({email});
  if (user) {
    return res.status(400).json({error: 'Email already exist'});
  }

  var hash = bcrypt.hashSync(password.trim(), 10);
  const newUser = new User({name, email, password: hash});
  await newUser.save();
  res.json(newUser);
});

// @route   POST api/users/login
// @desc    Login user / Returning the JWT token
// @access  Public
router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  // Find user by email
  const user = await User.findOne({email});

  // check for user
  if (!user) {
    return res.status(404).json({error: 'User not found'});
  }

  // check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // User matched
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    // Create JWT Payload
    // Sign the token
    jwt.sign(
      payload,
      keys.jwtSecretKey,
      {expiresIn: 60 * 60 * 24},
      (err, token) => {
        res.json({
          success: true,
          token: `Bearer ${token}`,
        });
      },
    );
  } else {
    return res.status(400).json({error: 'Password incorrect'});
  }
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json(req.user);
  },
);

module.exports = router;
