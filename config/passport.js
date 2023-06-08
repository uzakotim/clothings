const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            function (email, password, done) {
                // Authentication logic
                // Find the user with the given email
                User.findOne({ email: email }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false);
                    }
                    // Check if the password is correct
                    if (!user.checkPassword(password)) {
                        return done(null, false);
                    }
                    return done(null, user);
                });
            }
        )
    );

    // Other passport middleware and configuration
};
