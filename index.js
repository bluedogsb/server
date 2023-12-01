require('dotenv').config({ path: 'config.env' });
/* Mongoose Models -- keep instantiation of Users BEFORE routes */
require('./models/User');
const express = require('express');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

/* EXPRESS Server */
const app = express();

//Routes go here
app.get('/', (req, res) => {
    res.json({ "every thing": "is awesome" })
    res.send({ title: 'Users'});
})

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('App listening on port ' + PORT));
