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

/**
 * Some variables
**/
var DEG_TO_RAD = Math.PI / 180;
var RAD_TO_DEG = 180 / Math.PI;

/**
 * Draws a rotated object to the canvas
 * @param img the image
 * @param context the context
 * @param x x coordinate
 * @param y y coordinate
 * @param angle angle in degrees
**/
function drawRotatedImage(img, context, x, y, angle)
{
    var w = img.width;
    var h = img.height;

    x += w * 0.5;
    y += h * 0.5;

    context.save();
    context.translate(x, y);
    context.rotate(angle * DEG_TO_RAD);
    context.drawImage(img, -w * 0.5, -h * 0.5);
    context.restore();
}