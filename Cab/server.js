const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 2222;

app.use(express.json());
app.use(express.urlencoded());
app.use('/static', express.static('public'));

const hbs = exphbs.create({
    extname : ".hbs"
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.get('/login', function(req, res){
    res.render('login');
});




app.listen(PORT, function(){
    console.log("Application has started and running on port: ", PORT);  
}).on('error', function(error){
    console.log("Unable to start app. Error >>>>", error);
})