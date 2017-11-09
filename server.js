var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({secret: 'codingdojorocks'}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response) {
	response.render("index");
})

var server = app.listen(5000, function() {
	console.log("listening on port 5000");
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);

	socket.on("posting_form", function(data){
		socket.emit('updated_message', {message: "You emitted the following information to the server: "+JSON.stringify(data)});
		socket.emit('random_number', {number: Math.trunc(Math.random()*1000)+1});
	})
})
