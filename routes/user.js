var express = require('express');
var checkForSession = require('./checkforsession');

var router = express.Router();

router.get('/app/login',checkForSession,function(req,res){
	
});


module.exports = router;