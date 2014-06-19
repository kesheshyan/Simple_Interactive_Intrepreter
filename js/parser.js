(function (global) {

  /**
   * Parses the array of tokens and generates AST.
   * @class
   * @param {Lexer} [lexer]
   * @constructor
   */
  var Parser = function (lexer) {
    this.lexer = lexer;
    this.args = [];
  };

  Parser.prototype = {
    constructor: Parser,

    /**
     * List of arguments.
     * @default
     * @type {Array}
     */
    args: null,


    /**
     * factor ::= number | identifier | assignment | '(' expression ')' | function-call
     **/
    factor: function () {
      var token = this.lexer.getToken(),
          node;
//      console.log(token)
      if (token.type === Lexer.TOKEN.VAR) {
        node = {
          op: 'arg',
          n : token.value
        };
        this.lexer.nextToken();
        return node;
      }

      if (token.type === Lexer.TOKEN.NUM) {
        node = {
          op: 'imm',
          n : token.value
        };
        this.lexer.nextToken();
        return node;
      }

      return this.parenExpression();
    },

    /**
     * mult ::= factor
     *          | mult '*' factor
     *          | mult '/' factor
     **/
    mult: function () {
      var node = this.factor(),
          token = this.lexer.getToken();

      while (token.type === Lexer.TOKEN.OP1) {
        this.lexer.nextToken();
        node = {
          op: token.value,
          a : node,
          b : this.factor()
        };
        token = this.lexer.getToken();
      }
      return node;
    },

    /**
     *  sum ::= term | sum '+' term | sum '-' term
     **/
    sum: function () {
      var node = this.mult(),
          token = this.lexer.getToken();

      while (token.type === Lexer.TOKEN.OP2) {
        this.lexer.nextToken();
        node = {
          op: token.value,
          a : node,
          b : this.mult()
        };
        token = this.lexer.getToken();
      }
      return node;
    },

    /**
     * Expression that might assignment also.
     * expression ::= sum | variable '=' expression
     */
    expression: function () {
      var node = this.sum(),
          token = this.lexer.getToken();

      while (token.type === Lexer.TOKEN.AS) {
        this.lexer.nextToken();
        node = {
          op: token.value,
          a : this.sum(),
          b : node
        };
        token = this.lexer.getToken();
      }
      return node;
    },

    /**
     * Expression in parentheses.
     */
    parenExpression: function () {
      var node;

      if (this.lexer.getToken().type !== Lexer.TOKEN.LB) {
        throw new Error('Unexpected identifier. `(` is expected');
      }

      this.lexer.nextToken();

      node = this.expression();

      if (this.lexer.getToken().type !== Lexer.TOKEN.RB) {
        throw new Error('Unexpected identifier. `)` is expected');
      }
      this.lexer.nextToken();
      return node;
    },

    /**
     *  arg-list   ::= / nothing /
     *                |variable arg-list
     */
    argumentsList: function () {
      var args = [];

      if (this.lexer.getToken().type !== Lexer.TOKEN.LAB) {
        throw new Error('Arguments is not defined');
      }

      this.lexer.nextToken();

      while (this.lexer.getToken().type === Lexer.TOKEN.VAR) {
        args.push(this.lexer.getToken().value);
        this.lexer.nextToken();
      }

      if (this.lexer.getToken().type !== Lexer.TOKEN.RAB) {
        throw new Error('Unexpected token. Expected `]`');
      }

      this.lexer.nextToken();

      return args;
    },

    /**
     *  function   ::= '[' arg-list ']' expression
     */
    func: function () {
//      this.args = this.argumentsList();
      return this.expression();
    },

    /**
     * Parses the input string and generates AST.
     * @param {String} [program]
     * @returns {Object} AST
     */
    parse: function (program) {
      this.lexer.run(program);
      return this.func();
    }
  };

  // Exporting
  global.Parser = Parser;
})(this);