var uuid = require("uuid");

module.exports = {
	'uuid': {
		'type': String,
		'default': uuid.v4(),
	},
	'location': String,
}