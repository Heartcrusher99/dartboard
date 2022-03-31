const PORT = 3000

const swig = require('swig');
const url=require('url');
const express = require('express');
const app = express();
const http = require('http').Server(app);

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.use(express.static(__dirname + '/public'));

// game cricket page
app.get('/game/cricket', function(req, res) {
	res.render('pages/cricket', {nbPlayer: req.query.nbPlayer, maxRound:2, arrayTargets:["20","19","18","17","16","15","25"]});
});
// game 501 page
app.get('/game/501', function(req, res) {
	res.render('pages/501', {nbPlayer: req.query.nbPlayer, maxRound:2});
});
// index page
app.get('/', function(req, res) {
	res.render('pages/index');
});
// select number player page
app.get('/lobby', function(req, res) {
	res.render('pages/lobby', {game : req.query.game});
});

const { Server }  = require('socket.io', {wsEngine: 'ws' });

const io = new Server(http);

const fs = require('fs');

let fsTimeout;

// // listen on update on file to check if arduino send informations
//  fs.watch('/srv/dart3/dart.txt', (event, filename) => {
//  	//define var to stop multiple trigger if a dart is stuck in the board
//  	if (!fsTimeout) {
//  		fs.readFile('/srv/dart3/dart.txt', 'utf8', (err, data) => {
//  			if (err) {
//  				console.error(err)
//  				return
//  			}
//  			console.log('watch : ' + data);
//  			io.emit('arduino', data);
//  			fsTimeout = setTimeout(function() { fsTimeout=null }, 500) // give 5 seconds for multiple events
//  		});
//  	}
//  });

io.on('connection', (socket) => {
	console.log('a user connected');
});

// console.log(parser);
http.listen(PORT);
