'use strict';

var needle = require('needle');
var riot_url_builder = require('../../utils/riot_url_builder');

module.exports = function (region, match_id, callback) {
    var url = riot_url_builder.build_url(region, 'match', [match_id], {includeTimeline: 'true'});
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
