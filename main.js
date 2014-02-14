var parser = require("./io").parser;

parser.yy = require("./lib/scope");

function exec(input) {
  return parser.parse(input);
};


