/**
 * Deserialize PHP serialized data (poorly).
 * @param {string} data
 * @returns {*}
 */
function deserialize(data) {
    var offset = 0;

    return value(data);

    function value() {
        switch (type()) {
            case "N": return null;
            case "i": return integer();
            case "s": return string(length());
            case "a": return array(length());
            case "O": return object(string(length()), length());
        }
    }

    function type() {
        switch (data.substr(offset, 2)) {
            case "N;": offset += 2; return "N";
            case "i:": offset += 2; return "i";
            case "s:": offset += 2; return "s";
            case "a:": offset += 2; return "a";
            case "O:": offset += 2; return "O";
        }
    }

    function length() {
        const end = data.indexOf(":", offset);
        var length;

        if (~end) {
            length = parseInt(data.substring(offset, end));
            offset = end + 1;
            return length;
        }
    }

    function integer() {
        const end = data.indexOf(";", offset);
        const result = parseInt(data.substring(offset, end));
        offset = end + 1;
        return result;
    }

    function string(length) {
        // move offset past initial quote
        offset++;

        // start with length as number of characters; it's actually the number
        // of bytes, but byte offsets cannot be used directly with string data
        const span = data.substr(offset, length);

        // encode string as UTF8 bytes, and use length to correctly slice bytes
        const buffer = new Buffer(span, "utf8").slice(0, length);

        // decode the UTF8 buffer back into a string
        const result = buffer.toString("utf8");

        // string ends in quote-semicolon sequence; move offset past this
        offset += result.length + 2;

        return result;
    }

    function array(length) {
        const kv = [];
        var i = 0, k, v, result;

        // move offset past initial open brace
        offset++;

        // read key-value pairs, which are serialized as consecutive values
        for (i = 0; i < length; i++) {
            k = value();
            v = value();
            kv.push([k,v]);
        }

        // if any of the keys are strings, the result must be an object
        if (kv.some(kv => typeof kv[0] === "string")) {
            result = {};
            kv.forEach(kv => result[kv[0]] = kv[1]);
        }

        // otherwise, result is an array
        else {
            result = [];
            kv.forEach(kv => result.push(kv[1]));
        }

        // move offset past closing brace
        offset++;

        return result;
    }

    function object(klass, length) {
        const kv = [];
        var i, result;

        if (klass === "stdClass") {
            result = {};

            // move offset past initial open brace
            offset++;

            // read key-value pairs, which are serialized as consecutive values
            for (i = 0; i < length; i++) {
                result[value()] = value();
            }

            // move offset past closing brace
            offset++;

            return result;
        } else {
            return {__class__: klass};
        }
    }
}

module.exports = deserialize;
