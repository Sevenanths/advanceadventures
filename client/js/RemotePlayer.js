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

var RemotePlayer = Class.create(Entity, {
	initialize: function($super, level, id, name, x, y)
	{
		$super(level);

		this.id = id;
		this.name = name;
		this.x = x;
		this.y = y;
		this.aabb.moveTo(x, y);
		console.log(x + " " + y);
	},

	draw: function($super, target, offX, offY)
	{
		var image = getAsset("player");
		$super(image, target, offX, offY);
	}
});