var express = require('express');
var User = require('./../models/users');
var router = express.Router();
var jwtMethods = require('./../config/jwt_config');

var checkForSession = function(req, res, next){
	console.log(req.session.user_token)
	console.log(req.cookies.user_id)
    if (req.session.user_token && req.cookies.user_id) {
        res.status(200);
        res.send({message : "OK"});
    } else {
        next();
    }    
};

router.get('/',function(req,res){
	res.status(200).send({message : "App Running"});
})

router.get('/app/login',checkForSession,function(req,res){
	res.status(401);
	res.send({message : "Unauthorized"});
});


router.post('/app/login',function(req,res){
	var user = req.body;
	console.log(user);
	console.log(user.email);

	User.checkIfEmailIsAlreadyPresent(user.email,function(err,foundUser){
		if(err)
			throw err;

		if(foundUser){
			console.log(foundUser);
			// res.status(401);
			// res.send({message : "Unauthorized"});
			User.checkForPasswordMatch(user.password,foundUser.password,function(err,passwordMatch){
				if(err)
					throw err;
				if(passwordMatch){
					req.session.user_token = jwtMethods.generateUserToken(foundUser)
					res.status(200);
					res.send({message : "Authenticated"})
				}else{
					res.status(401);
					res.send({message : "Unauthorized"})
				}
			});
		}

		if(!foundUser){
			res.status(404);
			res.send({message : "User Not Found"})
		}
	});
});


router.post('/app/register/user',function(req,res){
	console.log(req.body.user);
	var reqUser = req.body.user;
	User.checkIfEmailIsAlreadyPresent(reqUser.email,function(err,result){
		if(err)
			throw err;
		if(result){
			console.log("User Present");
			res.status(409);
			res.send({message : "Already Registered"});
		}else{
			
			var newuser = new User(req.body.user);
			console.log("new user"+newuser);
			User.createUser(newuser,function(err){
				if(err){
					throw err;
				}else{
					res.status(201);
					res.send({message : "User Created"});
				}
			});
			
		}
	})
		
});

router.get('/app/get/user/data',function(req,res){
	console.log(req.session.user_token);
	
	if (req.session.user_token && req.cookies.user_id) {
		var user = jwtMethods.generateUserFromToken(req.session.user_token);
		console.log(user);
		res.status(200);
		res.send({userData : user});
	}else{
		res.status(401);
		res.send({message : "Unauthorized"})
	}
	
})

router.get('/app/user/logout',function(req,res){
	if (req.session.user_token && req.cookies.user_id) {
        res.clearCookie('user_id');
    }
     res.status(200);
     res.send({message:"User Logged out"});
})


module.exports = router;