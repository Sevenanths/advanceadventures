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

var tiles =
{
    // Air
    0:
    {
        solid: false,

        xGrav: 0,
        yGrav: 1,

        xSpd:  0,
        ySpd:  0
    },

    // Solid brick
    1:
    {
        solid: true,

        xGrav: 0,
        yGrav: 0,

        xSpd:  0,
        ySpd:  0
    },

    // Up
    2:
    {
        solid: false,

        xGrav: 0,
        yGrav: -1,

        xSpd:  0,
        ySpd:  0
    },

    // Down
    3:
    {
        solid: false,

        xGrav: 0,
        yGrav: 1,

        xSpd:  0,
        ySpd:  0
    },

    // Left
    4:
    {
        solid: false,

        xGrav: -1,
        yGrav: 0,

        xSpd:  0,
        ySpd:  0
    },

    // Right
    5:
    {
        solid: false,

        xGrav: 1,
        yGrav: 0,

        xSpd:  0,
        ySpd:  0
    },

    // Trampoline
    6:
    {
        solid: false,
        
        xGrav: 0,
        yGrav: 0,

        xSpd:  0,
        ySpd:  -50,
    }
}