'use strict';

exports.to_url_time = function convert_date(date) {
    date.setMinutes(date.getMinutes() - (date.getMinutes() % 5));
    date.setSeconds(0);
    date.setMilliseconds(0);
    return Math.round(date.getTime() / 1000);
};