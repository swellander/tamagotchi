var express = require('express');
var app = express();
var ejs = require('ejs');
var path = require('path');

//allow .ejs files to be named .html
app.engine('html', ejs.__express);

//path to public directory
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.render('trivimon');
});

app.listen(3000, function() {
    console.log('Express server started on port 3000');
})