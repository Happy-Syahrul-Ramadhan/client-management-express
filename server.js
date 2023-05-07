// load the things we need
import express from "express";
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static("./public"))

// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
    res.render('pages/index');
});

// user page
app.get('/about', function (req, res) {
    res.render('pages/about');
});

// mentor page
app.get('/mentor', function (req, res) {
    res.render('pages/mentor');
});

// login page
app.get('/login', function (req, res) {
    res.render('pages/login');
});

// Register page
app.get('/register', function (req, res) {
    res.render('pages/register');
});

app.listen(8080);
console.log('8080 is the magic port');