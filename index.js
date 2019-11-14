const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = 5051;

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

const hbs = exphbs.create({
    extname: '.hbs'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.get('/', function (request, response) {
    response.render('home',{title : "Home"});
});

app.get('/login', function (request, response) {
    response.render('login',{title : "Login"});
});

app.get('/signup', function (request, response) {
    response.render('signup',{title : "Sign Up"});
});

app.get('/userhomepage', function (request, response) {
    response.render('userhomepage',{title : "User Homepage"});
});

app.get('/updateprofile', function (request, response) {
    response.render('updateprofile',{title : "Update profile"});
});

app.get('/lastride', function (request, response) {
    response.render('userlastride',{title : "Last Rides"});
});

app.get('/aboutus', function (request, response) {
    response.render('aboutus',{title : "aboutus"});
});

app.listen(PORT,function(){
    console.log("application listen at Port:" , PORT);
});