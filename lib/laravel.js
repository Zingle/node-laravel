const decipher = require("crypto").createDecipheriv;
const deserialize = require("./deserialize");
const assign = Object.assign;
const create = Object.create;
const freeze = Object.freeze;

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
        return decipher("aes-256-cbc", this.appKey, iv)
            .update(cipher)
            .toString();
    },

    /**
     * Read Laravel session id from session cookie value.
     * @param {string} cookie
     * @returns {string}
     */
    readCookie(cookie) {
        if (!cookie) return null;

        const decoded = new Buffer(cookie, "base64");
        const parsed = JSON.parse(decoded);
        const iv = new Buffer(parsed.iv, "base64");
        const cipher = new Buffer(parsed.value, "base64");
        const plain = this.decrypt(iv, cipher);
        const id = deserialize(plain);

        return id;
    },

    /**
     * Read Laravel session id from cookies object.
     * @param {object} cookies
     */
    readCookies(cookies) {
        const cookie = (cookies || {})[this.cookieName];
        return this.readCookie(cookie);
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
