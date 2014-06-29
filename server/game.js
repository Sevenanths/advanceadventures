var io = require("socket.io")();
io.on("connection", onConnect);
io.listen(3000);

/**
 * Some variables
**/
var players =
{
	"level1": []
};
var lastId = 0;

/**
 * This method is called when a user connects
**/
function onConnect(socket)
{
	socket.id = lastId;
	socket.name = "user";
	socket.room = "level1";
	socket.x = 0;
	socket.y = 0;
	socket.xd = 0;
	socket.yd = 0;
	socket.join(socket.room);
	socket.emit("joined", { id: socket.id, x: 0, y: 0 });

	// Save socket
	players[socket.room][lastId++] = socket;

	// Sync players
	for(var i = 0, a = players[socket.room], l = a.length; i < l; i++)
	{
		var player = a[i];

		// Send other players to newly joined player
		socket.emit("join", { id: player.id, name: player.name, x: player.x, y: player.y });

		// Send player to others
		player.emit("join", { id: socket.id, name: socket.name, x: socket.x, y: socket.y });
	}


	// Handlers
	socket.on("move", function(data)
	{
		socket.x = data.x;
		socket.y = data.y;
		socket.xd = data.xd;
		socket.yd = data.yd;

		//io.sockets.in(socket.room).emit("move", { id: socket.id, x: socket.x, y: socket.y, xd: socket.xd, yd: socket.yd });
		io.sockets.emit("move", { id: socket.id, x: socket.x, y: socket.y, xd: socket.xd, yd: socket.yd });
	});

	socket.on("disconnect", function()
	{
		delete players[socket.room][socket.id];
		io.sockets.emit("leave", socket.id);
		socket.leave(socket.room);
	});
}