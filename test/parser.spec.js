describe('Testing parser', function () {
  var lexer, parser;

  beforeEach(function() {
    lexer = new Lexer();
    parser = new Parser(lexer);
  });

  it('should generate correct AST: `x = 10.23 + 2 / 5`', function() {
    var prog = 'x = 10.23 + 2 / 5';
    var tree = {
      op: '=',
      a: {
        op: '+',
        a: {
          op: 'imm',
          n: 10.23
        },
        b: {
          op: '/',
          a: {
            op: 'imm',
            n: 2
          },
          b: {
            op: 'imm',
            n: 5
          }
        }
      },
      b: {
        op: 'arg',
        n: 'x'
      }
    };
    expect(parser.parse(prog)).toEqual(tree);
  });

  it('should generate correct AST: `x = y - (10.23 + 2) % 5`', function() {
    var prog = 'x = y - (10.23 + 2) % 5';
    var tree = {
      "op": "=",
      "a": {
        "op": "-",
        "a": {
          "op": "arg",
          "n": "y"
        },
        "b": {
          "op": "%",
          "a": {
            "op": "+",
            "a": {
              "op": "imm",
              "n": 10.23
            },
            "b": {
              "op": "imm",
              "n": 2
            }
          },
          "b": {
            "op": "imm",
            "n": 5
          }
        }
      },
      "b": {
        "op": "arg",
        "n": "x"
      }
    };
    expect(parser.parse(prog)).toEqual(tree);
  });

  it('should generate correct AST: `x = y = (10.23 + 2) % 5`', function() {
    var prog = 'x = y = (10.23 + 2) % 5';
    var tree = {
      "op": "=",
      "a": {
        "op": "%",
        "a": {
          "op": "+",
          "a": {
            "op": "imm",
            "n": 10.23
          },
          "b": {
            "op": "imm",
            "n": 2
          }
        },
        "b": {
          "op": "imm",
          "n": 5
        }
      },
      "b": {
        "op": "=",
        "a": {
          "op": "arg",
          "n": "y"
        },
        "b": {
          "op": "arg",
          "n": "x"
        }
      }
    };
//    console.log(JSON.stringify(parser.parse(prog)))
    expect(parser.parse(prog)).toEqual(tree);
  });

  it('should generate correct AST: `x = y + (z = 10.23 + 2)`', function() {
    var prog = 'x = y + (z = 10.23 + 2)';
    var tree = {
      "op": "=",
      "a": {
        "op": "+",
        "a": {
          "op": "arg",
          "n": "y"
        },
        "b": {
          "op": "=",
          "a": {
            "op": "+",
            "a": {
              "op": "imm",
              "n": 10.23
            },
            "b": {
              "op": "imm",
              "n": 2
            }
          },
          "b": {
            "op": "arg",
            "n": 'z'
          }
        }
      },
      "b": {
        "op": "arg",
        "n": "x"
      }
    };
//    console.log(JSON.stringify(parser.parse(prog)))
    expect(parser.parse(prog)).toEqual(tree);
  });

});