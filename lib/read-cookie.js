const decrypt = require("./decrypt");
const deserialize = require("./deserialize");

/**
 * Read Laravel session id from session cookie value.
 * @param {string} key
 * @param {string} cookie
 * @returns {string}
 */
function readCookie(key, cookie) {
    if (!cookie) return null;

    const decoded = new Buffer(cookie, "base64");
    const parsed = JSON.parse(decoded);
    const iv = new Buffer(parsed.iv, "base64");
    const cipher = new Buffer(parsed.value, "base64");
    const plain = decrypt(key, iv, cipher);
    const id = deserialize(plain);

    return id;
}

module.exports = readCookie;
