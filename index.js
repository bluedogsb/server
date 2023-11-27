require('dotenv').config();
const express = require('express');
const passport = require('passport');

/* GOOGLE AUTH */ 
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        (accessToken) => {
            console.log(accessToken);
        }
    )
);

/* PASSPORT SETUP */ 

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        // Successful authentication, redirect success.
        res.redirect('/success');
    });


/* EXPRESS PORT */
const app = express();
const PORT = process.env.PORT || 3000;
// app.listen(PORT);
app.listen(PORT, () => console.log('App listening on port ' + PORT));
