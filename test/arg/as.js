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

  it("when invoked functioner return assert function which is invoked for the args given should define the arg on kwargs", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert(value) {
        return functioner;
      }
    }

    argAs(functioner, 1, 'none')([1, 2], rul);

    assert.strictEqual( rul.none , functioner );
  });

  it("when a argument is defined with ... its name on kwargs hould not have the ...", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert(value) {
        return true;
      }
    }

    argAs(functioner, 1, '...none')([1, 2], rul);

    assert.property( rul , "none" );
  });

  it("when a argument is a varible lenght arg defined on kwargs should be array of the remaining arguments", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert(value) {
        return true;
      }
    }

    argAs(functioner, 1, '...none')([1, 2], rul);

    assert.lengthOf( rul.none , 2 );
  });

  it("when assert return false argAs should return false", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert(value) {
        return false;
      }
    }

    assert.isFalse( argAs(functioner, 1, 'none')([1, 2], rul) );
  });

  it("when assert return undefined argAs should return true", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert(value) {
        return undefined;
      }
    }

    assert.isTrue( argAs(functioner, 1, 'none')([1, 2], rul) );
  });

  it("when assert return null argAs should return true", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert(value) {
        return null;
      }
    }

    assert.isTrue( argAs(functioner, 1, 'none')([1, 2], rul) );
  });

  it("when assert return an empty string argAs should return true", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert(value) {
        return '';
      }
    }

    assert.isTrue( argAs(functioner, 1, 'none')([1, 2], rul) );
  });

  it("when assert return an empty array argAs should return true", function() {
    var rul = {};
    var functioner = function functioner() {
      return function assert(value) {
        return [];
      }
    }

    assert.isTrue( argAs(functioner, 1, 'none')([1, 2], rul) );
  });

  it("when assert return an empty array argAs should return true", function() {
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


  describe('lnk', function() {
    it("should return a bound function of argAs with first two arguments bound", function() {
      var rul = {};
      var functioner = function functioner() {
        return function assert(value) {
          return true;
        }
      }

      assert.isTrue( argAs.lnk(functioner)('none')([1, 2], rul) );
    });
  });
});