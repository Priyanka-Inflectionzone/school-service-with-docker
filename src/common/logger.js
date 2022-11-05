"use strict";
/* eslint-disable no-console */
exports.__esModule = true;
exports.Logger = void 0;
var Logger = /** @class */ (function () {
    function Logger() {
        this.log = function (message) {
            var dateTime = new Date().toISOString();
            var temp_str = dateTime + '> ' + message;
            console.log(' ');
            console.log(temp_str);
        };
        this.error = function (message, code, details) {
            var dateTime = new Date().toISOString();
            var err = {
                message: message,
                code: code,
                details: details
            };
            var temp_str = dateTime + '> ' + JSON.stringify(err, null, '    ');
            console.log(' ');
            console.log(temp_str);
        };
    }
    Logger.instance = function () {
        return this._instance || (this._instance = new this());
    };
    Logger._instance = null;
    return Logger;
}());
exports.Logger = Logger;
