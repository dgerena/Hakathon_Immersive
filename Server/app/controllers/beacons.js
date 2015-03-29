var async = require('async');
var route = require('express').Router();


// the route /merp
route.get('/:uuid',function (req,res){
	Models.beacons
		.find({
			'uuid': req.params.uuid
		})
		.exec(function (err, beacons) {
			res.json(beacons);
		});
});


module.exports = route;