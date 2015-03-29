var async = require('async');
var route = require('express').Router();
var sha = require("js-sha256").sha256;
var qs = require("querystring");
var unirest = require('unirest');

route.post('/signup',function (req,res){
	Models.users
		.findOne({
			'$or': [
				{'user': req.body.username},
				{'email': {'$in' :[req.body.email, req.body.username]} },
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
				user.user = req.body.username;
				user.password = req.body.password;
				user.facebookId = req.body.facebookId;
				user.name = req.body.name;
				user.email = req.body.email;
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

route.post('/login',function (req,res){
	Models.users
		.findOne({
			'$or': [
				{'user': req.body.username},
				{'email': {'$in' :[req.body.email, req.body.username]} },
			]
		})
		.exec(function (err, user) {
			if(!user){
				res.json({
					'passed': false,
					'error': "That user doesn't exist"
				});
			}else if(user.password === sha(req.body.password)){
				req.session.user = user;
				res.json({
					'user': user
				});
			}
		});
});


route.all('/visit*', app.policies.mustBeLoggedIn);

route.post('/visit/:uuid',function (req,res){
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
					done(err, user);
				});

		},
		'beacon': function(done){
			
			Models.beacons
				.findOne({
					"uuid":req.params.uuid
				})
				.exec(function (err, beacon){
					if(beacon){
						var	url =  "https://servicesstg.universalorlando.com/api/";
						for(var s = 0; s < beacon.sections.length;s++){
							url += beacon.sections[s] + "/"
						}

						url += beacon.id+"?"+qs.stringify(auth.hack1);
						
						unirest
							.get(url)
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
							  done(err,response.body);
							});
					} else {
						done({"Error":"that beacon hasn't been stored or has been moved"});
					}
				})
		},
	},function (err, result){
		if(err){ res.json(err); }
		else{
			result.user.lastSeen = [
				result.beacon.Longitude,
				result.beacon.Latitude
			];
			
			result.user.save();
			res.json(result.beacon);
		}
	});
});


module.exports = route;