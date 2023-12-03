require('dotenv').config({ path: 'config.env' });
/* Mongoose Models -- keep instantiation of Users BEFORE routes */
require('./models/User');
const express = require('express');
require('./services/passport');
const mongoose = require('mongoose');
const passport = require("passport");

/* EXPRESS Server */
const app = express();
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// app.get('/', (req, res) => {
//     res.json({ "every thing": "is awesome" })
//     res.send({title: 'users'});
// })

const DB = process.env.MONGO_URI

/* Mongoose Connect */ 
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
connectDB();

/* ERROR Catch */ 
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// app.get('/add-user', async (req, res) => {
//     try {
//         await User.insertOne(googleId);
//     } catch (error) {
//         console.log("err", + error);
//     }
// })

// const PORT = process.env.PORT || 3000;




