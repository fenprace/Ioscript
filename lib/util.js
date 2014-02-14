Object.prototype.extend = function (Parent) {
  var F = function(){};

  F.prototype = Parent.prototype;
  this.prototype = new F();
  this.prototype.constructor = this;

  this.uber = Parent.prototype;
};