'use strict';

var needle = require('needle');
var riot_url_builder = require('../../utils/riot_url_builder');

module.exports = function (region, summoner_name, callback) {
    var url = riot_url_builder.build_url(region, 'summoner', [summoner_name], {});
    needle.get(url, function (error, response) {
        if(error){
            return callback(error, null);
        }
        callback(null, {
            status: response.statusCode,
            data: response.body
        });
    });
};
