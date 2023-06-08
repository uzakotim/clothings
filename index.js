const express = require("express");
const app = express();
const passport = require("passport");
require("./config/passport")(passport);
const flash = require("connect-flash");

app.use(flash());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", function (req, res) {
    res.render("index", { message: req.flash("loginMessage") });
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);
