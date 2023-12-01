require('dotenv').config({ path: 'config.env' });
/* Mongoose Models -- keep instantiation of Users BEFORE routes */
require('./models/User');
const express = require('express');
require('./services/passport');
const mongoose = require('mongoose');

/* Mongoose MongoDB */
const DB = process.env.MONGO_URI;
mongoose.connect(DB);
// mongoose.set('strictQuery', false);
// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(DB);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

/* EXPRESS Server */
const app = express();

//Routes go here
app.get('/', (req, res) => {
    res.json({ "every thing": "is awesome" })
    res.send({ title: 'Users'});
})

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('App listening on port ' + PORT));




