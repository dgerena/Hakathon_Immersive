var mongoose = require('mongoose');
////////////////////// This manages the Database connections //////////////////////

var user = 'rschlup';
var pass = 'zxcvbnm9';
var connection = {
	'host': "localhost",	// Host
	'port': 27017,			// Port
	'db': 'hackathon',
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