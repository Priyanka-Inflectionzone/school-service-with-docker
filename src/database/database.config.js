"use strict";
exports.__esModule = true;
exports.DbConfig = void 0;
var dotenv = require("dotenv");
var logger_1 = require("../common/logger");
/////////////////////////////////////////////////////////////////////////////
if (typeof process.env.NODE_ENV === 'undefined') {
    dotenv.config();
}
if (process.env.NODE_ENV === 'test') {
    logger_1.Logger.instance().log('================================================');
    logger_1.Logger.instance().log('Environment   : ' + process.env.NODE_ENV);
    logger_1.Logger.instance().log('Database name : ' + process.env.DB_NAME);
    logger_1.Logger.instance().log('Database user : ' + process.env.DB_USER_NAME);
    logger_1.Logger.instance().log('Database host : ' + process.env.DB_HOST);
    logger_1.Logger.instance().log('================================================');
}
var DbConfig = /** @class */ (function () {
    function DbConfig() {
    }
    DbConfig.config = {
        username: process.env.DB_USER_NAME,
        password: process.env.DB_USER_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        pool: {
            max: 20,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    };
    return DbConfig;
}());
exports.DbConfig = DbConfig;
