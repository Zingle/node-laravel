const {randomBytes} = require("crypto");
const encrypt = require("./encrypt");

const IV_LENGTH = 16;

/**
 * Generate minimal Laravel session cookie for mock authentication.
 * @param {string} key
 * @param {string} sessionId
 * @returns {string}
 */
function generateCookie(key, sessionId) {
    const iv = randomBytes(IV_LENGTH);
    const serialized = serializeString(sessionId);
    const cipher = encrypt(key, iv, serialized);
    const cookie = {iv: iv.toString("base64"), value: cipher.toString("base64")};
    const encoded = new Buffer(JSON.stringify(cookie)).toString("base64");

    return encoded;
}

module.exports = generateCookie;

function serializeString(string) {
    const length = string.length;
    return `s:${length}:"${string}";`;
}
