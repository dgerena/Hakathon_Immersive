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
	'lastSeen': [ Number ],
	'attending': [ String ],
	'password': {
		'type': String,
		'set': function (x) {
			return sha(x);
		}
	},
	'visited': [ { 
		'location': String, 
		'at': Date 
	} ],
}