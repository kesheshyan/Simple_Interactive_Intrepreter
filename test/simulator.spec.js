describe('Testing simulator', function () {
  var simulator;

//  beforeEach(function () {
//    simulator = new Simulator();
//  });
  simulator = new Simulator();

  it('should return correct result: case: `1 + 1`', function() {
    var prog = [
      'IM 1',
      'SW',
      'IM 1',
      'AD'
    ];
    expect(simulator.run(prog)).toEqual(2);
  });

  simulator = new Simulator();

  it('should return correct result: x = 10 * 15', function() {
    var prog = [
      'IM 10',
      'SW',
      'IM 15',
      'MU',
      'PU',
      'ST x'
    ];
    expect(simulator.run(prog)).toEqual(150);
  });

  it('should return correct result: y = 45 - x / 5', function() {
    var prog = [
      'IM 5',
      'SW',
      'FT x',
      'DI',
      'SW',
      'IM 45',
      'SU',
      'PU',
      'ST y'
    ];
    expect(simulator.run(prog)).toEqual(15);
  });

  it('should store variables', function() {
    expect(simulator.vars).toEqual({
      x: 150,
      y: 15
    });
  });
});