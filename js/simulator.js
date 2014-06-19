(function (global) {
  /**
   * Simulator.
   * @class
   * @description
   * Stack machine that run the byte code and stores
   * all variables across REPL launches.
   * @constructor
   */
  var Simulator = function () {
    this.vars = {};
  };

  Simulator.prototype = {
    constructor: Simulator,
    /**
     * Stores all variables
     * @type {Object}
     */
    vars: null,

    /**
     * Executes the byte code.
     * @param {Array} [asm]
     * @returns {number}
     */
    run: function (asm) {
      var r0 = 0,
          r1 = 0,
          stack = [];

      asm.forEach(function (instruct) {
        var match = instruct.split(' '),
            ins = match[0],
            n = match[1];

        switch (ins) {
          // Immediately get the value.
          case 'IM':
            r0 = parseFloat(n);
            break;

          // Gets the value from variable and store it in the R0.
          case 'FT':
            var tempR0 = this.vars[n];

            if (typeof tempR0 === 'undefined') {
              throw new Error('ERROR: Invalid identifier. No variable with name ' + n + ' was found."')
            }
            r0 = tempR0;
            break;

          // Stores the value from the top of the stack in the variable.
          case 'ST':
            this.vars[n] = stack.pop();
            break;

          // Swaps the values in the registers.
          case 'SW':
            var tmp = r0;
            r0 = r1;
            r1 = tmp;
            break;

          // Pushes the value from the r0 to the stack.
          case 'PU':
            stack.push(r0);
            break;

          // Pops the value from the stack and stores it on the r0.
          case 'PO':
            r0 = stack.pop();
            break;

          // Adds registers and stores results on the r0.
          case 'AD':
            r0 += r1;
            break;

          // Subtracts registers and stores results on the r0.
          case 'SU':
            r0 -= r1;
            break;

          // Multiplies registers and stores results on the r0.
          case 'MU':
            r0 *= r1;
            break;

          // Divides registers and stores results on the r0.
          case 'DI':
            r0 /= r1;
            break;

          // Modulo registers and stores results on the r0.
          case 'MO':
            r0 %= r1;
            break;
        }
      }.bind(this));

      return r0;
    }
  };

  global.Simulator = Simulator;
})(this);
