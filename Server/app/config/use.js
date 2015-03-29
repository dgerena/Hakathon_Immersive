///////////////////////// Express Uses /////////////////////////
// These are the uses for express who would have thought	  //
////////////////////////////////////////////////////////////////
var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ 'extended': true })); // for parsing application/x-www-form-urlencoded

// Sessions
app.use(session({
	'secret': 'tu+omKg+2RfyiHMkiNAVSNuy8qk9u+mm4Lk2ATLf',
	'resave': false,
	'saveUninitialized': true,
	'store': new RedisStore({}),
}));