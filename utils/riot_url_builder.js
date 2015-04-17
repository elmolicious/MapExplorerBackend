'use strict';

var config = require('config');
var _ = require('lodash');

exports.build_url = function build_url(region, route, url_params, query_params) {
    return 'https://' +
        config.endpoints[region] +
        build_route_string(region, route, url_params) +
        build_query_parameter_string(query_params)
};

exports.build_static_url = function (region, route, url_params, query_params) {
    return 'https://' +
        config.endpoints.global +
        build_route_string(region, route, url_params) +
        build_query_parameter_string(query_params)
};

function build_route_string (region ,route, params){
    var route_string;
    if(route.indexOf('static') !== -1){
        route_string = config.routes.static[route.split('.')[1]];
    }
    else {
        route_string = config.routes[route];
    }
    var route_params = [region].concat(params);
    return route_string.format(route_params);
}

function build_query_parameter_string (params){
    var query_parameters = '?';
    if (params) {
        _.each(params, function (param_value, param_key) {
            query_parameters += param_key + '=' + param_value + '&';
        });
    }
    return query_parameters + 'api_key=' + config.api_key;
}