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

"use strict";

var Level = Class.create({
	initialize: function(width, height)
	{
		this.width = width;
		this.height = height;

		this.camX = 0;
		this.camY = 0;
		this.cameraDelay = 0.2;
		
		this.remotePlayers = {};

		this.map = [];
		for(var y = 0; y < height; y++)
		{
			this.map[y] = [];

			for(var x = 0; x < width; x++)
			{
				this.map[y][x] = 0;
				if(y == 15 || y == 0 || x == 0 || x == 25)
					this.map[y][x] = 1;
				else if(y > 15)
					this.map[y][x] = (Math.random() > 0.9) ? 1 : 0;

				if(x == 6 && y == 14)
					this.map[y][x] = 2;

				if(x == 9 && y == 14)
					this.map[y][x] = 3;

				if(x == 12 && y == 14)
					this.map[y][x] = 4;

				if(x == 14 && y == 14)
					this.map[y][x] = 5;

				if(x == 3 && y == 14)
					this.map[y][x] = 6;
			}
		}
	},

	setPlayer: function(player)
	{
		this.player = player;
	},

	tick: function()
	{
		this.camX -= ((this.camX + this.player.x - 400) * this.cameraDelay);
		this.camY -= ((this.camY + this.player.y - 300) * this.cameraDelay);
	},

	getTile: function(x, y)
	{
		if(x < 0 || y < 0 || x >= this.width || y >= this.height)
			return 0;

		return this.map[y][x];
	},

	setTile: function(x, y, tile)
	{
		if(x < 0 || y < 0 || x >= this.width || y >= this.height)
			return 0;

		this.map[y][x] = tile;
	},

	getAABBs: function(aabb)
	{
		var list = [];

		var x0 = (aabb.x0 >> 4) - 1;
		var y0 = (aabb.y0 >> 4) - 1;
		var x1 = (aabb.x1 >> 4) + 1;
		var y1 = (aabb.y1 >> 4) + 1;

		for(var x = x0; x <= x1; x++)
		{
			var xx = x << 4;
			for(var y = y0; y <= y1; y++)
			{
				if(!tiles[this.getTile(x, y)].solid)
					continue;

				var yy = y << 4;
				list.push(new AABB(xx, yy, xx + 16, yy + 16));
			}
		}

		return list;
	},

	draw: function(target, offX, offY)
	{
		var width = target.canvas.width;
		var height = target.canvas.height;

		// Clear screen
		target.clearRect(0, 0, width, height);

		// Draw level
		offX |= 0;
		offY |= 0;

		var startX = -(offX >> 4) - 1;
		var startY = -(offY >> 4) - 1;
		var endX = startX + (width >> 4) + 1;
		var endY = startY + (height >> 4) + 1;

		if(startX < 0)			startX = 0;
		if(startY < 0)			startY = 0;
		if(endX >= this.width)	endX = this.width - 1;
		if(endY >= this.height)	endY = this.height - 1;

		var tileImage = getAsset("tiles");
		for(var yy = startY; yy <= endY; yy++)
		{
			var my = this.map[yy];
			for(var xx = startX; xx <= endX; xx++)
			{
				var tile = my[xx];
				if(tile == 0)
					continue;

				target.drawImage(tileImage, tile << 4, 0, 16, 16, offX + (xx << 4), offY + (yy << 4), 16, 16);
			}
		}
	}
});