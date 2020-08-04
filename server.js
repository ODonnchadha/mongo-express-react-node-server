const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const passport = require('passport');

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');

// app
const app = express();
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

// mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`db connection: ${db}`))
  .catch(err => {
    console.log(`db connection err: ${err}`)
  });

// passport
require('./config/passport')(passport);

// routes
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);

// port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});