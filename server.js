const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./server/routes/api/user');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// db config
const db = require('./server/config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('mongodb connected successfully'))
  .catch(e => console.log(e));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./server/config/passport')(passport);

// use routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;
app.get('/', (req, res) => res.send('came 1'));
app.listen(port, () => {
  console.log('Server start on port', port);
});
