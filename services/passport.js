/* Passport middleware to Node and Express to handle authentication */
const passport = require('passport');
/*GoogleStrategy is to handle google authentication in express */
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const User = mongoose.model('users');

/* Why Seralizeuser? -> If a user logs in to the application, the user should be checked whether
he/she has already signed in before and to assign a unique value to the user to indicate it's a
returning user. Basically creating a cookie. */
passport.serializeUser((user, done) => {
    done(null, user.id);
})

/* Turn the id into mongoose model instance; cookie deserializer here */
passport.deserializeUser((id, done) => {
    console.log("Deserializing", id);
    console.log(User.findById(id));
    User.findById(id)
        .then(user => {
            done(null, user);
        })
})

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    console.log('user is: ', currentUser);
                    done(null, existingUser);
                } else {
                    // we don't have a user record with this ID, make a new record!
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));

                    console.log('created new user: ', user);
                }
            });
        }
    )
);