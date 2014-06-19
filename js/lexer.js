(function (global) {

  /**
   * Lexer. Translates the input program string to the array of tokens.
   * @class
   * @constructor
   **/
  var Lexer = function () {
    this._currentToken = null;
    this._index = -1;
    this._tokens = null;
  };

  /**
   * Gets next token and saves it in the _currentToken variable.
   * @returns {Object} current token
   **/
  Lexer.prototype.nextToken = function () {
    this._index++;
    this._currentToken = this._tokens[this._index];
    return this._currentToken;
  };

  /**
   * Getter for the current token.
   * @returns {Object}
   **/
  Lexer.prototype.getToken = function () {
    return this._currentToken;
  };

  /**
   * Initializates the Lexer.
   * @param {String} [program]
   **/
  Lexer.prototype.run = function (program) {
    this._tokens = Lexer.tokenize(program);
    this.nextToken();
    return this;
  };

  /**
   * Getter for tokens.
   * @returns {null|Array}
   */
  Lexer.prototype.getTokens = function () {
    return this._tokens;
  };

  /**
   * Tokens definitions.
   **/
  Lexer.TOKEN = {
    VAR: 'variable',
    NUM: 'number',
    OP1: 'operator1',
    OP2: 'operator2',
    AS : 'assignment',
    FNL : 'functionLeft',
    FNR : 'functionRight',
    LAB: 'leftArgBrace',
    RAB: 'rightArgBrace',
    LB : 'leftBrace',
    RB : 'rightBrace',
    EOF: 'endOfFile'
  };

  /**
   * List of token types.
   **/
  Lexer.patterns = [
    {
      name   : Lexer.TOKEN.FNL,
      pattern: /^fn$/
    },
    {
      name   : Lexer.TOKEN.FNR,
      pattern: /^=>$/
    },
    {
      name   : Lexer.TOKEN.VAR,
      pattern: /^([_a-zA-Z]+[0-9]*)+$/
    },
    {
      name   : Lexer.TOKEN.NUM,
      pattern: /^[0-9]+\.?[0-9]*$/
    },
    {
      name   : Lexer.TOKEN.OP1,
      pattern: /\/|\*|%/
    },
    {
      name   : Lexer.TOKEN.OP2,
      pattern: /\+|\-/
    },
    {
      name   : Lexer.TOKEN.AS,
      pattern: /^=$/
    },
    {
      name   : Lexer.TOKEN.LAB,
      pattern: /\[/
    },
    {
      name   : Lexer.TOKEN.RAB,
      pattern: /\]/
    },
    {
      name   : Lexer.TOKEN.LB,
      pattern: /\(/
    },
    {
      name   : Lexer.TOKEN.RB,
      pattern: /\)/
    }
  ];

  /**
   * Gets the type of the specified token.
   * @param {String|Number} [tok]
   * @return {String}
   **/
  Lexer.getTokenType = function (tok) {
    var tokens = Lexer.patterns;

    for (var i = 0, len = tokens.length; i < len; i++) {
      if (tokens[i].pattern.test(tok)) {
        return tokens[i].name;
      }
    }
  };

  /**
   * Convert the input program to an array of tokens.
   * @param {String} [program]
   * @return {Array} array of tokens {type: [string], value: [string]}
   **/
  Lexer.tokenize = function (program) {
    var regex = /\s*(=>|[-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g,
        tokens;

    tokens = program.split(regex).filter(function (s) { return !s.match(/^\s*$/); }).map(function (tok) {
      return {
        type : Lexer.getTokenType(tok),
        value: isNaN(tok) ? tok : parseFloat(tok)
      };
    });
    // Adding end of file token
    tokens.push({
      type : Lexer.TOKEN.EOF,
      value: true
    });
    return tokens;
  };

  global.Lexer = Lexer;

})(this);