const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env'});

const User = mongoose.model('users');

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
            //matchese id with profile id and creates a new mongoose User
            new User({ googlgeId: profile.id }).save()
        }
    )
);