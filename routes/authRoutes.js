const passport = require('passport');

/* PASSPORT SETUP */

module.exports = (app) => {

    app.get('*', (req, res) => {
        res.json({ "every thing": "is awesome" })
        res.send({ title: 'users' });
        console.log('****request: ', req);
    })

    // Consent Screen 
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get("/auth/google/callback", passport.authenticate('google'), (req, res, next) => {
        user = req.user
        res.send(user)
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })

};



