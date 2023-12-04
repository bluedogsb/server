/* Passport middleware to Node and Express to handle authentication */
const passport = require('passport');
/*GoogleStrategy is to handle google authentication in express */
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require("passport-jwt").Strategy
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const User = mongoose.model('users');


/* Google Strategy */ 

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            passReqToCallback: true
        },
        (accessToken, refreshToken, profile, done, session) => {
            // User.findOne(
            //     { 
            //         googleId: profile.id,
            //         session: false
            //     })
            //     .then(existingUser => {
            //     if (existingUser) {
            //         // we already have a record with the given profile ID
            //         console.log('user is: ', existingUser);
            //         done(null, existingUser);
            //     } else {
            //         // we don't have a user record with this ID, make a new record!
            //         new User({ googleId: profile.id })
            //             .save().then(user => done(null, user));
            //             console.log('created new user: ', user);
            //     }
            // });
            User.findOrCreate(
                { googleId: profile.id },
                { first_name: profile.displayName },
                function (err, user) {
                    return done(err, user)
                }
            );
        }
    )
);

/* JWT Strategy */
const cookieExtractor = (req) => {
    let token = null; 
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token; 
}

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: cookieExtractor, 
            secretOrKey: process.env.SECRET_SESSION_KEY
        },
        (payload, done) => {
            User.findById(payload.sub, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

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

