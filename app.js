'use strict';

require('./utils/string_extensions');
require('./utils/date_extensions');

var config = require('config');
var restify = require('restify');
var handle_routes = require('./handle_routes');

var server = restify.createServer({
    name: 'Map Explorer',
    version: '1.0.0'
});

server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

handle_routes(server);

server.listen(config.port, function () {
    console.log('Listening to port : '+config.port + '.');
});