describe('Testing Lexer', function () {
  var lexer;

  beforeEach(function() {
    lexer = new Lexer();
  });

  it('should generate correct array of tokens', function() {
    var toks = lexer.run('fn avg x y => (x + y) % 2').getTokens();
    expect(toks).toEqual([
      {
        "type": "functionLeft",
        "value": "fn"
      },
      {
        "type": "variable",
        "value": "avg"
      },
      {
        "type": "variable",
        "value": "x"
      },
      {
        "type": "variable",
        "value": "y"
      },
      {
        "type": "functionRight",
        "value": "=>"
      },
      {
        "type": "leftBrace",
        "value": "("
      },
      {
        "type": "variable",
        "value": "x"
      },
      {
        "type": "operator2",
        "value": "+"
      },
      {
        "type": "variable",
        "value": "y"
      },
      {
        "type": "rightBrace",
        "value": ")"
      },
      {
        "type": "operator1",
        "value": "%"
      },
      {
        "type": "number",
        "value": 2
      },
      {
        "type": "endOfFile",
        "value": true
      }
    ]);

    toks = lexer.run('c = 10.23').getTokens();
    expect(toks).toEqual([
      {
        "type": "variable",
        "value": "c"
      },
      {
        "type": "assignment",
        "value": "="
      },
      {
        "type": "number",
        "value": 10.23
      },
      {
        "type": "endOfFile",
        "value": true
      }
    ]);
  });

});