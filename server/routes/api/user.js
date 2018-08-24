const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

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
  console.log(hash);
  const newUser = new User({name, email, password: hash});
  res.json(newUser);
  //   bcrypt.genSalt(10, (err, salt) => {
  //     bcrypt.hash(newUser.password, salt, (err, hash) => {
  //       if (err) throw err;
  //       newUser.password = hash;
  //       newUser
  //         .save()
  //         .then(user => res.json(user))
  //         .catch(err => console.log(err));
  //     });
  //   });
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
    return res.status(404).json({email: 'User not found'});
  }

  // check password
  bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {
      // User matched
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      }; // Create JWT Payload

      // Sign the token
      jwt.sign(payload, keys.jwtSecretKey, {expiresIn: 3600}, (err, token) => {
        res.json({
          success: true,
          token: `Bearer ${token}`,
        });
      });
    } else {
      return res.status(400).json({password: 'Password incorrect'});
    }
  });
});

module.exports = router;
