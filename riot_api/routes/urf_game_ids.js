'use strict';

var needle = require('needle');
var riot_url_builder = require('../../utils/riot_url_builder');
var date_converter = require('../../utils/date_to_time_converter');

module.exports = function (region, callback) {
    var beginDate = new Date('2015-04-11T12:00:00').addMinutes(-360);
    var url = riot_url_builder.build_url(region, 'api_challenge', [], {beginDate : date_converter.to_url_time(beginDate)});
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
