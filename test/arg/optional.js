/*global describe it */
"use strict";

const argAs = require("../../lib/arg/as");
const optional = require("../../lib/arg/optional");
const assert = require("chai").assert;

describe("optional", function() {
  var asTrue = function() {
    return function() {
      return true;
    }
  }

  it("should define $optional attribute on the provided argu", function() {
    assert.property(optional(argAs.lnk(asTrue)), "$optional");
  });

  it("should have the attribute $optional value set to true", function() {
    assert.isTrue(optional(argAs.lnk(asTrue)).$optional);
  });
});