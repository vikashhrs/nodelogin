var jwt_simple = 
var checkForSession = function(req, res, next){
    if (req.session.user_token && req.cookies.user_sid) {
        res.redirect('/dashboard');

        //send the logged in
    } else {
        next();
    }    
};

module.exports = checkForSession;