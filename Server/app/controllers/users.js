var async = require('async');
var route = require('express').Router();
var sha = require("js-sha256").sha256;
var querystring = require("querystring");
var unirest = require('unirest');

var type = 'query'
console.log("hi.....");
route.get('/signup',function (req,res){
	Models.users
		.findOne({
			'$or': [
				{'user': req[type].username},
				{'email': {'$in' :[req[type].email, req[type].username]} },
			]
		})
		.exec(function (err, users) {
			if(users){
				res.json({
					'passed': false,
					'error': "That user already exists"
				});
			}else{
				var user = new Models.users
				user.user = req[type].username;
				user.password = req[type].password;
				user.facebookId = req[type].facebookId;
				user.name = req[type].name;
				user.email = req[type].email;
				user.attending = [];
				user.visited = [];

				user.save();

				req.session.user = user;
				res.json({
					'user': user
				});
			}
		});
});

route.get('/login',function (req,res){
	Models.users
		.findOne({
			'$or': [
				{'user': req[type].username},
				{'email': {'$in' :[req[type].email, req[type].username]} },
			]
		})
		.exec(function (err, user) {
			if(!user){
				res.json({
					'passed': false,
					'error': "That user doesn't exist"
				});
			}else if(user.password === sha(req[type].password)){
				req.session.user = user;
				res.json({
					'user': user
				});
			}
		});
});


route.all('/visit*', app.policies.mustBeLoggedIn);

route.get('/visit/:uuid',function (req,res){
	console.log('well hi there.');
	async.parallel({
		'user': function(done){
			Models.users
				.findOne({
					'uuid': req.session.user.uuid
				})
				.exec(function (err, user) {

					user.visited.push({
						'location': req.params.uuid,
						'at': new Date()
					});
					user.save();
					done();
				});

		},
		'beacon': function(done){
			console.log('hi im here',89);
			models.beacons
				.findOne({
					"uuid":req.params.uuid
				})
				.exec(function (err,beacon){
					var	url =  "https://servicesstg.universalorlando.com/api/";
					for(var s = 0; s < beacon.section.length;s++){
						url += beacon.section[s] + "/"
					}

					url += beacon.id+"?"+querystring(auth.hack1);
					console.log('hero',101);
					unirest.get(url)
						.header({
							"Cache-Control" : "no-cache",
							"Content-Length": "1767",
							"Content-Type": "application/json; charset=utf-8",
							"Date": "Sun, 29 Mar 2015 03:43:11 GMT",
							"Expires": "-1",
							"Pragma": "no-cache",
							"Server": "Microsoft-IIS/7.5",
							"X-AspNet-Version": "4.0.30319",
							"X-Powered-By": "ASP.NET"

						})
						// .send({ "parameter": 23, "foo": "bar" })
						.end(function (response) {
						  console.log('Welcome',response.body);
						});
				})
		},
	},function (err, result){

	});
});


module.exports = route;