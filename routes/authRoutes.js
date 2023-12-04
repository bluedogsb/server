const passport = require('passport');

/* PASSPORT SETUP */

module.exports = (app) => {

    // Consent Screen 
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get("/auth/google/callback", passport.authenticate('google'), (req, res, next) => {
        user = req.user
        res.send(user)
        console.log('user', user);
    });

    app.get('/api/logout', (req, res) => {
        console.log("In api/logout")
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        if (req.user) {
            console.log("Current User from the api/current_user");
            console.log('what is the req***', req);
            // res.send(req.user);
        } 
        else {
            res.send('Please login by this URL: http://localhost:3000/auth/google');
        }
    });
}



