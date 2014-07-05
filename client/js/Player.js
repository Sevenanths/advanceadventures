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

var Player = Class.create(Entity, {
	initialize: function($super, level)
	{
		$super(level);
	},

	tick: function($super)
	{
		// Input
		if(isKeyDown(KEY_A))
			this.xd = -5;
		else if(isKeyDown(KEY_D))
			this.xd = 5;

		if(isKeyDown(KEY_SPACE) && this.onGround)
			this.yd = -26 * this.yGrav;

		// Call super
		$super();

		// Send data to server
		if(this.xd != 0 || this.yd != 0)
        {
            socket.emit(Config.NET_MOVE, { xd: this.xd, yd: this.yd, x: this.x, y: this.y });
        }
	},

	draw: function($super, target, offX, offY)
	{
		var image = getAsset("player");
		$super(image, target, offX, offY);
	}
});