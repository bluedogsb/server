require('dotenv').config({ path: 'config.env' });
/* Mongoose Models -- keep instantiation of Users BEFORE routes */
require('./models/User');
const express = require('express');
require('./services/passport');
const mongoose = require('mongoose');


/* EXPRESS Server */
const app = express();

//Routes go here
app.get('/', (req, res) => {
    res.json({ "every thing": "is awesome" })
    res.send({title: 'users'});
})

require('./routes/authRoutes')(app);

/* Mongoose MongoDB */
const DB = process.env.MONGO_URI;
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})

app.get('/add-user', async (req, res) => {
    try {
        await User.insertOne(googleId);
    } catch (error) {
        console.log("err", + error);
    }
})

const PORT = process.env.PORT || 5000;




