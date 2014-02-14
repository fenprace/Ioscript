var parser = require("../io").parser;
var yy = parser.yy  = require("./scope");

function exec(input) {
  return parser.parse(input);
};

exec('if(true)');
