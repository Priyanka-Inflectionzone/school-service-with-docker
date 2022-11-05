"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var database_config_1 = require("./database.config");
var logger_1 = require("../common/logger");
///////////////////////////////////////////////////////////////////////////////////
var config = database_config_1.DbConfig.config;
logger_1.Logger.instance().log('environment : ' + process.env.NODE_ENV);
logger_1.Logger.instance().log('db name     : ' + config.database);
logger_1.Logger.instance().log('db username : ' + config.username);
logger_1.Logger.instance().log('db host     : ' + config.host);
var sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    },
    logging: false
});
sequelize
    .authenticate()
    .then(function () {
    logger_1.Logger.instance().log('Database connection has been established successfully.');
})["catch"](function (error) {
    logger_1.Logger.instance().log('Unable to connect to the database:' + error.message);
});
/////////////////////////////////////////////////////////////////////////////////////////
//Creates DB if d
exports["default"] = {
    Sequelize: sequelize_1.Sequelize,
    sequelize: sequelize
};
///////////////////////////////////////////////////////////////////////////////////
