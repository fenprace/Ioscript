var io_Object = function () {
  this.slots  = {};
  this.slots.self = this;
  // this.scope  = scope;
  // this.protos = arguments[1] ? arguments[1] : [];
  this.protos = arguments[0] ? arguments[0] : [];
  this.type = this;

  this.slots.clone = this.clone;
};

io_Object.prototype.set = function(slot, value) {
  this.slots[slot] = value;
  return value;
};

io_Object.prototype.clone = function() {
  // return (new io_Object(this.scope, [this])); 
  var cloned = new io_Object([this]);
  return cloned;
};

io_Object.prototype.instantiate = function() {
  // var instance = this.clone();
  // instance.type = this;
  // return instance;

  function F() {};
　F.prototype = this;
　return new F();
};

io_Object.prototype.obtain = function(name) {
  var t = this.slots[name];

  if (t === undefined) {
    var f = this.protos.filter(function (i) {
      var m = i.obtain(name);
      if (m === undefined) {
        return false;
      } else {
        return m;
      };
    });

    if (f === []) {
      return undefined;
    } else {
      return f.shift();
    };
  };

  return t;
};

io_Object.prototype.get = function(name) {
  var m = this.obtain(name);

  if (m === undefined) {
    throw new Error("undefined slot: " + name);
  };

  return m;
};

exports.io_Object = io_Object;
exports.top_object = new io_Object();
