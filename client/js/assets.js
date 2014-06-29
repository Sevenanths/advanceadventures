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
var maxAssets = 0;
var loadedAssets = 0;
var assetCallback;
var assetsMap = [];

var ASSET_TYPE_IMAGE = 0;

/**
 * This method loads assets
 * @param callback the callback to fire when loading is done
**/
function loadAssets(callback)
{
    assetCallback = callback;
    addAsset(ASSET_TYPE_IMAGE, "player", "asset/img/player.png");
    addAsset(ASSET_TYPE_IMAGE, "test", "asset/img/test.png");
}

/**
 * This method gets an asset
 * @param name the name of the asset
**/
function getAsset(name)
{
    return assetsMap[name];
}

/**
 * This method checks if all assets are loaded
**/
function checkAssets()
{
    if(loadedAssets == maxAssets)
    {
        assetCallback();
    }
}

/**
 * This method load an asset
 * @param name the internal name of the asset
 * @param filename the filename
**/
function addAsset(type, name, filename)
{
    var asset;
    if(type == ASSET_TYPE_IMAGE)
    {
        asset = new Image();
        asset.onload = function()
        {
            loadedAssets++;
            checkAssets();
        }

        asset.src = filename;
    }

    assetsMap[name] = asset;
    maxAssets++;
}