var express = require('express');
var checkForSession = require('./checkforsession');

var router = express.Router();

router.get('/',checkForSession,function(req,res){
	res.send("<h1>Hello</h2>");
});


module.exports = router;