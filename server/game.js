var io = require("socket.io")();
io.on("connection", onConnect);
io.listen(3000);

/**
 * Some variables
**/
var players =
{
	"level1": {}
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
	socket.emit("joined", { id: socket.id, x: 0, y: 0 });

	// Save socket
	players[socket.room][lastId++] = socket;

	// Sync players
	for(var i = 0, a = players[socket.room], l = a.length; i < l; i++)
	{
		var player = a[i];

		// Send other players to newly joined player
		if(socket.id != player.id)
			socket.emit("join", { id: player.id, name: player.name, x: player.x, y: player.y });

		// Send player to others
		if(socket.id != player.id)
			player.emit("join", { id: socket.id, name: socket.name, x: socket.x, y: socket.y });
	}


	// Handlers
	socket.on("move", function(data)
	{
		if(isNaN(data.x) || isNaN(data.y) || isNaN(data.xd) || isNaN(data.yd))
			return;

		socket.x = data.x;
		socket.y = data.y;
		socket.xd = data.xd;
		socket.yd = data.yd;

		for(var i = 0, a = players[socket.room], l = a.length; i < l; i++)
		{
			var player = a[i];
			if(player.id != socket.id)
				player.emit("move", { id: socket.id, x: socket.x, y: socket.y, xd: socket.xd, yd: socket.yd });
		}
	});

	socket.on("disconnect", function()
	{
		for(var i = 0, a = players[socket.room], l = a.length; i < l; i++)
		{
			var player = a[i];
			if(player.id != socket.id)
				player.emit("leave", socket.id);
		}

		delete players[socket.room][socket.id];
	});
}