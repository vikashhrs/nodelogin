var express = require('express');
var checkForSession = require('./checkforsession');
var jwt_config = require('./../config/jwt_config');
var router = express.Router();

router.get('/login',checkforsession,function(req,res){
	res.send("<h1>Hello</h2>");
});


module.exports = router;