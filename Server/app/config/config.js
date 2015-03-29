var os = require('os');
var fs = require('fs');

// set port
module.exports = {
	
	"Production": {
		'http': 80,
		'https': 443,
		'numWorkers': os.cpus().length,
		'fileTypes': ['.js', '.cljs', '.coffee'],
	},
	

	"Development": {
		
		// choose 3000 by default
		'http': process.env.PORT || 3000,

		// choose 3000 by SSL
		'https': process.env.SSL || 3443,
		
		'numWorkers': 1,
		'fileTypes': ['.js','.cljs','.coffee'],
	}
};

// Error: error:0906D06C:PEM routines:PEM_read_bio:no start line