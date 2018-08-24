const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./server/routes/api/user');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// db config
const db = require('./server/config/db').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('mongodb connected successfully'))
  .catch(e => console.log(e));

// use routes
app.use('/api/users', users);

const port = process.env.PORT || 5001;
app.get('/', (req, res) => res.send('came 1'));
app.listen(port, () => {
  console.log('Server start on port', port);
});
