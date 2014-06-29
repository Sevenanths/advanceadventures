var Game = Class.create({
	initialize: function(canvas, context)
	{
		this.canvas = canvas;
		this.context = context;

		this.level = new Level();
		this.player = new Player(this.level);
	},

	tick: function()
	{
		console.log("tick");
	},

	draw: function()
	{
		this.level.draw(this.context);
		this.player.draw(this.context);
	}
});

/**
 * Some variables
**/
var game;

/**
 * This method defines the game loop
**/
function gameLoop()
{
	game.tick();
	game.draw();

	// Run the game with 30FPS
	setTimeout(gameLoop, 1000 / 30);
}

/**
 * This method is called when the game should be initialized
**/
function init()
{
	var canvas = document.getElementById("game");
	var context = canvas.getContext("2d");

	game = new Game(canvas, context);
	
	// Run game loop
	gameLoop();
}

window.onload = init;