// /* PASSPORT Routes SETUP */
const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            successRedirect: 'http://localhost:3000/',
            failureRedirect: 'http://localhost:4000/auth/google',
            scope: ['profile', 'email'],
            accessType: 'offline'
        })
    );

    app.get('/auth/google/callback', // add **/auth**
        (req, res, next) => {
            passport.authenticate('google', { failureRedirect: '/auth/google/error' }, async (error, user, info) => {
                if (error) {
                    return res.send({ message: error.message });
                }
                if (user) {
                    try {
                        // your success code
                        return res.send({
                            data: res.data,
                            message: 'Login Successful'
                        });
                    } catch (error) {
                        // error msg 
                        return res.send({ message: error.message });
                    }
                }
            })(req, res, next);
        }); 
    // app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
