var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUinitialized: true,
    cookie: { maxAge: 60000}
}))

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('index');
})

app.post('/submit', function(req,res){
    console.log("POST DATA \n\n", req.body)
    var user = {
        name: req.body.name,
        location: req.body.location,
        language: req.body.language,
        comment: req.body.comment
    }
    res.render('result', user);
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})