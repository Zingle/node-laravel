const deserialize = require("./lib/deserialize");
const decrypt = require("./lib/decrypt");
const encrypt = require("./lib/encrypt");
const readCookie = require("./lib/read-cookie");
const readCookies = require("./lib/read-cookies");

module.exports.deserialize = deserialize;
module.exports.decrypt = decrypt;
module.exports.encrypt = encrypt;
module.exports.readCookie = readCookie;
module.exports.readCookies = readCookies;
