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

var AABB = Class.create({
    initialize: function(x0, y0, x1, y1)
    {
        this.x0 = x0;
        this.x1 = x1;
        this.y0 = y0;
        this.y1 = y1;
    },

    move: function(x, y)
    {
        this.x0 += x;
        this.x1 += x;
        this.y0 += y;
        this.y1 += y;
    },

    moveTo: function(x, y)
    {
        var xx = x - this.x0;
        var yy = y - this.y0;
        this.move(xx, yy);
    },

    xCollide: function(other, x)
    {
        if(other.y1 <= this.y0 || other.y0 >= this.y1)
            return x;

        var ret = x;
        if(x > 0 && other.x1 <= this.x0)
        {
            var max = this.x0 - other.x1;
            if(max < x)
                ret = max;
        }
        else if(x < 0 && other.x0 >= this.x1)
        {
            var max = this.x1 - other.x0;
            if(max > x)
                ret = max;
        }

        return ret;
    },

    yCollide: function(other, y)
    {
        if(other.x1 <= this.x0 || other.x0 >= this.x1)
            return y;

        var ret = y;
        if(y > 0 && other.y1 <= this.y0)
        {
            var max = this.y0 - other.y1;
            if(max < y)
                ret = max;
        }
        else if(y < 0 && other.y0 >= this.y1)
        {
            var max = this.y1 - other.y0;
            if(max > y)
                ret = max;
        }

        return ret;
    }
});