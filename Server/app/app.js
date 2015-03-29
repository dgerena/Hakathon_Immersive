var path = require('path');
var express = require('express');
var cluster = require('cluster');
var http = require('http');
var mongoose = require('mongoose');
var fs = require('fs');

// Allow the use of coffee script
var CoffeeScript = require("coffee-script");
CoffeeScript.register();
require('better-require')();

// chooses "Development" by default
var config = require('./config/config')[process.env.ENV || "Development"];

global.db = require('./config/db');

// Skeleton of and Application
global.app = express();

global.auth = require('./config/auth.js');

// Adding httpServer to Skeleton
global.shortcuts = require('./config/shortcuts.js');

// Set the rendering agent to fix the white spacing
app.locals.pretty = true;

// Get the policies for the application
app.policies = require('./config/policies');

// --- Models --- //
global.Models = {};
fs.readdirSync("./models").forEach(function(file) {

	ext = path.extname(file);
	name = file.split(".")[0];
	if(config.fileTypes.indexOf(ext) > -1){
		
		Models[name] = mongoose.model(name, require("./models/" + file));
	}
});

cluster.on('exit', function (worker) {

	// Replace the dead worker,
	// we're not sentimental
	console.log('Worker ' + worker.id + ' died :(');
	cluster.fork();
});

if (cluster.isMaster) {
	// Spawns workers
	for (var i = 0; i < config.numWorkers; i++) {
		cluster.fork();
	}
} else {
	
	// The app.use 's from the config folder
	require('./config/use');
	
	// Start up every script in the controllers folder
	fs.readdirSync("./controllers").forEach(function(file) {
		if(config.fileTypes.indexOf(path.extname(file)) > -1){
			app.use("/"+path.basename(file, path.extname(file)), require("./controllers/" + file));
		}
	});

	// 404 ---- Page
	app.get("/*", function(req, res){
		res.json({
			'Error': "This is not an endpoint. Where were you trying to go?"
		});
	});

	// Create an HTTP service.
	http.createServer(app).listen(config.http);
}