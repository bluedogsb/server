const passport = require('passport');

/* PASSPORT SETUP */

/* Middleware used in protected routes to 
check if the user has been authenticated */
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

module.exports = (app) => {

    // Consent Screen 
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', 
        passport.authenticate('google', {
            failureRedirect: '/failed', 
        }), 
        function (req, res) {
            res.redirect('/success')
        });
    // app.get("/auth/google/callback", passport.authenticate('google'), (req, res, next) => {
    //     user = req.user
    //     res.send(user)
    //     console.log('user', user);
    // });

    app.get('/failed', (req, res) => {
        console.log("User is not authenticated");
        res.send("Failed")
    })

    app.get("/success", isLoggedIn, (req, res) => {
        console.log('You are logged in');
        res.send(`Welcome ${req.user.displayName}`)
    })

    app.get('api/logout', (req, res) => {
        req.session.destroy((err) => {
            if(err) {
                console.log('Error while destroying sess', err);
            } else {
                req.logout(() => {
                    console.log('You are logged out' );
                    res.redirect('/')
                })
            }
        })
    })

    app.get('/api/current_user', (req, res) => {
        if (req.user) {
            console.log("Current User from the api/current_user");
            console.log('what is the req***', req);
            // res.send(req.user);
        } 
        else {
            res.send('Please login by this URL: http://wild-sun-hat-frog.cyclic.app//auth/google');
        }
    });
}



