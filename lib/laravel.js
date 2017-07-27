const decrypt = require("./decrypt");
const deserialize = require("./deserialize");
const readCookie = require("./read-cookie");
const readCookies = require("./read-cookies");
const assign = Object.assign;
const create = Object.create;
const freeze = Object.freeze;
const define = Object.defineProperties;

const Laravel$fetch = Symbol("fetch implementation");
const COOKIE_NAME = "laravel_session";

/**
 * Configure Laravel application.
 * @param {string} appKey
 * @param {string} [cookieName=COOKIE_NAME]
 * @param {function} fetch
 * @returns {Laravel}
 */
function laravel(appKey, cookieName, fetch) {
    const laravel = create(Laravel);

    if (arguments.length < 3) {
        fetch = cookieName;
        cookieName = COOKIE_NAME;
    }

    assign(laravel, {appKey, cookieName});
    laravel[Laravel$fetch] = fetch;

    return freeze(laravel);
}

const Laravel = {
    /**
     * Decrypt cipher value.
     * @param {string} iv
     * @param {string} cipher
     * @returns {string}
     */
    decrypt(iv, cipher) {
        return decrypt(this.appKey, iv, cipher);
    },

    /**
     * Read Laravel session id from session cookie value.
     * @param {string} cookie
     * @returns {string}
     */
    readCookie(cookie) {
        return readCookie(this.appKey, cookie);
    },

    /**
     * Read Laravel session id from cookies object.
     * @param {object} cookies
     */
    readCookies(cookies) {
        return readCookies(this.appKey, this.cookieName, cookies);
    },

    /**
     * Fetch session from storage.
     * @param {string} id
     * @returns {Promise}
     */
    fetch(id) {
        return this[Laravel$fetch](id).then(deserialize).then(deserialize);
    }
};

module.exports = laravel;
module.exports.Laravel = Laravel;
module.exports.COOKIE_NAME = COOKIE_NAME;
