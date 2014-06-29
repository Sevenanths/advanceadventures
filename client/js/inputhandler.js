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
var keys = [];

// KEYS
var KEY_SPACE = 32;
var KEY_A = 65;
var KEY_B = 66;
var KEY_C = 67;
var KEY_D = 68;
var KEY_E = 69;
var KEY_F = 70;
var KEY_G = 71;
var KEY_H = 72;
var KEY_I = 73;
var KEY_J = 74;
var KEY_K = 75;
var KEY_L = 76;
var KEY_M = 77;
var KEY_N = 78;
var KEY_O = 79;
var KEY_P = 80;
var KEY_Q = 81;
var KEY_R = 82;
var KEY_S = 83;
var KEY_T = 84;
var KEY_U = 85;
var KEY_V = 86;
var KEY_W = 87;
var KEY_X = 88;
var KEY_Y = 89;
var KEY_Z = 90;

/**
 * Handles the onkeydown event
 * @param e event
**/
function onKeyDown(e)
{
    e = e || window.event;
    var keyCode = (e.keyCode) ? e.keyCode : e.which;

    keys[keyCode] = true;
    console.log(keyCode);
}

/**
 * Handles the onkeyup event
 * @param e event
**/
function onKeyUp(e)
{
    e = e || window.event;
    var keyCode = (e.keyCode) ? e.keyCode : e.which;

    keys[keyCode] = false;
}

/**
 * Checks if a key is held down
 * @param key the key
 * @returns if the key is held down
**/
function isKeyDown(key)
{
    if(keys[key])
        return true;

    return false;
}

/**
* This method registers the handlers
**/
function registerhandler()
{
    window.onkeydown = onKeyDown;
    window.onkeyup = onKeyUp;
}