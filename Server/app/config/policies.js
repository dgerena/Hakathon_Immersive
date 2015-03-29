/////////////////////////////// These are Policies /////////////////////////////////
// Policies are where you can stop some one from accessing things they shouldn't  //
// i.e. route.all('*', app.policies.mustBeLoggedIn);							  //
////////////////////////////////////////////////////////////////////////////////////


// this is what you should use instead of wrapping you function in if statements
module.exports = {
	'mustBeLoggedIn': function(req,res,next){
		// is there a user?
		if(req.session.user){
			
			// continue on
			next()
		
		}else{
			// go home you're drunk
			// and need to log in
			res.redirect('/');
		}
	},
};