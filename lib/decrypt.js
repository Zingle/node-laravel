const crypto = require("crypto");

/**
 * Decrypt cipher value.
 * @param {string} key
 * @param {string} iv
 * @param {string} cipher
 * @returns {string}
 */
function decrypt(key, iv, cipher) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const buffer = Buffer.concat([decipher.update(cipher), decipher.final()]);
    return buffer.toString("utf8");
}

module.exports = decrypt;
