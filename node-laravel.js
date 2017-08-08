const laravel = require("./lib/laravel");
const deserialize = require("./lib/deserialize");
const decrypt = require("./lib/decrypt");
const encrypt = require("./lib/encrypt");

module.exports = laravel;
module.exports.deserialize = deserialize;
module.exports.decrypt = decrypt;
module.exports.encrypt = encrypt;
