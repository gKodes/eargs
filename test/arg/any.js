/*global describe it */
"use strict";

const any = require("../../lib/arg/any");
const assert = require("chai").assert;

describe("any", function() {
  it("should return true when no arguments passed", function() {
    var ast = any();
    assert.isTrue(ast())
  });

  it("should return when arguments passed", function() {
    var ast = any();
    assert.isTrue(ast("1", true, false, "b"))
  });
});