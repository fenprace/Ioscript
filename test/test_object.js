var assert = require("assert");
var io_Object  = require("../lib/object").io_Object;

describe('io_Object', function () {
  var obj = new io_Object();

  describe('setter', function () {
    it('should set the slot and return', function () {
      obj.set("test_slot", 0);
      assert.equal(obj.slots.test_slot, 0);
    });
  });

  describe('clone', function () {
    var foo = obj.clone();

    it('should have the same prototype', function () {
      assert.equal(foo.prototype, obj.prototype);
    });

    it('should return an io_Object instance', function () {
      assert.notEqual(foo.protos, []);
      assert.notEqual(foo.protos.indexOf(obj), -1);
    });

    it('the returned object should have its own type', function () {
      assert.equal(foo.type, foo);
    });
  });

  describe('instance', function () {
    var Element = obj.clone();
    Element.set("number", 0)
    var mg = Element.instantiate();

    it('should have the uber slot', function () {
      assert.equal(mg.get("number"), 0);
    });

    it('should have a slot named type that return its type', function () {
      assert.equal(mg.type, Element);
    });
  });

  describe('getter', function () {
    it('should return exist slot', function () {
      assert.equal(obj.get("test_slot"), 0);
    });

    it('should throw error if the slot does not exist', function () {
      assert.throws(function() { obj.get("noSuchSlot") }, /noSuchSlot/);
    });
  });
});