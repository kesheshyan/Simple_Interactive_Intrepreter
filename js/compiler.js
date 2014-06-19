/**
 * Main Interpreter class which operates with Lexer and Parser
 * and also makes AST optimization. After that it generates `asm` code
 * for the simulator.
 * @class
 * @constructor
 **/
var Interpreter = function  () {
  this.simulator = new Simulator();
};

/**
 * Generates non-optimized AST from the input string.
 * @param {String} [program]
 * @return {Object} AST
 **/
Interpreter.prototype.generateAST = function (program) {
  this.lexer = new Lexer();
  this.parser = new Parser(this.lexer);
  return this.parser.parse(program);
};

/**
 * Generates ASM code for the simulator.
 * @param {Object} [ast] AST
 * @returns {Array} the sequence of commands.
 **/
Interpreter.prototype.compile = function (ast) {
  var asm = [];

  var stackRoutine = function() {
    asm = asm.concat(Interpreter.prototype.compile(ast.a));
    asm.push('PU');
    asm = asm.concat(Interpreter.prototype.compile(ast.b));
    asm.push('SW');
    asm.push('PO');
  };

  switch (ast.op) {
    case 'imm':
      asm.push('IM ' + ast.n);
      break;

    case 'arg':
      asm.push('FT ' + ast.n);
      break;

    case '+':
      stackRoutine();
      asm.push('AD');
      break;

    case '-':
      stackRoutine();
      asm.push('SU');
      break;

    case '*':
      stackRoutine();
      asm.push('MU');
      break;

    case '/':
      stackRoutine();
      asm.push('DI');
      break;

    case '%':
      stackRoutine();
      asm.push('MO');
      break;

    case '=':
      asm = asm.concat(Interpreter.prototype.compile(ast.a));
      asm.push('PU');
      asm.push('ST ' + ast.b.n);
      break;
  }
  return asm;
};

/**
 * Main method to compile and execute the code.
 * @param {String} [program]
 * @returns {number|string} result.
 **/
Interpreter.prototype.input = function (program) {
  if (!program) return '';
  return this.simulator.run(this.compile(this.generateAST(program)));
};

