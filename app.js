const express = require("express")
const session = require("express-session")
const flash = require('connect-flash');
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const nunjucks = require('nunjucks');

const app = express()
app.listen(3000, () => {
    console.log("App listening on port 3000")
})
app.use(cookieParser());
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', "html");
app.use(express.static('static'))

nunjucks.configure(['views/'], {
    autoescape: false,
    express: app
})

app.use(session({
    secret: "asdasdasdasdasdasdasdads",
    resave: false,
    saveUninitialized: true
}));

app.use(flash())
app.use(function (req, res, next) {
    res.locals.message = req.flash();
    next();
});


app.route("/")
    .get(function (req, res) {
        if (req.cookies.colorcode) {
            var getcolorcode = req.cookies.colorcode
            res.render("index.html", { getcolorcode: getcolorcode })
        }
        else {
            var colorlist = ["#eb3b5a", "#fa8231", "#26de81", "#2bcbba", "#4b7bec", "#a55eea", "#778ca3", "#4b6584", "#a5b1c2", "#d1d8e0", "#fed330", "#20bf6b", "#eb3b5a"];
            res.render("index.html", { getcolorcode: colorlist })
        }

    })
    .post(function (req, res) {
        var colorcode = [req.body.colorinput1, req.body.colorinput2, req.body.colorinput3, req.body.colorinput4, req.body.colorinput5, req.body.colorinput6, req.body.colorinput7, req.body.colorinput8, req.body.colorinput9, req.body.colorinput10, req.body.colorinput11, req.body.colorinput12, req.body.colorinput13,]
        console.log(colorcode)
        res.cookie("colorcode", colorcode);
        res.redirect("/")
    })


app.get("/colorreset", function (req, res) {
    res.clearCookie("colorcode")
    res.redirect("/")
})

app.use((req, res) => {
    res.status(404).redirect("/")
})