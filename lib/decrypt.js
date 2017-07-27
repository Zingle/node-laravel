const decipher = require("crypto").createDecipheriv;

/**
 * Decrypt cipher value.
 * @param {string} appKey
 * @param {string} iv
 * @param {string} cipher
 * @returns {string}
 */
function decrypt(iv, cipher) {
    return decipher("aes-256-cbc", appKey, iv)
        .update(cipher)
        .toString();
}

module.exports = decrypt;
