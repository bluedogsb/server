require('dotenv').config({ path: 'config.env' });
/* Mongoose Models -- keep instantiation of Users BEFORE routes */
require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
// const session = require('express-session');
const passport = require("passport");
require('./services/passport');

/* EXPRESS Server */
const app = express();

/* Mongoose.connect */ 
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
    console.log(mongoose.connection.readyState)
    if(mongoose.connection.readyState) {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    } 
})

/* Initialize Passport */
app.use(passport.initialize());

require('./routes/authRoutes')(app);

const authCheck = (req, res, next) => {
    next();
};

app.get("/", authCheck, (req, res) => {
    res.status(200)
    res.json({ "every thing": "is awesome" })
});

const PORT = process.env.PORT || 3000;