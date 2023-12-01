require('dotenv').config({ path: 'config.env' });

/* Mongoose Models -- keep instantiation of Users BEFORE routes */
require('./models/User');

const express = require('express');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

/* Mongoose MongoDB */ 
const DB = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        await mongoose.model('User').findOne();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


/* EXPRESS Server */
const app = express();

//Routes go here
app.get('/', (req, res) => {
    res.json({ "every thing": "is awesome" })
})

app.post('/', (req, res) => {
    res.send('POST request to the homepage')
})
// app.all('/secret', (req, res, next) => {
//     console.log('Accessing the secret section ...')
//     next() // pass control to the next handler
// })

// Connect to the database before listening
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log("listening for requests");
//     })
// })

authRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('App listening on port ' + PORT));




