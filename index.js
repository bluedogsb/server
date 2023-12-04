require('dotenv').config({ path: 'config.env' });
/* Mongoose Models -- keep instantiation of Users BEFORE routes */
require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require("passport");
require('./services/passport');

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

/* Connect DB before listening to PORT */
connectDB().then(() => {
    if(mongoose.connection.readyState) {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    } else {
        console.log(error);
    }
})

/* EXPRESS Server */
const app = express();

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
app.use(express.json());
// app.use(express.urlencoded({ extended: true}));

app.use((req, res) => {
    console.log(req.body); // this is what you want           

    res.on("finish", () => {
        console.log(res);
    });

});

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

/* ******** ISSUE IS THE ORDER OF ROUTING AND CONNECTING TO DB */

const PORT = process.env.PORT || 3000;


