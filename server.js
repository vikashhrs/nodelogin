var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 5000;

var authRoute = require('./routes/auth');

var User = require('./models/users');

var app = express();


mongoose.connect('mongodb://vikashhrs:12345@ds247688.mlab.com:47688/nodelogin');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(session({
    key: 'user_id',
    secret: 'kscbscg&sv12++hagg',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 120000
    }
}));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/**
    Middleware for checking the presence of session, if not present clear cookies
*/
app.use(function(req, res, next){
    if (req.cookies.user_sid && !req.session.user_token) {
        res.clearCookie('user_id');        
    }
    next();
});


app.use(authRoute);


app.listen(PORT,function(){
	console.log("Server running at "+ PORT);
});