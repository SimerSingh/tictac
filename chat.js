// Placeholder file for Node.js game server
var rocket = require('socket.io');
var express = require('express');
var Player = require("./Player").Player;
var app = express(),
http = require('http'),
server = http.createServer(app);
var io = rocket.listen(server);
var players;
//Chatroom
var usernames = {};
var numUsers = 0;

function init() {
    players = [];	
};

server.listen(3000,function(){
	console.log('connected to port 3000..');
});

//On client connected to server
//Client is a browser
//This method is route Handler
// Routing
app.use(express.static(__dirname + '/public'));

io.on('connection',function(socket){
    var addedUser = false;
	console.log('a user connected');	
	socket.on("new player", onNewPlayer);
	
	
	
	
	
	//when client emits typing we broadcast to others
	socket.on('typing',function(){
		socket.broadcast.emit('typing',{
			username: socket.username
		});
	});
	
	//when client emits stop typing we broadcast to others
	socket.on('stop typing',function(){
		socket.broadcast.emit('stop typing',{
			username: socket.username
		});
	});
	
	//when user disconnects ..perform this
	socket.on('disconnect',function(){
		if(addedUser){
			delete usernames[socket.username];
			--numUsers;
			//echo globaly that client left
			socket.broadcast.emit('user left',{
				username: socket.username,
				numUsers: numUsers
			});
		}	
	});
});	
	
	function onNewPlayer(data) {
	console.log('data-'+ data.x +':' + data.y);
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = this.id;
	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		console.log('emiting ..new player..');
		this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
	};
	players.push(newPlayer);
	};
	
	init();
	
