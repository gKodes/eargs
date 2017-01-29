"use strict";

const eargs = require("../../lib/eargs");
const argAs = require("../../lib/arg/as");
const bundle = require("../../lib/arg/bundle");
const assert = require("chai").assert;

require("debug").enable("eargs:bundle");

describe("Argument bundle", function() {
  var asTrue = 
    argAs.lnk(function() {
      return function() {
        return true;
      }
    });

  var asTrueIfy = 
    argAs.lnk(function() {
      return function() {
        return true;
      }
    }, argAs.VAR_ARGS);

  var asFalse = 
    argAs.lnk(function() {
      return function() {
        return false;
      }
    });

  it("when args count do not match matchers should return false", function() {
    var kwargs = {};
    assert.isFalse(
      bundle(asTrue("ty"), asTrue("tr"))([1], kwargs)
    );
  });

  it("when args count excede matchers count should return false", function() {
    var kwargs = {};
    assert.isFalse(
      bundle(asTrue("ty"), asTrue("tr"))([1, 2, 3], kwargs)
    );
  });

  it("when args count are consumed by matchers should return true", function() {
    var kwargs = {};
    assert.isTrue(
      bundle(asTrue("ty"), asTrue("tr"))([1, 2], kwargs)
    );
  });

  it("when a matcher fails should return false", function() {
    var kwargs = {};
    assert.isFalse(
      bundle(asTrue("ty"), asFalse("tr"))([1, 2], kwargs)
    );
  });

  it("when a matcher fails before var_args should return false", function() {
    var kwargs = {};
    assert.isFalse(
      bundle(asFalse("tr"), asTrueIfy("ty"))([1, 3, 4, 5], kwargs)
    );
  });

  it("when a matcher and var_args should return true", function() {
    var kwargs = {};
    assert.isTrue(
      bundle(asTrue("tr"), asTrueIfy("ty"))([1, 3, 4, 5], kwargs)
    );
  });

  it("when a matcher and var_args should the single matcher attribute on kwargs", function() {
    var kwargs = {};
    bundle(asTrue("tr"), asTrueIfy("ty"))([1, 3, 4, 5], kwargs)
    assert.property(kwargs, "tr");
  });

  it("when a matcher and var_args should the remaning args as array attribute for var_args on kwargs", function() {
    var kwargs = {};
    bundle(asTrue("tr"), asTrueIfy("ty"))([1, 3, 4, 5], kwargs)
    assert.lengthOf(kwargs.ty, 3);
  });
});