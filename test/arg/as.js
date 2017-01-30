/*global describe it xit */
"use strict";

const argAs = require("../../lib/arg/as");
const assert = require("chai").assert;

require("debug").enable("eargs:argAs");

describe("Argument as", function() {

  it("when invoked functioner returns undefined assert function should throw", function() {
    var rul = {};
    var functioner = function functioner() {}

    assert.throws( function() {
      argAs(functioner, 1, 'none')([], rul)
    }, TypeError );
  });

  // NOTE: We are not doing transforamtions
  ("when invoked functioner return assert function which is invoked for the args given should define the arg on kwargs", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert() {
        return functioner;
      }
    }

    argAs(functioner, 1, 'none')([1, 2], rul);

    assert.strictEqual( rul.none , functioner );
  });

  it("when a argument is defined with ... its name on kwargs hould not have the ...", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert() {
        return true;
      }
    }

    argAs(functioner, 1, '...none')([1, 2], rul);

    assert.property( rul , "none" );
  });

  it("when a argument is a varible lenght arg defined on kwargs should be array of the remaining arguments", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert() {
        return true;
      }
    }

    argAs(functioner, 1, '...none')([1, 2], rul);

    assert.lengthOf( rul.none , 2 );
  });

  it("when assert return false argAs should return 0", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert() {
        return false;
      }
    }

    assert.strictEqual( argAs(functioner, 1, 'none')([1, 2], rul), 0 );
  });

  it("when assert return undefined argAs should return 1", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert() {
        return undefined;
      }
    }

    assert.strictEqual( argAs(functioner, 1, 'none')([1, 2], rul), 1 );
  });

  it("when assert return null argAs should return 1", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert() {
        return null;
      }
    }

    assert.strictEqual( argAs(functioner, 1, 'none')([1, 2], rul), 1 );
  });

  it("when assert return an empty string argAs should return 1", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert() {
        return '';
      }
    }

    assert.strictEqual( argAs(functioner, 1, 'none')([1, 2], rul), 1 );
  });

  it("when assert return an empty array argAs should return 1", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert() {
        return [];
      }
    }

    assert.strictEqual( argAs(functioner, 1, 'none')([1, 2], rul), 1 );
  });

  // NOTE: We are not doing transforamtions
  ("when assert return an array like object argAs should return 1", function() {
    var rul = {};
    var functioner = function functioner() {
      var args = arguments;
      return function assert() {
        return args;
      }
    }

    argAs(functioner, 1, 'none', 1, 2, 3, 4)([1, 2], rul);

    assert.lengthOf( rul.none, 4 );
  });

  it("when a single element is passed for varible lenght argument it define array on kwargs", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert() {
        return true;
      }
    }

    argAs(functioner, argAs.VAR_ARGS, 'none')([1], rul);

    assert.isArray( rul.none );
  });


  describe('lnk', function() {
    it("should return a bound function of argAs with first two arguments bound", function() {
      var rul = {};
      var functioner = function functioner() {
        return function assert() {
          return true;
        }
      }

      assert.strictEqual( argAs.lnk(functioner)('none')([1, 2], rul), 1 );
    });
  });
});