const passport = require('passport');

/* PASSPORT Routes SETUP */

module.exports = (app) => {

    app.get("/login/success", (req, res) => {
        if(req.user) {
            res.json({
                success: true, 
                message: "user has successfully authenticated",
                user: req.user, 
                cookies: req.cookies
            });
        }
    });

    app.get("login/failed", (req, res) => {
        res.status(401).json({
            success: false,
            message: "user failed to authenticate."
        });
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/")
    });

    app.get("/auth/google", passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get("/auth/google/callback", 
        passport.authenticate('google', 
        async (req, res) => {
            const userString = JSON.stringify(req.user)
            jwt.sign({userString}, process.env.SECRET_SESSION_KEY, { expiresIn: '365d' }, (err, token) => {
                res.send("<script>localStorage.setItem('token', '" + token + "'); window.close(); window.opener.document.getElementById('modal-toggle').checked = false;</script>");
            })
        }
    ));

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



