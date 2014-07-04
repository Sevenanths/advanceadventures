/*
	Advance Adventures
    Copyright (C) 2014 Sevenanths & NielsDev

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var io = require("socket.io")();
	io.on("connection", onConnect);
	io.listen(3000);
var readline = require("readline");
var rl = readline.createInterface(process.stdin, process.stdout);

/**
 * Some variables
**/
var lastId = 0;
var players =
{
	"world1": {}
};
var onlinePlayers =
{
	"world1": 0
};

/**
 * This method sends a message to a room
 * @param room the room name
 * @param name the message name
 * @param messageData the data in the message
**/
function broadcastInRoom(room, name, messageData)
{
	for(var i = 0, a = players[room], l = a.length; i < l; i++)
	{
		var player = a[i];
		player.emit(name, messageData);
	}
}

/**
 * This method is called when a user connects
**/
function onConnect(socket)
{
	socket.id = lastId;
	socket.name = "user";
	socket.room = "world1";
	socket.x = 0;
	socket.y = 0;
	socket.xd = 0;
	socket.yd = 0;
	socket.emit("joined", { id: socket.id, x: 0, y: 0 });

	// Save socket
	players[socket.room][lastId++] = socket;
	onlinePlayers[socket.room]++;

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


	/**
	 * Handlers
	**/
	socket.on("move", function(data)
	{
		if(isNaN(data.x) || isNaN(data.y) || isNaN(data.xd) || isNaN(data.yd))
			return;

		socket.x = data.x;
		socket.y = data.y;
		socket.xd = data.xd;
		socket.yd = data.yd;

		broadcastInRoom(socket.room, "move", { id: socket.id, x: socket.x, y: socket.y, xd: socket.xd, yd: socket.yd });
	});

	socket.on("disconnect", function()
	{
		delete players[socket.room][socket.id];
		broadcastInRoom(socket.room, "leave", socket.id);
		onlinePlayers[socket.room]--;
	});
};

/**
 * The CLI
**/
rl.setPrompt("> ");
rl.prompt();

/**
 * Handlers
**/
rl.on("line", function(line)
{
	var text = line.trim();
	
	switch(text)
	{
		case "stop":
			console.log("Stopping server...");
			process.exit(0);

			break;

		case "online":
			var total = 0;
			for(var roomName in onlinePlayers)
			{
				console.log("ROOM:\t" + roomName + " - " + onlinePlayers[roomName]);
				total += onlinePlayers[roomName];
			}
			console.log("That's a total of " + total + " players online.");

			break;

		case "help":
			console.log("Available commands:");
			console.log("  help\t\tDisplay a list of commands");
			console;log("  stop\t\tStops the server");
			console.log("  online\t\tShows the online players");

			break;

		default:
			console.log("Unknown command, type \"help\" for a list of commands");
			break;
	}

	rl.prompt();
});