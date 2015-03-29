var async = require('async');
var route = require('express').Router();


// the route /merp
route.get('/',function (req,res){
	res.send('hello world');
});



// this is how you use policies
route.all('/loggedIn', app.policies.mustBeLoggedIn);

// the route /merp/loggedIn
route.all('/loggedIn', function (req,res){
	res.send('You are logged in');
});

module.exports = route;