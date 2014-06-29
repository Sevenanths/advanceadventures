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

var Player = Class.create({
	initialize: function(level)
	{
		this.currentLevel = level;

		this.x = 0;
		this.y = 0;
		this.xd = 0;
		this.yd = 0;
		this.onGround = false;
		this.aabb = new AABB(this.x, this.y, this.x + 16, this.y + 16);
	},

	tick: function()
	{
		if(!this.onGround)
			this.yd += 1.5;

		this.xd *= 0.8;
		this.yd *= 0.8;

		var AABBs = this.currentLevel.getAABBs(this.aabb);
		for(var i = 0, l = AABBs.length; i < l; i++)
		{
			var aabb = AABBs[i];
			this.xd = aabb.xCollide(this.aabb, this.xd);
			this.yd = aabb.yCollide(this.aabb, this.yd);
		}

		this.aabb.move(this.xd, this.yd);
		this.x = this.aabb.x0;
		this.y = this.aabb.y0;
	},

	draw: function(target, offX, offY)
	{
		target.drawImage(getAsset("player"), (offX + this.x) | 0, (offY + this.y) | 0);
	}
});