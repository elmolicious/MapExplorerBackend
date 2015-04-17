'use strict';

var async = require('async');
var responses = require('./utils/response_handler');
var riot_api = {
    urf_game_ids: require('./riot_api/routes/urf_game_ids'),
    match_data: require('./riot_api/routes/match_data'),
    match_history: require('./riot_api/routes/match_history'),
    summoner: require('./riot_api/routes/summoner'),
    static : {
        map_data : require('./riot_api/routes/static_data/map_data'),
        champion_data : require('./riot_api/routes/static_data/champion_data'),
        summoner_spell_data : require('./riot_api/routes/static_data/summoner_spell_data'),
        item_data : require('./riot_api/routes/static_data/item_data')
    }
};

module.exports = function (restify_server) {
    restify_server.get('/match/id', get_match_id);
    restify_server.get('/match/:id/data', get_match_data);
    restify_server.get('/match/history/by-name/:summoner_name', get_match_history);
    restify_server.get('/static/maps/data',get_map_data);
    restify_server.get('/static/champions/data',get_champion_data);
    restify_server.get('/static/summoner-spells/data',get_summoner_spell_data);
    restify_server.get('/static/items/data',get_item_data);
};

function get_match_id (request, response, next) {
    riot_api.urf_game_ids('euw', function (error, riot_response) {
        responses.handle(error, riot_response, response, next);
    });
}

function get_match_data(request, response, next) {
    riot_api.match_data('euw', request.params.id, function (error, riot_response) {
        responses.handle(error, riot_response, response, next);
    });
}

function get_match_history (request, response, next) {
    var summoner_name = request.params.summoner_name.toLowerCase().replace(' ', '');
    async.waterfall([
        function (done) {
            riot_api.summoner('euw', summoner_name, function (error, riot_response) {
                if (error || !riot_response.data[summoner_name]) {
                    responses.handle(error, riot_response, response, next);
                    return done(new Error(error, message), null);
                }
                done(null, riot_response.data[summoner_name].id);
            })
        },
        function (summoner_id, done) {
            riot_api.match_history('euw', summoner_id, function (error, riot_response) {
                responses.handle(error, riot_response, response, next);
                done();
            });
        }
    ], function () {

    });
}

function get_map_data (request, response, next) {
    riot_api.static.map_data('euw', function (error, riot_response) {
        responses.handle(error, riot_response, response, next);
    });
}

function get_champion_data (request, response, next) {
    riot_api.static.champion_data('euw', function (error, riot_response) {
        responses.handle(error, riot_response, response, next);
    });
}

function get_item_data (request, response, next) {
    riot_api.static.item_data('euw', function (error, riot_response) {
        responses.handle(error, riot_response, response, next);
    });
}

function get_summoner_spell_data (request, response, next) {
    riot_api.static.summoner_spell_data('euw', function (error, riot_response) {
        responses.handle(error, riot_response, response, next);
    });
}