var uuid = require("uuid");
var sha = require("js-sha256").sha256;

module.exports = {
	'uuid': {
		'type': String,
		'default': uuid.v4()
	},
	'facebookId': String,
	'name': String,
	'email': String,
	'username': String,
	'password': {
		'type': String,
		'set': function (x) {
			return sha(x);
		}
	},
	'attending': [
		String
	],
	'visited': [ { 
		'location': String, 
		'at': Date 
	} ],
}