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

var Game = Class.create({
	initialize: function(canvas, context)
	{
		this.canvas = canvas;
		this.context = context;

		this.level = new Level(200, 200);
		this.player = new Player(this.level);
		this.level.setPlayer(this.player);
	},

	tick: function()
	{
		this.level.tick();
		this.player.tick();
	},

	draw: function()
	{
		this.level.draw(this.context, this.level.camX, this.level.camY);
		
		var remotePlayers = this.level.remotePlayers;
		for(var key in remotePlayers)
		{
			var player = remotePlayers[key];
			player.draw(this.context, this.level.camX, this.level.camY);
		}

		this.player.draw(this.context, this.level.camX, this.level.camY);
	}
});

/**
 * Some variables
**/
var domCanvas, domContext;
var canvas, context;
var game;
var socket;

/**
 * This method defines the game loop
**/
function gameLoop()
{
	// Tick & draw
	game.tick();
	game.draw();

	// Copy off-DOM canvas data to DOM canvas
	domContext.clearRect(0, 0, domCanvas.width, domCanvas.height);
	domContext.drawImage(canvas, 0, 0);

	// Run the game with 30FPS
	setTimeout(gameLoop, (1000 / 30) | 0);
}

/**
 * This method is called before initializing the game
**/
function preLoad()
{
	loadAssets(init);
	registerhandler();
}

/**
 * This method is called when the game should be initialized
**/
function init()
{
	canvas = document.createElement("canvas");
	domCanvas = document.getElementById("game");

	canvas.width = domCanvas.width;
	canvas.height = domCanvas.height;

	domContext = domCanvas.getContext("2d");
	context = canvas.getContext("2d");

	socket = io("ws://" + Config.SERVER_IP + ":" + Config.SERVER_PORT);
	socket.on("connect", function()
	{
		// Handlers
		socket.on(Config.NET_JOINED, function(data)
		{
			// Create game instance
			game = new Game(canvas, context);

			var player = game.player;

			player.id = data.id;
			player.x = data.x;
			player.y = data.y

			// Run game loop
			gameLoop();
		});

		socket.on(Config.NET_JOIN, function(data)
		{
			var id = data.id;
			if(id == game.player.id)
				return;

			var name = data.name;
			var x = data.x;
			var y = data.y;

			game.level.remotePlayers[id] = new RemotePlayer(game.level, id, name, x, y);
		});

		socket.on(Config.NET_MOVE, function(data)
		{
			var id = data.id;
			if(id == game.player.id)
				return;

			var player = game.level.remotePlayers[id];
			player.x = data.x;
			player.y = data.y;
			player.xd = data.xd;
			player.yd = data.yd;
		});

		socket.on(Config.NET_LEAVE, function(data)
		{
			var remotePlayers = game.level.remotePlayers;
			if(remotePlayers[data])
				delete remotePlayers[data];
		});
	});
}

window.onload = preLoad;