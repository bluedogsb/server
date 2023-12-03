require('dotenv').config({ path: 'config.env' });
/* Mongoose Models -- keep instantiation of Users BEFORE routes */
require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require("passport");
require('./services/passport');

/* EXPRESS Server */
const app = express();

/* Mongoose Connect */ 
const DB = process.env.MONGO_URI
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const cookieKey = process.env.COOKIE_KEY
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: cookieKey
    })
);
app.use(passport.initialize());
app.use(passport.session());

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

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

/* Connect DB before listening to PORT */
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})

const PORT = process.env.PORT || 3000;



