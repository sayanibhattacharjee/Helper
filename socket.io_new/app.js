	var app = require('express')();
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	var path = require('path');
	 
	// Initialize application with route to root directory)
	app.get('/', function(req, res){
	  var express=require('express');
	  app.use(express.static(path.join(__dirname)));
 
          //Transfers the file at the given <code>path</code>.
	  res.sendFile(path.join(__dirname, 'index.html'));
	});
	 
	// Register events on socket connection
	io.on('connection', function(socket){ 
	  socket.on('chatMessage', function(from, msg){
		io.emit('chatMessage', from, msg);
	  });
	  socket.on('notifyUser', function(user){
		io.emit('notifyUser', user);
	  });
	});
	 
	// Listen application request on port 3000
	http.listen(3000, function(){
	  console.log('listening on *:3000');
	});
