const crypto = require("crypto");

/**
 * Encrypt plain text value.
 * @param {string} key
 * @param {string} iv
 * @param {string} plain
 * @returns {Buffer}
 */
function encrypt(key, iv, plain) {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const buffer = Buffer.concat([cipher.update(plain), cipher.final()]);
    return buffer;
}

module.exports = encrypt;
