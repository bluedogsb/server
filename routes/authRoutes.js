const passport = require('passport');

/* PASSPORT SETUP */

module.exports = (app) => {
    // Consent Screen 
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/test', (req, res) => { res.send('Hello! Express server connected') })

    // Authorized redirect 
    // app.get('/auth/google/callback', passport.authenticate('google'));

    app.get("/auth/google/callback", passport.authenticate('google'), (req, res, next) => {
        user = req.user
        res.send(user)
    });
};



