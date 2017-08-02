const config = {};


if (process.env.NODE_ENV === 'dev') {
    config.port = process.env.PORT || 3000;
    config.DBurl = 'mongodb://127.0.0.1:27017/FirstApp';
}
else if(process.env.NODE_ENV === 'DevDeploy') {
    config.port = process.env.PORT;
    config.DBurl = `mongodb://FirstApp-dev:WxHIKP7QSX27vQN2@fisrtappgroup-shard-00-00-q3owb.mongodb.net:27017,fisrtappgroup-shard-00-01-q3owb.mongodb.net:27017,fisrtappgroup-shard-00-02-q3owb.mongodb.net:27017/FirstApp?ssl=true&replicaSet=FisrtAppGroup-shard-0&authSource=admin`;
}
else if (process.env.NODE_ENV === 'prod') {
    config.port = process.env.PORT;
    config.dbName = "firstappusers";
    config.dbHost = "Tvolex:Tvolex3913@ds031895.mlab.com";
    config.dbPort = "31895";
    config.DBurl = process.env.ENV ||`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

module.exports = config;