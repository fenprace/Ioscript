var type = require("./type"); 
var top_object = type.top_object;

var scope = module.exports = {};
var env   = scope.env      = {};

env.Object  = top_object;
env.true    = type.true;
env.false   = type.false;
env.Boolean = type.Boolean;
env.Integer = type.Integer;
env.String  = type.String;
env.Float   = type.Float;
env.List    = type.List;
