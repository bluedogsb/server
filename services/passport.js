const passport = require('passport');
/* GOOGLE AUTH */
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env'});

const User = mongoose.model('users');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            // console.log('accessToken', accessToken);
            // console.log('profile', profile.id);
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                } else {
                    // we don't have a user record with this ID, make a new record
                    //matches id with profile id and creates a new mongoose User
                    new User({ googleId: profile.id}).save();
                }
            })
        }
    )
);