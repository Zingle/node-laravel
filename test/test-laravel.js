const expect = require("expect.js");
const deserialize = require("../lib/deserialize");
const decrypt = require("../lib/decrypt");
const keys = Object.keys;

const key = "12345678911234567892123456789312";
const iv = "1234567891123456";
const plain = "foo";
const cipher = "ff1b56874bd6c3c02f340fd45e9182ee";

// generated using serialize.php script in this directory:
//  echo '{
//      "true": true,
//      "false": false,
//      "integer": 23,
//      "float": 23.13,
//      "string": "foo",
//      "array": ["apple", "banana"],
//      "object": {"apple": "banana"}
//  }' | php serialize.php
const phpdata = 'O:8:"stdClass":7:{s:4:"true";b:1;s:5:"false";b:0;s:7:"integer";i:23;s:5:"float";d:23.129999999999999;s:6:"string";s:3:"foo";s:5:"array";a:2:{i:0;s:5:"apple";i:1;s:6:"banana";}s:6:"object";O:8:"stdClass":1:{s:5:"apple";s:6:"banana";}}';

describe("decrypt(key, iv, string|Buffer) => string", () => {
    it("should return decrypted string", () => {
        expect(decrypt(key, iv, new Buffer(cipher, "hex"))).to.be(plain);
    });

    it("should accept string or buffer", () => {
        const strval = decrypt(key, iv, new Buffer(cipher, "hex").toString("binary"));
        const bufval = decrypt(key, iv, new Buffer(cipher, "hex"));
        expect(strval).to.be(bufval);
    });

    it("should error on bad key length", () => {
        expect(() => decrypt("key", iv, "foo")).to.throwError();
    });

    it("should error on bad iv length", () => {
        expect(() => decrypt(key, "iv", "foo")).to.throwError();
    });
});

describe("deserialize(string) => *", () => {
    var result;

    before(() => {
        result = deserialize(phpdata);
    });

    it("should recognize object container", () => {
        expect(result).to.be.an("object");
        expect(keys(result).length).to.be(7);
    });

    it("should recognize boolean true", () => {
        expect(result.true).to.be(true);
    });

    it("should recognize boolean false", () => {
        expect(result.false).to.be(false);
    });

    it("should recognize integer value", () => {
        expect(result.integer).to.be(23);
    });

    it("should recognize float value", () => {
        expect(result.float).to.be(23.13);
    });

    it("should recognize string value", () => {
        expect(result.string).to.be("foo");
    });

    it("should recognize array value", () => {
        expect(result.array).to.be.an("array");
        expect(result.array.length).to.be(2);
        expect(result.array[0]).to.be("apple");
        expect(result.array[1]).to.be("banana");
    });

    it("should recognize object value", () => {
        expect(result.object).to.be.an("object");
        expect(result.object.apple).to.be("banana");
    });
});
