const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const User = mongoose.model('users');
console.log('USER', User)

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: '/auth/google/callback'
//         },
//         (accessToken, refreshToken, profile, done) => {
//             User.findOne({ googleId: profile.id }).then(existingUser => {
//                 if (existingUser) {
//                     console.log('user is: ', existingUser);
//                     // we already have a record with the given profile ID
//                 } else {
//                     // we don't have a user record with this ID, make a new record!
//                     new User({ googleId: profile.id }).save();
//                 }
//             });
//         }
//     )
// );

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    _id: new mongoose.Types.ObjectId(),
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile._json.email
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);