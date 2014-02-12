var parser = require("./io").parser;
parser.yy = require("./lib/scope").scope;

function exec (input) {
  return parser.parse(input);
}

console.log(exec("People := Object clone"));