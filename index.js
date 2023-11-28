require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
const passport = require('passport');

const app = express();

// // Set up logging and body parser
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(logger('dev'));


// Enable sessions
// app.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         saveUninitialized: true, 
//         resave: true,
//     }),
// );

/* GOOGLE AUTH */ 
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('access token', accessToken);
            console.log('refresh token', refreshToken);
            console.log('profile', profile);
        }
    )
);

/* PASSPORT SETUP */ 

// Consent Screen 
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

// Authorized redirect 
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error', session: false }),
    function (req, res) {
        // Successful authentication, redirect success.
        res.send("Success");
        res.redirect('/success');
    });


/* EXPRESS PORT */

const PORT = process.env.PORT || 3000;
// app.listen(PORT);
app.listen(PORT, () => console.log('App listening on port ' + PORT));
