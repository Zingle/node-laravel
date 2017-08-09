const readCookie = require("./read-cookie");

/**
 * Read Laravel session id from cookies object.
 * @param {string} key
 * @param {string} [cookieName="laravel_session"]
 * @param {object} cookies
 */
function readCookies(key, cookieName, cookies) {
    if (arguments.length < 3) {
        cookies = cookieName;
        cookieName = "laravel_session";
    }

    const cookie = (cookies || {})[cookieName];
    return readCookie(key, cookie);
}

module.exports = readCookies;
