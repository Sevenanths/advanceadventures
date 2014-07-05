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

var Entity = Class.create({
    initialize: function(level)
    {
        this.currentLevel = level;

        this.x = 16;
        this.y = 16;
        this.xd = 0;
        this.yd = 0;
        this.xGrav = 0;
        this.yGrav = 1;
        this.onGround = false;
        this.rotation = 0;
        this.rotationDestination = 0;
        this.aabb = new AABB(this.x, this.y, this.x + 16, this.y + 16);
    },

    tick: function()
    {
        // Check tile
        var orgGravX = this.xGrav;
        var orgGravY = this.yGrav;

        var inside = this.currentLevel.map[this.y >> 4][this.x >> 4];
        var tile   = tiles[inside];
        if(inside != 0 && !tile.solid)
        {
            this.xGrav = tile.xGrav;
            this.yGrav = tile.yGrav;

            if(this.xGrav == -1)        this.rotationDestination = 90;
            else if(this.xGrav == 1)    this.rotationDestination = -90;
            else if(this.yGrav == -1)   this.rotationDestination = -180;
            else if(this.yGrav == 1)    this.rotationDestination = 180;
            else                        this.rotationDestination = 0;
        }

        // Rotate to destination
        if(this.rotation < this.rotationDestination)
            this.rotation += 10;
        else if(this.rotation > this.rotationDestination)
            this.rotation -= 10;

        // Apply gravity
        if(!this.onGround)
        {
            this.xd += 4 * this.xGrav;
            this.yd += 4 * this.yGrav;
        }

        // Friction
        this.xd *= 0.8;
        this.yd *= 0.8;

        var xOrg = this.xd;
        var yOrg = this.yd;

        // Collision
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

        // Checks
        this.onGround = (yOrg != this.yd && yOrg * this.yGrav > 0);
        if(this.xd != xOrg) this.xd = 0;
        if(this.yd != yOrg) this.yd = 0;

        // Outside the level?
        var maxX = this.currentLevel.width << 4;
        var maxY = this.currentLevel.height << 4;

        if(this.x < 0)      this.x = 0;
        if(this.y < 0)      this.y = 0;
        if(this.x > maxX)   this.x = maxX;
        if(this.y > maxY)   this.y = maxY;
    },

    draw: function(image, target, offX, offY)
    {
        drawRotatedImage(image, target, (offX + this.x) | 0, (offY + this.y) | 0, this.rotation);
    }
});