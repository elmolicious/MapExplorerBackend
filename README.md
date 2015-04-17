If you didnt come here from the MapExplorer Readme please visit it first

## What is this repository for? ##

*It provides the data for the app since i dont want to use my riot api key in clientside javascript

## Technology used ##

Node.js (Backend Javascript)

## How do I get set up? ##

There are a few things you need to do to set it up (I didnt find time to host it online)

*There needs to be NODE.js and NPM (Node Package Manager) installed (https://nodejs.org/)
*Npm should come default with the node installation

*Before running it is required to install dependencies (aka node packages), in the root dir execute the command :
'npm install'; it should install 5 packages (async, config, lodash, needle, restify)

*Enter a valid api key in {projectRoot}/config/default.json (I removed mine for obvious reasons)

*start the backend by executing 'node app.js' in the projectRoot in a shell ('npm run run' should also work)

## Notes ##

The backend runs on the port 8080, this can also be changed in the config if 8080 is already used
