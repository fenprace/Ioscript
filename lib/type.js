// Object is the proto of all types
// primary data types include
// Boolean, Number(Integer & Float), String(Sequence), List and Map

var top_object = require("./object").top_object;

var io_Boolean = top_object.clone();
io_Boolean.create = function(value) {
  var instance = this.instantiate();
  
  if (value.value == false) {
    instance.value = false;  
  } else {
    instance.value = Boolean(value);
  }
  
  return instance;
};

var io_String = top_object.clone();
io_String.create = function() {
  value = arguments[0] ? arguments[0] : "";

  var instance = this.instantiate();
  instance.value = value;
  return instance;
};
io_String.slots.print = function() {
  console.log(this.value);
  return this;
};


var io_Integer = top_object.clone();
io_Integer.create = function(value) {
  var instance = this.instantiate();
  instance.value = Number(value);
  return instance;
};
io_Integer.slots.print = function() {
  console.log(this.value);
  return this;
};


var io_Float = top_object.clone();
io_Float.create = function(value) {
  var instance = this.instantiate();
  instance.value = parseFloat(value);
  return instance;
};


var io_List = top_object.clone();
io_List.create = function(value) {
  var instance = this.instantiate();
  instance.value = value;
  return instance;
};
io_List.slots.size = function() {
  return io_Integer.create(this.value.length);
};
io_List.slots.print = function() {
  console.log(this.value);
  return this;
};


module.exports = {
  top_object: top_object,
  true      : io_Boolean.create(true),
  false     : io_Boolean.create(false),
  Boolean   : io_Boolean,
  Integer   : io_Integer,
  String    : io_String,
  Float     : io_Float,
  List      : io_List
};