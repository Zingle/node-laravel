const expect = require("expect.js");
const deserialize = require("../lib/deserialize");
const keys = Object.keys;

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
