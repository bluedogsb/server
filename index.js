require('dotenv').config({ path: 'config.env' });
/* Mongoose Models -- keep instantiation of Users BEFORE routes */
require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
// const cookieSession = require('cookie-session');
const session = require('express-session');
// var MongoStore = require('connect-mongo')(session);
const passport = require("passport");
require('./services/passport');

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

/* EXPRESS Server */
const app = express();

app.get('/', (req, res) => {
    res.json({ "every thing": "is awesome" })
})

/* Cookie keys to indicate the cookie is unique  */ 
// const cookieKey = process.env.COOKIE_KEY
// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         keys: cookieKey
//     })
// );
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveuninitialized: false,
    cookie: { secure: true },
    // store: new MongoStore({
    //     mongooseConnection: mongoose.connection
    // })
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3000;