// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID'      : 'your-secret-clientID-here',
		'clientSecret'  : 'your-client-secret-here',
		'callbackURL'   : 'http://localhost:3000/auth/google/callback'
	},

	'twitterAuth' : {
		'clientID'      : 'your-secret-clientID-here',
		'clientSecret'  : 'your-client-secret-here',
		'callbackURL'   : 'http://localhost:3000/auth/google/callback'
	},

	'googleAuth' : {
		'clientID'      : 'your-secret-clientID-here',
		'clientSecret'  : 'your-client-secret-here',
		'callbackURL'   : 'http://localhost:3000/auth/google/callback'
	},

	'stripeAuth': {
		'clientID'      : 'your-secret-clientID-here',
		'clientSecret'  : 'your-client-secret-here',
		'callbackURL'   : 'http://localhost:3000/auth/google/callback'
	},

	'email': {
		'user': 'marketing@portlightllc.com',
		'pass': 'marketme123'
	},

	'hack1': {
		'ApiKey':'Hackathon1',
		'Token':'9ebc55c9-b5e4-4695-83c5-ade19ea6df4c'
	}

};