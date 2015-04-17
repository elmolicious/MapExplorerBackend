'use strict';

exports.handle = function(error, riot_response, response, next){

    if(error){
        response.send(500, {error : 'Internal Server Error', message : 'Couldn\'t process request'})
    }
    switch(riot_response.status){
        case 200 :
            response.send(200, riot_response.data);
            break;
        case 400 :
            response.send(400, {error : 'Bad Request', message : 'The Riot Api responded with a \'syntax Error\' message'});
            break;
        case 401 :
            response.send(401, {error : 'Unauthorized', message : 'The used Authorization to Riot caused an error'});
            break;
        case 404 :
            response.send(404, {error : 'Not Found', message : 'The wanted resource was not found'});
            break;
        case 429 :
            response.send(429, {error : 'Rate Limit Exceeded', message : 'To many api calls for the Authorization'});
            break;
        case 500 :
            response.send(500, {error : 'Internal Server Error', message : 'Riot coundn\'t process the request'});
            break;
        case 503 :
            response.send(500, {error : 'Service Unavailable', message : 'Riot Service Unavailable'});
            break;
    }
    next();
};