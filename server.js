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
app.get('/mentor_detail', function (req, res) {
    res.render('pages/mentor_detail');
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

// Transaksi detail page
app.get('/transaksi-detil', function (req, res) {
    res.render('pages/transaksi_detail');
});

// Transaksi add page
app.get('/transaksi_add', function (req, res) {
    res.render('pages/transaksi_add');
});

// notification page
app.get('/notification', function (req, res) {
    res.render('partials/notification');
});

app.listen(8000);
console.log(`Express server listening on http://127.0.0.1:8000/, in %s mode`)
