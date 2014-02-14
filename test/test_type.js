assert  = require("assert");
io_List = require("../lib/type").List;

describe('List', function () {
  describe('create', function () {
    var list = io_List.create([0, 1]);
    
    it('should have value property', function () {
      assert.ok(list.hasOwnProperty('value'));
    });
  });
});