// load the things we need
import express from "express";
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use('layout','')
app.use(express.static("./public"))

// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
    res.render('pages/index');
});

// user page
app.get('/client', function (req, res) {
    res.render('pages/client');
});

// user page
app.get('/update_client', function (req, res) {
    res.render('pages/update_client');
});

// mentor page
app.get('/mentor', function (req, res) {
    res.render('pages/mentor');
});

// add mentor page
app.get('/add_mentor', function (req, res) {
    res.render('pages/add_mentor');
});

// Update mentor page
app.get('/update_mentor', function (req, res) {
    res.render('pages/update_mentor');
});

// info mentor page
app.get('/info_mentor', function (req, res) {
    res.render('pages/info_mentor');
});

// login page
app.get('/login', function (req, res) {
    res.render('pages/login');
});

// Register page
app.get('/register', function (req, res) {
    res.render('pages/register');
});

// Transaksi page
app.get('/transaksi', function (req, res) {
    res.render('pages/transaksi');
});

// notification page
app.get('/notification', function (req, res) {
    res.render('partials/notification');
}); 

app.listen(8080);
console.log('8080 is the magic port');