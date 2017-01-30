/*global describe it */
"use strict";

const eargs = require("../lib/eargs");
const argAs = require("../lib/arg/as");
const assert = require("chai").assert;

require("debug").enable("eargs:eargs");

describe("Easy Arguments", function() {

  it("when no arguments passed should throw TypeError", function() {
    assert.throws(function() {
      eargs();
    }, TypeError);
  });

  it("when passed arguments oject and matcher shoud not throw TypeError", function() {
    var as = 
    argAs.lnk(function() {
      return function() {
        return true;
      }
    })
    
    eargs(arguments, as("ty"));
  });

  it("when first argument is not an array like oject then throw TypeError", function() {
    assert.throws(function() {
      eargs({});
    }, TypeError);
  });

  it("when no matchers are passed should throw TypeError", function() {
    assert.throws(function() {
      eargs([]);
    }, TypeError);
  });

  it("when given one matcher and is success should return object with the argument name as attribute on it", function() {
    var as = 
    argAs.lnk(function() {
      return function() {
        return true;
      }
    })
    
    assert.property( eargs([1], as("ty")), "ty" );
  });

  it("when given matcher is varible lenght matcher should return object with the argument name as attribute as array on it", function() {
    var as = 
    argAs.lnk(function() {
      return function() {
        return true;
      }
    }, argAs.VAR_ARGS);

    assert.lengthOf( eargs([1, 2, 3, 4], as("ty")).ty, 4 );
  });

  it("when multiple matchers in place and partial match should not return any attributes", function() {
    var asTrue = 
      argAs.lnk(function() {
        return function() {
          return true;
        }
      });

    var asFalse = 
      argAs.lnk(function() {
        return function() {
          return false;
        }
      });
    
    assert.notProperty( eargs([1, 2], asTrue("ty"), asFalse("fy")), "ty" );
  });

  it("when arguments lenght are grater than matcher should not return any attributes", function() {
    var as = 
    argAs.lnk(function() {
      return function() {
        return true;
      }
    });
    
    assert.notProperty( eargs([1, 2, 3, 4], as("ty")), "ty" );
  });

  it("when only matches are given should return bound function", function() {
    var as = 
    argAs.lnk(function() {
      return function() {
        return true;
      }
    });
    
    assert.isFunction( eargs(as("ty")) );
  });

  it("when argyments are passed at last should define attributes on kwargs", function() {
    var as = 
    argAs.lnk(function() {
      return function() {
        return true;
      }
    });
    
    assert.notProperty( eargs(as("ty"), [1, 2, 3, 4]), "ty" );
  });

  it("when argyments is not an array like object should throw TypeError", function() {
    var as = 
    argAs.lnk(function() {
      return function() {
        return true;
      }
    });
    
    assert.throws(function() {
      eargs(as("ty"), {});
    }, TypeError);
  });
});