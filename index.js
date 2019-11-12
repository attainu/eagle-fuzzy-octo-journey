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
    response.render('home');
});


app.listen(PORT);