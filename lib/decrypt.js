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
    const data = decipher.update(cipher, "binary", "utf8");
    const pad = decipher.final("utf8");

    return data + pad;
}

module.exports = decrypt;
