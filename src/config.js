const config = {};


if (process.env.NODE_ENV === 'dev') {
    config.port = process.env.PORT || 3000;
    config.DBurl = 'mongodb://127.0.0.1:27017/FirstApp';
}
else if(process.env.NODE_ENV === 'DevDeploy') {
    config.port = process.env.PORT;
    config.dbName = "firstappusers";
    config.dbHost = "Tvolex:Tvolex3913@ds031895.mlab.com";
    config.dbPort = "31895";
    config.DBurl = process.env.ENV ||`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;
}
else if (process.env.NODE_ENV === 'prod') {
    config.port = process.env.PORT;
    config.dbName = "firstappusers";
    config.dbHost = "Tvolex:Tvolex3913@ds031895.mlab.com";
    config.dbPort = "31895";
    config.DBurl = process.env.ENV ||`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

module.exports = config;