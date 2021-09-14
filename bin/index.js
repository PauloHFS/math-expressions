#!/usr/bin/env node
const argv = process.argv;

const Expression = require("./Expression");

const help =
  "Usage: solve-expression 'expression'\n" +
  "or solve-expression --version, -v\n" +
  "or solve-expression --help, -h";

if (argv.length == 3) {
  if (argv[2] == "--version" || argv[2] == "-v") {
    //get version number in package.json
    console.log(require("./../package.json").version);
  } else if (argv[2] == "--help" || argv[2] == "-h") {
    console.log(help);
  } else {
    //solve expression
    const expression = new Expression(argv[2]);
    console.log(
      expression.toString() + " = " + expression.solve((verbose = false))
    );
  }
} else {
  console.log(help);
}
