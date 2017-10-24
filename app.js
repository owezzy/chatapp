var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
app.use(require("morgan")("combined",{stream: accessLogStream}));


app.set('views', './views');
app.set('view engine', 'jade');

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('express-debug')(app,{});

app.get('/', function (req, res) {
    res.render("home.jade", {title: 'Home'})
});

var adminRouter = require("./admin");
app.use("/admin",adminRouter);

var apiRouter = require("./api");
app.use("/api" ,apiRouter);

app.listen(3000, function () {
    console.log("chat app listening at 3000")
});