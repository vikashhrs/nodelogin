var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	name : {
		type : String,
		required : true
	},

	email : {
		type : String,
		required : true
	},

	phone : {
		type : Number,
		required : true
	},

	password : {
		type : String,
		required : true
	}
});

var User = module.exports = mongoose.model('User',UserSchema)




module.exports.checkForPasswordMatch  = function(password, hash, callback){

		bcrypt.compare(password, hash, function(err,isPasswordMatching){
			if(err)
				throw err
			callback(null,isPasswordMatching)
		})
	}

module.exports.createUser = function(newUser,callback){
		console.log(newUser);
		bcrypt.genSalt(10, function(err, salt) {
			//console.log("Inside genSalt"+user);
		    bcrypt.hash(newUser.password, salt,null, function(err, hash) {
		    	console.log(newUser);
		        newUser.password = hash;
		        newUser.save(callback);
		    });
		});
	}

module.exports.checkIfEmailIsAlreadyPresent = function(email,callback){
		
		User.findOne({email : email},callback);
}


