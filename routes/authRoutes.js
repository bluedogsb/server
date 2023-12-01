const passport = require('passport');

/* PASSPORT SETUP */

module.exports = (app) => {
    // Consent Screen 
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    // Authorized redirect 
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/test', (req, res) => { res.send('Hello! Express server connected')})
};



