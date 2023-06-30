var fortune = require("./lib/fortune.js");
var express = require("express");
var app = express();

// set up handlebars vew engine
var handlebars = require("express3-handlebars").create({
    defaultLayout: "main",
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
    },
});

function getWeatherData() {
    return {
        locations: [
            {
                name: "Portland",
                forecastUrl:
                    "http://www.wundeground.com/US/OR/Portland.html",
                iconUrl: "http://icons-ak.wxug.com/i/c/k/cloudy.gif",
                weather: "Overcast",
                temp: "54.1 F (12.3 C)",
            },
        ],
    };
}

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));
app.use(function (req, res, next) {
    res.locals.showTests =
        app.get("env") !== "production" && req.query.test == "1";
    next();
});
app.use(function (req, res, next) {
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = getWeatherData();
    next();
});
app.disable("x-powered-by");

//routes go here...
app.get("/", function (req, res) {
    res.render("home");
});
app.get("/jquery-test", function (req, res) {
    res.render("jquery-test");
});
app.get("/headers", function (req, res) {
    res.set("Content-Type", "text/plain");
    var s = "";
    for (var name in req.headers)
        s += name + ": " + req.headers[name] + "\n";
    res.send(s);
});
app.get("/nursery-rhyme", function (req, res) {
    res.render("nursery-rhyme");
});
app.get("/data/nursery-rhyme", function (req, res) {
    res.json({
        animal: "squirrel",
        bodyPart: "tail",
        adjective: "bushy",
        noun: "heck",
    });
});
app.get("/about", function (req, res) {
    res.render("about", {
        fortune: fortune.getFortune(),
        pageTestScript: "/qa/tests-about.js",
    });
});

app.get("/shops/reserved", function (req, res) {
    res.render("shops/reserved");
});
app.get("/shops/waikiki", function (req, res) {
    res.render("shops/waikiki");
});
app.get("/shops/request-cloth", function (req, res) {
    res.render("shops/request-cloth");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render("500");
});
//custom 404 page
app.use(function (req, res, next) {
    res.status(404);
    res.render("404");
});

app.listen(app.get("port"), function () {
    console.log(
        "Express started on http://localhost:" +
            app.get("port") +
            "; press Ctrl-C to terminate."
    );
});
