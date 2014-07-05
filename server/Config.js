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

var PROTOCOL_VERSION    = 1;

var NET_HANDSHAKE       = "handshake";
var NET_MOVE            = "move";
var NET_JOIN            = "join";
var NET_JOINED          = "joined";
var NET_CHAT            = "chat";
var NET_LEAVE           = "leave";

var SERVER_PORT         = 3000;

var ROOMS =
[
    "world1"
];

exports.PROTOCOL_VERSION    = PROTOCOL_VERSION;
exports.NET_HANDSHAKE       = NET_HANDSHAKE;
exports.NET_MOVE            = NET_MOVE;
exports.NET_JOIN            = NET_JOIN;
exports.NET_JOINED          = NET_JOINED;
exports.NET_CHAT            = NET_CHAT;
exports.NET_LEAVE           = NET_LEAVE;
exports.SERVER_PORT         = SERVER_PORT;
exports.ROOMS               = ROOMS;