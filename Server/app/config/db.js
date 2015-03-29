var mongoose = require('mongoose');
////////////////////// This manages the Database connections //////////////////////

var user = 'rschlup';
var pass = 'zxcvbnm9';
var connection = {
	'host': "45.55.162.87",	// Host
	'port': 27017,			// Port
	'db': 'hackathon',		// database connecting to
	'auth': 'MONGODB-CR'	// authMechanism
};





// Mongo Query string connection
var qs = 'mongodb://'+
		// user+
		// ':'+pass+
		// '@'+connection.host+
		connection.host+
		':'+connection.port+
		'/'+connection.db+
		'?authMechanism='+connection.auth





// Name the db connections
var db = {
	
	// The actual connection to mongo connection type
	'hackathon': mongoose.connect(qs),
};

module.exports = db;