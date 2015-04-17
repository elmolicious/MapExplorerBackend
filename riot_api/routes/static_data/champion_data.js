'use strict';

var needle = require('needle');
var riot_url_builder = require('../../../utils/riot_url_builder');

module.exports = function (region, callback) {
    var url = riot_url_builder.build_static_url(region, 'static.champion', [], {dataById: 'true', champData: 'image'});
    needle.get(url, function (error, response) {
        if (error) {
            return callback(error, null);
        }
        callback(null, {
            status: response.statusCode,
            data: response.body
        });
    });
};
