const readCookie = require("./");

/**
 * Read Laravel session id from cookies object.
 * @param {string} appKey
 * @param {string} cookieName
 * @param {object} cookies
 */
function readCookies(appKey, cookieName, cookies) {
    const cookie = (cookies || {})[cookieName];
    return readCookie(appKey, cookie);
}

module.exports = readCookies;
