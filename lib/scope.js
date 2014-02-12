var scope = exports.scope = {
  Object: function() {},
  Operator: function(form) {
  },
  Identifier: function(name) {
    this.name  = name;
  },
  Integer: function(value) {
    this.val = Number(value);
  },
  Float: function(value) {
    this.val = parseFloat(value);
  },
  env: {}
};

scope.Object.prototype.clone = function() {
  return 
};

var obj = scope.env.Object = new scope.Object();

scope.Identifier.prototype.value = function() {
  return scope.env[this.name];
};

scope.Identifier.prototype[':='] = function(value) {
  scope.env[this.name] = value;
};

scope.Integer.prototype.value = function() {
  return this.val;
};

scope.Float.prototype.value = function() {
  return this.val;
};