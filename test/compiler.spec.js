describe('Testing Interpreter', function () {
  var interpreter;

  interpreter = new Interpreter();
  it('should compile correct asm-code: `x = 5`', function() {
    var prog = 'x = 5',
        compiled = interpreter.compile(interpreter.generateAST(prog));

    expect(compiled).toEqual([
      'IM 5',
      'PU',
      'ST x'
    ]);
  });

  it('should compile correct asm-code: `y = x % 5`', function() {
    var prog = 'y = x % 5',
        compiled = interpreter.compile(interpreter.generateAST(prog));

    expect(compiled).toEqual(["FT x", "PU", "IM 5", "SW", "PO", "MO", "PU", "ST y"]);
  });

  interpreter = new Interpreter();

  it('should return correct result: `x = (5 + 10) / 3`', function() {
    var prog = 'x = (5 + 10) / 3',
        result = interpreter.input(prog);

    expect(result).toEqual(5);
  });

  it('should return correct result: `y = x % 2`', function() {
    var prog = 'y = x % 2',
        result = interpreter.input(prog);

    expect(result).toEqual(1);
  });


});