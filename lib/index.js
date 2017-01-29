"use strict";

const f = require("functioner").assert;
var argAs = require("./arg/as");
var eargs = require("./eargs");
var bundle = require("./arg/bundle");

const As =
  {
    num: argAs.lnk( f.type.bind(null, "number") ), // argsAs.bind( argsAs, f.type.bind(null, "number") ),
    str: argAs.lnk( f.type.bind(null, "string") ),
    sym: argAs.lnk( f.type.bind(null, "symbol") ),
    obj: argAs.lnk( f.type.bind(null, "object") ),
    compose: argAs.lnk( f.compose ),
    b: bundle,
    bundle: bundle,
    any: argAs.lnk( require("./arg/any") )
  };

module.exports = 
  Object.assign(eargs, { As: As });
