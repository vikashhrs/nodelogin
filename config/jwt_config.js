var jwt = require('jwt-simple');
var secret = "@#$%^&*()_===";
var getToken = function(user){
	return jwt.encode(user, secret);
}
  
var getUser = function(token){
	return jwt.decode(token, secret);
}


module.exports = {
	generateUserToken : getToken,

	generateUserFromToken : getUser
}